const express = require("express");
const Todo = require("../models/Todo");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

module.exports = router;