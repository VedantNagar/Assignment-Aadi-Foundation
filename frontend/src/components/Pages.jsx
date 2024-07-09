import React, { useState, useEffect } from "react";
import axios from "axios";

const Pages = ({ accessToken, onPageSelect }) => {
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState("");

  useEffect(() => {
    const fetchPages = async () => {
      const response = await axios.post(
        "https://assignment-aadi-foundation-2.onrender/api/pages",
        {
          accessToken,
        }
      );
      setPages(response.data.data);
    };
    fetchPages();
  }, [accessToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPageId) {
      onPageSelect(selectedPageId);
    }
  };

  return (
    <div className="m-3 rounded-md">
      <form onSubmit={handleSubmit} className="flex items-center">
        <select
          value={selectedPageId}
          onChange={(e) => setSelectedPageId(e.target.value)}
          className="mr-2 p-2 border rounded"
        >
          <option value="">Select a page</option>
          {pages.map((page) => (
            <option key={page.id} value={page.id}>
              {page.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={!selectedPageId}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Pages;
