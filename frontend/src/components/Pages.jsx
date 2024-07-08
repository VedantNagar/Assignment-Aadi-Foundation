import React, { useState, useEffect } from "react";
import axios from "axios";

const Pages = ({ accessToken, onPageSelect }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      const response = await axios.post("http://localhost:5000/api/pages", {
        accessToken,
      });
      setPages(response.data.data);
    };
    fetchPages();
  }, [accessToken]);

  return (
    <div className="m-3 rounded-md">
      <select onChange={(e) => onPageSelect(e.target.value)}>
        <option value="">Select a page</option>
        {pages.map((page) => (
          <option key={page.id} value={page.id}>
            {page.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pages;
