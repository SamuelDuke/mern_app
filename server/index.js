const express = require("express");
const routers = require("./routers");

const PORT = 8080;

const app = express();

// Setup Routers
routers(app);

app.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`);
});
