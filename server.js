const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

const port = process.env.PORTSERVER || 8000;

app.listen(port, () => {
  console.log(`app listens on port: http://localhost:${port}`);
});
