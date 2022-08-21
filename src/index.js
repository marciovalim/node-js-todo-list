const express = require("express");
const { v4: v4 } = require("uuid");

const app = express();
app.use(express.json());

const users = [];

function findUserByUsername(username) {
  return users.find((user) => user.username == username);
}

function checkExistsUsername(req, res, next) {
  const { username } = req.headers;
  const user = findUserByUsername(username);
  if (!user) {
    res.statusCode = 404;
    return res.json({ error: "Username not found" });
  }

  req.user = user;
  next();
}

function checkExistsTodo(req, res, next) {
  const { id } = req.params;
  const { user } = req;

  const todoIndex = user.todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  req.todoIndex = todoIndex;
  next();
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

app.get("/todos", checkExistsUsername, (req, res) => {
  const { user } = req;
  return res.json(user.todos);
});

app.post("/todos", checkExistsUsername, (req, res) => {
  const { user } = req;
  const { title, deadline } = req.body;

  const todo = {
    id: v4(),
    created_at: new Date(),
    title,
    deadline: deadline,
    done: false,
  };
  const userIndex = users.findIndex((u) => u.id == user.id);
  users[userIndex].todos.push(todo);

  return res.status(201).json(todo);
});

app.put("/todos/:id", [checkExistsUsername, checkExistsTodo], (req, res) => {
  const { user, todoIndex } = req;
  const { title, deadline } = req.body;

  const todo = user.todos[todoIndex];
  todo.title = title;
  todo.deadline = deadline;
  user.todos[todoIndex] = todo;

  return res.json(todo);
});

app.patch(
  "/todos/:id/done",
  [checkExistsUsername, checkExistsTodo],
  (req, res) => {
    const { user, todoIndex } = req;

    user.todos[todoIndex].done = true;
    return res.json(user.todos[todoIndex]);
  }
);

app.delete("/todos/:id", [checkExistsUsername, checkExistsTodo], (req, res) => {
  const { user, todoIndex } = req;
  user.todos.splice(todoIndex, 1);
  return res.status(204).json();
});

module.exports = app;
