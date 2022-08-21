const express = require("express");
const { v4: v4 } = require("uuid");

const app = express();
app.use(express.json());
app.listen(8080, () => console.log("🚀 Server running..."));

module.exports = app;
