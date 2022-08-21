const express = require("express");
const { v4: v4 } = require("uuid");

const app = express();
app.use(express.json());
app.listen(8080, () => console.log("🚀 Server running..."));

const users = [];

function findUserByUsername(username) {
  return users.find((user) => user.username == username);
}

app.post("/users", (req, res) => {
  const { name, username } = req.body;

  if (findUserByUsername(username)) {
    res.status(400).json({ error: "Username already exists" });
  }

  const user = {
    id: v4(),
    name: name,
    username,
    todos: [],
  };
  users.push(user);

  return res.status(201).json(user);
});

module.exports = app;
