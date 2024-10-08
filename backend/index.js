// backend/server.js
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://localhost:5173",
  "http://localhost:5174",
  "https://localhost:5174",
  "http://localhost:8000",
  "https://assignment-aadi-foundation-1.onrender.com",
  "https://assignment-aadi-foundation-1.onrender.com",
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

app.use("/", express.static("../frontend/dist"));
app.use("/assets", express.static("../frontend/dist/assets"));

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
  const { pageId, accessToken, since, until, userId } = req.body;
  const metrics = [
    "page_fans",
    "page_post_engagements",
    "page_impressions_paid",
    "page_daily_follows_unique",
    "page_impressions_unique",
    "page_views_total",
  ];
  console.log(userId);
  let pageAccessToken;
  try {
    const response = await axios.get(
      `https://graph.facebook.com/${userId}/accounts?access_token=${accessToken}`
    );
    pageAccessToken = response.data.data.find(
      (page) => page.id === pageId
    ).access_token;
    console.log(pageAccessToken);
  } catch (error) {
    console.log(error);
  }
  try {
    const response = await axios.get(
      `https://graph.facebook.com/${pageId}/insights?metric=page_follows,page_post_engagements,page_views_total,page_fans&access_token=${pageAccessToken}`
      /*       {
        params: {
          metric: metrics.join(","),
          fields: metrics.join(","),
          since: since,
          until: until,
          period: "month",
          access_token: pageAccessToken,
        },
      } */
    );
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const errorMessage = error.response.data.error.message;
      res.status(400).json({ message: errorMessage });
    } else {
      res.status(500).json({ message: "Error fetching insights" });
    }
  }
});

app.use("/*", express.static("../frontend/dist/index.html"));

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    console.log("connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
