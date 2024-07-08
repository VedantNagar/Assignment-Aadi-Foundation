// backend/server.js
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://localhost:5173",
  "http://localhost:5174",
  "https://localhost:5174",
  "http://localhost:8000",
  "https://food-delivery-application-x68l.onrender.com",
  "https://kshitij-fudo-app.onrender.com",
  "https://fudo-w568.onrender.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true, // Allow credentials like cookies
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

app.post("/api/auth/facebook", async (req, res) => {
  const { accessToken } = req.body;
  try {
    const response = await axios.get(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
});

app.post("/api/pages", async (req, res) => {
  const { accessToken } = req.body;
  try {
    const response = await axios.get(
      `https://graph.facebook.com/me/accounts?access_token=${accessToken}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pages" });
  }
});

app.post("/api/insights", async (req, res) => {
  const { pageId, accessToken, since, until } = req.body;
  const metrics = [
    "page_fans",
    "page_engaged_users",
    "page_impressions",
    "page_actions_post_reactions_total",
  ];

  try {
    const response = await axios.get(
      `https://graph.facebook.com/${pageId}/insights`,
      {
        params: {
          metric: metrics.join(","),
          since: since,
          until: until,
          period: "total_over_range",
          access_token: accessToken,
        },
      }
    );
    console.log(req.body);
    res.json(response.data);
  } catch (error) {
    console.log(error.response.data);
    res.status(500).json({ message: "Error fetching insights" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
