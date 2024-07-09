import React, { useState, useEffect } from "react";
import axios from "axios";

const Insights = ({ pageId, accessToken }) => {
  const [insights, setInsights] = useState({
    page_fans: 0,
    page_engaged_users: 0,
    page_impressions: 0,
    page_actions_post_reactions_total: 0,
  });

  useEffect(() => {
    const fetchInsights = async () => {
      const since = Math.floor(
        new Date().setDate(new Date().getDate() - 31) / 1000 //fetching insights for the last 31 days
      );
      const until = Math.floor(new Date().getTime() / 1000);
      try {
        const response = await axios.post(
          "https://assignment-aadi-foundation-2.onrender/api/insights",
          {
            pageId,
            accessToken,
            since,
            until,
          }
        );
        setInsights((prevInsights) => ({
          ...prevInsights,
          ...response.data.data,
        }));
      } catch (error) {
        console.error("Error fetching insights:", error);
      }
    };
    fetchInsights();
  }, [pageId, accessToken]);

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Page Insights</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg flex flex-col justify-center">
          <h3 className="text-lg font-semibold">Total Followers</h3>
          <p className="text-3xl font-bold text-blue-600 text-center">
            {insights.page_fans}
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg flex flex-col justify-center">
          <h3 className="text-lg font-semibold">Total Engagement</h3>
          <p className="text-3xl font-bold text-green-600 text-center">
            {insights.page_engaged_users}
          </p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg flex flex-col justify-center">
          <h3 className="text-lg font-semibold">Total Impressions</h3>
          <p className="text-3xl font-bold text-yellow-600 text-center">
            {insights.page_impressions}
          </p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg flex flex-col justify-center">
          <h3 className="text-lg font-semibold">Total Reactions</h3>
          <p className="text-3xl font-bold text-purple-600 text-center">
            {insights.page_actions_post_reactions_total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Insights;
