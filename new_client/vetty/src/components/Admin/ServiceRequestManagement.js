// src/components/Admin/ServiceRequestManagement.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceRequests, updateServiceRequestStatus } from '../../redux/actions/adminActions';

function ServiceRequestManagement() {
  const dispatch = useDispatch();
  const serviceRequests = useSelector((state) => state.admin.serviceRequests);

  useEffect(() => {
    dispatch(fetchServiceRequests());
  }, [dispatch]);

  const handleStatusChange = (requestId, status) => {
    dispatch(updateServiceRequestStatus(requestId, status));
  };

  return (
    <div>
      <h2>Service Request Management</h2>
      {serviceRequests.map((request) => (
        <div key={request.id}>
          <h3>Request ID: {request.id}</h3>
          <p>Status: {request.status}</p>
          <button onClick={() => handleStatusChange(request.id, 'approved')}>Approve</button>
          <button onClick={() => handleStatusChange(request.id, 'disapproved')}>Disapprove</button>
        </div>
      ))}
    </div>
  );
}

export default ServiceRequestManagement;
