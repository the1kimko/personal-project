import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../redux/actions/wishlistActions";
import "./wishlist.css";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  if (loading) {
    return <p>Loading wishlist...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      {items.length ? (
        items.map((item) => (
          <div key={item.id} className="wishlist-item">
            <h3>{item.product?.name || item.service?.name}</h3>
            <p>{item.product?.description || item.service?.description}</p>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
