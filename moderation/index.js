const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// listening for events

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  // Comment Created event

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    // sending an event to comuunicate that the post has been moderated

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
    res.send({});
  }
});

app.listen(4003, () => {
  console.log("Moderation service listening on 4003");
});
