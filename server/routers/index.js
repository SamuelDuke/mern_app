module.exports = app => {
  app.get("/", (req, res, next) => {
    return res.send("Hello World");
  });

  app.get("/test", (req, res, next) => {
    return res.send("Hello from TEST!!!");
  });
};
