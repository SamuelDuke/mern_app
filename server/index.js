const express = require("express");
const config = require("./config/main");
const routers = require("./routers");

const app = express();

// Setup Routers
routers(app);

app.listen(config.port, () => {
  console.log(`The server is listening at port: ${config.port}`);
});
