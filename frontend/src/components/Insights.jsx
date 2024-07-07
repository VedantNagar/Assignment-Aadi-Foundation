import React, { useState, useEffect } from "react";
import axios from "axios";

const Insights = ({ pageId, accessToken }) => {
  const [insights, setInsights] = useState({});

  useEffect(() => {
    const fetchInsights = async () => {
      const since = Math.floor(
        new Date().setDate(new Date().getDate() - 7) / 1000
      ); // Last 7 days
      const until = Math.floor(new Date().getTime() / 1000);
      const response = await axios.post("http://localhost:5000/api/insights", {
        pageId,
        accessToken,
        since,
        until,
      });
      setInsights(response.data.data);
    };
    fetchInsights();
  }, [pageId, accessToken]);

  return (
    <div>
      <h2>Page Insights</h2>
      <div>
        <h3>Total Followers: {insights.page_fans}</h3>
        <h3>Total Engagement: {insights.page_engaged_users}</h3>
        <h3>Total Impressions: {insights.page_impressions}</h3>
        <h3>Total Reactions: {insights.page_actions_post_reactions_total}</h3>
      </div>
    </div>
  );
};

export default Insights;
