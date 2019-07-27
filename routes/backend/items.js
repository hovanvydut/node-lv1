var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/items/list", { title: "Item List Page" });
});

router.get("/add", (req, res) => {
  res.render("pages/items/add", { title: "Item add Page" });
});

module.exports = router;
