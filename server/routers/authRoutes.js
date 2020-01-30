const express = require("express");
const AuthController = require("../controllers/auth");

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.createUser);
router.get("/register", (req, res, next) => {
  return res.send("Hello from Auth");
});

module.exports = router;
