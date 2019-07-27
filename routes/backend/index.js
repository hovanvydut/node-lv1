var express = require("express");
var router = express.Router();

router.use("/", require("./home.js"));
router.use("/items", require("./items.js"));
router.use("/dashboard", require("./dashboard.js"));

module.exports = router;
