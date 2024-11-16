// src/components/Admin/OrderManagement.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus, setCurrentPage } from '../../redux/actions/adminActions';
import './admin.css'

const OrderManagement = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.admin.orders);
  const currentPage = useSelector((state) => state.admin.currentPage);
  const itemsPerPage = useSelector((state) => state.admin.itemsPerPage);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus(orderId, status));
    if (status === 'completed') {
      alert(`Order ${orderId} marked as completed.`);
    } else {
      alert(`Order ${orderId} marked as ${status}.`);
    }
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      {paginatedOrders.length > 0 ? (
        <>
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.status}</td>
                  <td>
                    <button onClick={() => handleStatusChange(order.id, 'approved')}>
                      Approve
                    </button>
                    <button onClick={() => handleStatusChange(order.id, 'disapproved')}>
                      Disapprove
                    </button>
                    <button onClick={() => handleStatusChange(order.id, 'completed')}>
                      Mark as Completed
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
}

export default OrderManagement;
