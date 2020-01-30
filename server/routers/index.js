const bodyParser = require("body-parser");

const authRoutes = require("./authRoutes");

module.exports = app => {
  // Setup body parser
  app.use(bodyParser.json({ extended: true }));
  app.use(bodyParser.urlencoded({ extended: true }));

  
  app.get("/", (req, res, next) => {
    return res.send("Hello World");
  });

  app.get("/test", (req, res, next) => {
    return res.send("Hello from TEST!!!");
  });

  app.use("/auth", authRoutes);
};
