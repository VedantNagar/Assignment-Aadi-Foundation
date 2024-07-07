import React from "react";

const Profile = ({ user }) => {
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <img src={user.picture.data.url} alt="Profile" />
    </div>
  );
};

export default Profile;
