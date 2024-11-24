// src/components/Product/ProductCard.js
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../../redux/actions/wishlistActions';
import { addToCart } from '../../redux/actions/cartActions';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product.id, 'product')); // Dispatch with product ID only
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product.id, "product"));
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>
      <button className='button add-to-cart' onClick={handleAddToCart}>Add to Cart</button>
      <button className='button add-to-wishlist' onClick={handleAddToWishlist}>Add to Wishlist</button>
    </div>
  );
}

export default ProductCard;
