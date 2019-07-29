var express = require("express");
var router = express.Router();

const ItemsModel = require("./../../schemas/items.js");
const UtilsHelper = require("./../../helper/utils.js");
const ParamsHelper = require("./../../helper/params.js");

router.get("/(:status)?", (req, res) => {
	let currentStatus = ParamsHelper.getParam(req.params, "status", "all");
	let keyword = ParamsHelper.getParam(req.query, "keyword", "");
	console.log(keyword);

	let statusFilter = UtilsHelper.createFilterStatus(currentStatus);
	let condition = {};
	if (currentStatus !== "all") {
		condition = { status: currentStatus };
	}

	ItemsModel.find(condition).then(items => {
		res.render("pages/items/list", {
			title: "Item List Page",
			items,
			statusFilter,
			currentStatus
		});
	});
});

router.get("/add", (req, res) => {
	res.render("pages/items/add", { title: "Item add Page" });
});

module.exports = router;
