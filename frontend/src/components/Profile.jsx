import React from "react";

const Profile = ({ user }) => {
  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center justify-center">
        Welcome, <span className="text-sky-700 text-4xl">{user.name}</span>
      </h1>
      <div className="rounded-full border-4 border-blue-500 overflow-hidden w-auto h-auto">
        <img
          src={user.picture.data.url}
          alt="Profile"
          className="w-auto h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Profile;
