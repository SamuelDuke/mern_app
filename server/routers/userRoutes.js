const express = require("express");
const Controller = require("../controllers/user");

const router = express.Router();

router.get("/", Controller.getAll);
router.put("/update", Controller.updateMe);
router.get("/me", Controller.getMe);

router.get("/:userId", Controller.getById);

module.exports = router;
