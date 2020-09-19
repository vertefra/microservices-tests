const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

// listening for events from event bus

app.post("/events", (req, res) => {
  console.log("Event received: ", req.body.type);
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
    console.log("created post in query service: ", posts);
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content });
    console.log("created post in query service: ", posts);
  }
});

app.listen(4002, () => {
  console.log("Query service, listening on 4002");
});