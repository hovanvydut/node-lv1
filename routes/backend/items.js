var express = require("express");
var router = express.Router();

const ItemsModel = require("./../../schemas/items.js");

router.get("/", (req, res) => {
	// ItemsModel.find({}, (err, items) => {
	// 	err ? console.log(err) : console.log(items);
	// });
	ItemsModel.find({}).then(items => {
		res.render("pages/items/list", {
			title: "Item List Page",
			items: items
		});
	});
});

router.get("/add", (req, res) => {
	res.render("pages/items/add", { title: "Item add Page" });
});

module.exports = router;
