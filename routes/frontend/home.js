var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.render("pages/home/index.ejs", { title: "Frontend home page" });
});

module.exports = router;
