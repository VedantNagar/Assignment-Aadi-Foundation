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
    <div>
      {!user && <Login onLogin={handleLogin} />}
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
