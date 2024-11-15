// src/components/Admin/ServiceRequestHistory.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceRequestHistory } from '../../redux/actions/adminActions';

function ServiceRequestHistory() {
  const dispatch = useDispatch();
  const serviceRequestHistory = useSelector((state) => state.admin.serviceRequestHistory);

  useEffect(() => {
    dispatch(fetchServiceRequestHistory());
  }, [dispatch]);

  return (
    <div>
      <h2>Service Request History</h2>
      {serviceRequestHistory.map((request) => (
        <div key={request.id}>
          <h3>Request ID: {request.id}</h3>
          <p>Status: {request.status}</p>
          <p>Date: {request.date}</p>
        </div>
      ))}
    </div>
  );
}

export default ServiceRequestHistory;
