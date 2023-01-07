require("dotenv").config();
const express = require("express");
var history = require("connect-history-api-fallback");
var compression = require("compression");

const app = express();

app.set("view cache", true);
app.use(history());

app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }
  // fallback to standard filter function
  return compression.filter(req, res);
}

app.use(express.json());

app.use(express.static("dist"));

app.listen(process.env.PORT || 3000, () => {
  console.info(`Listening on port ${process.env.PORT || 3000}!`);
});