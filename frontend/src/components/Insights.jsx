import React, { useState, useEffect } from "react";
import axios from "axios";

const Insights = ({ pageId, accessToken }) => {
  const [insights, setInsights] = useState({
    page_daily_follows_unique: 0, //followers
    page_post_engagements: 0, //engagements
    page_impressions_paid: 0, //impressions
    page_fans: 0, //likes
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      const since = Math.floor(
        new Date().setDate(new Date().getDate() - 7) / 1000
      );
      const until = Math.floor(new Date().getTime() / 1000);
      try {
        const response = await axios.post(
          "https://assignment-aadi-foundation-2.onrender.com/api/insights",
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
        setError(null);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("Error fetching insights");
        }
      }
    };
    fetchInsights();
  }, [pageId, accessToken]);

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Page Insights</h2>
      {error ? (
        <>
          <div className="text-red-500 text-center">{error}</div>
          <div className="text-red-500 text-center">
            Page Insights data is only available on Pages with 100 or more likes
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg flex flex-col justify-center">
              <h3 className="text-lg font-semibold">Total Followers</h3>
              <p className="text-3xl font-bold text-blue-600 text-center">
                {insights.page_daily_follows_unique}
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg flex flex-col justify-center">
              <h3 className="text-lg font-semibold">Total Engagement</h3>
              <p className="text-3xl font-bold text-green-600 text-center">
                {insights.page_post_engagements}
              </p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg flex flex-col justify-center">
              <h3 className="text-lg font-semibold">Total Impressions</h3>
              <p className="text-3xl font-bold text-yellow-600 text-center">
                {insights.page_impressions_paid}
              </p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg flex flex-col justify-center">
              <h3 className="text-lg font-semibold">Total Reactions</h3>
              <p className="text-3xl font-bold text-purple-600 text-center">
                {insights.page_fans}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg flex flex-col justify-center">
            <h3 className="text-lg font-semibold">Total Followers</h3>
            <p className="text-3xl font-bold text-blue-600 text-center">
              {insights.page_daily_follows_unique}
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg flex flex-col justify-center">
            <h3 className="text-lg font-semibold">Total Engagement</h3>
            <p className="text-3xl font-bold text-green-600 text-center">
              {insights.page_post_engagements}
            </p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg flex flex-col justify-center">
            <h3 className="text-lg font-semibold">Total Impressions</h3>
            <p className="text-3xl font-bold text-yellow-600 text-center">
              {insights.page_impressions_paid}
            </p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg flex flex-col justify-center">
            <h3 className="text-lg font-semibold">Total Reactions</h3>
            <p className="text-3xl font-bold text-purple-600 text-center">
              {insights.page_fans}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insights;
