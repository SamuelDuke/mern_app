const express = require("express");

const PORT = 8080;

const app = express();

app.get("/", (req, res, next) => {
  return res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`);
});
