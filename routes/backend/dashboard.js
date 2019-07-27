var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.render("pages/dashboard/index.ejs", { title: "Dashboard Page" });
});

module.exports = router;
