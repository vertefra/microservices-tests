const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  console.log("received event: ", event);
  console.log("storing event");

  events.push(event);

  //  EVENTS DISPATCHER

  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);
  axios.post("http://localhost:4003/events", event);

  res.send({ status: "OK" });
});

// event retriever
// from this endpoint you can access all the events ever stored

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("EVENT BUS listening on 4005");
});
