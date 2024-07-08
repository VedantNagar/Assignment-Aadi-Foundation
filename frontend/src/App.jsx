import React, { useState } from "react";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Pages from "./components/Pages";
import Insights from "./components/Insights";

const App = () => {
  const [user, setUser] = useState(null);
  const [pageId, setPageId] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handlePageSelect = (pageId) => {
    setPageId(pageId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      {!user && (
        <div className="flex flex-col items-center bg-white p-12 rounded-lg shadow-md">
          <h2 className="mb-4 text-xl text-gray-700 font-bold">Welcome!</h2>
          <Login onLogin={handleLogin} />
        </div>
      )}
      {user && <Profile user={user} />}
      {user && (
        <Pages accessToken={user.accessToken} onPageSelect={handlePageSelect} />
      )}
      {user && pageId && (
        <Insights pageId={pageId} accessToken={user.accessToken} />
      )}
    </div>
  );
};

export default App;
