const express = require("express");
const config = require("./config/main");
const routers = require("./routers");
const mongooseDatabaseSetup = require("./config/mongooseDatabaseSetup");

const app = express();

// Setup Database
mongooseDatabaseSetup();

// Setup Routers
routers(app);

app.listen(config.port, () => {
  console.log(`The server is listening at port: ${config.port}`);
});
