var express = require("express");
var router = express.Router();

const ItemsModel = require("./../../schemas/items.js");
const UtilsHelper = require("./../../helper/utils.js");

// List items
// router.get("/(:status)?", (req, res) => {
// 	let statusFilter = UtilsHelper.createFilterStatus();

// 	ItemsModel.find({}).then(items => {
// 		res.render("pages/items/list", {
// 			title: "Item List Page",
// 			items,
// 			statusFilter
// 		});
// 	});
// });

router.get("/(:status)?", (req, res) => {
	let currentStatus = "all";
	if (req.params.hasOwnProperty("status") & (req.params.status !== undefined)) {
		currentStatus = req.params.status;
	}
	let statusFilter = UtilsHelper.createFilterStatus(currentStatus);
	let condition = {};
	if (currentStatus !== "all") {
		condition = { status: currentStatus };
	}

	ItemsModel.find(condition).then(items => {
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
