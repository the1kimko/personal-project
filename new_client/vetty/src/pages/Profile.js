import React from 'react';
import { useSelector } from 'react-redux';
import './pages.css';

function Profile() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="profile">
      <h2 className="profile-title">Profile</h2>
      <div className="profile-card">
        <p className="profile-username">Username: {user?.username}</p>
        <p className="profile-role">Role: {user?.role}</p>
        <p className="profile-created">Account Created: {user?.createdAt}</p>
      </div>
    </div>
  );
}

export default Profile;


