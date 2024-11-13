import React from 'react';
import './pages.css';

function Settings() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Settings</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Settings;
