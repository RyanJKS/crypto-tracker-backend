const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const base_url = "https://api.coingecko.com/api/v3/coins/";

const app = express();
app.use(cors());

app.get("/all-coins", async (req, res) => {
  let full_url = base_url + "list";
  try {
    let response = await axios.get(full_url);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/quote/:id", async (req, res) => {
  const id = req.params.id;
  let full_url =
    base_url +
    id +
    "?community_data=false&developer_data=false&sparkline=false";
  try {
    let response = await axios.get(full_url);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/line-chart/:id/:time", async (req, res) => {
  const id = req.params.id;
  const time = req.params.time;
  let full_url = base_url + id + "/market_chart?vs_currency=gbp&days=" + time;

  try {
    let response = await axios.get(full_url);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/candlestick-chart/:id/:time", async (req, res) => {
  const id = req.params.id;
  const time = req.params.time;
  let full_url = base_url + id + "/ohlc?vs_currency=gbp&days=" + time;
  try {
    let response = await axios.get(full_url);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
