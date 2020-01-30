const bodyParser = require("body-parser");
const passport = require("passport");

const passportStrategy = require("../config/passport");
const requireAuth = passport.authenticate("jwt", { session: false });

const authRoutes = require("./authRoutes");
const apiRoutes = require("./apiRoutes");

module.exports = app => {
  // Setup body parser
  app.use(bodyParser.json({ extended: true }));
  app.use(bodyParser.urlencoded({ extended: true }));

  // Add route authentication
  passportStrategy(app);

  app.get("/", (req, res, next) => {
    return res.send("Hello World");
  });

  app.get("/test", (req, res, next) => {
    return res.send("Hello from TEST!!!");
  });

  app.use("/auth", authRoutes);

  app.use("/api", requireAuth, apiRoutes);
};
