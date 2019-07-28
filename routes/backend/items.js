var express = require("express");
var router = express.Router();

const ItemsModel = require("./../../schemas/items.js");

router.get("/", (req, res) => {
	let statusFilter = [
		{ name: "All", count: 4, link: "#", class: "default" },
		{ name: "Active", count: 4, link: "#", class: "default" },
		{ name: "Inactive", count: 4, link: "#", class: "default" }
	];
	ItemsModel.find({}).then(items => {
		res.render("pages/items/list", {
			title: "Item List Page",
			items,
			statusFilter
		});
	});
});

router.get("/add", (req, res) => {
	res.render("pages/items/add", { title: "Item add Page" });
});

module.exports = router;
