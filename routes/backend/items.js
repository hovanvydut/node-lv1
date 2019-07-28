var express = require("express");
var router = express.Router();

const ItemsModel = require("./../../schemas/items.js");
const UtilsHelper = require("./../../helper/utils.js");

router.get("/", (req, res) => {
	let statusFilter = UtilsHelper.createFilterStatus();
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
