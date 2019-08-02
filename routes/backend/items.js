var express = require("express");
var router = express.Router();

const ItemsModel = require("./../../schemas/items.js");
const UtilsHelper = require("./../../helper/utils.js");
const ParamsHelper = require("./../../helper/params.js");
router.get("/(:status)?", (req, res) => {
	let currentStatus = ParamsHelper.getParam(req.params, "status", "all");
	let keyword = ParamsHelper.getParam(req.query, "keyword", "");
	let pagination = {
		totalItems: 1,
		totalItemsPerPage: 2,
		currentPage: 1,
		pageRanges: 3
	};
	pagination.currentPage = parseInt(
		ParamsHelper.getParam(req.query, "page", 1)
	);
	let start = (pagination.currentPage - 1) * pagination.totalItemsPerPage;

	// let end =(pagination.currentPage - 1) * pagination.totalItemsPerPage +pagination.totalItemsPerPage;

	let statusFilter = UtilsHelper.createFilterStatus(currentStatus);
	let condition = {};

	if (currentStatus === "all") {
		if (keyword !== "") {
			condition = { name: new RegExp(keyword, "gi") };
		}
	} else {
		if (keyword !== "") {
			condition = { status: currentStatus, name: new RegExp(keyword, "gi") };
		} else {
			condition = { status: currentStatus };
		}
	}

	ItemsModel.countDocuments(condition).then(
		data => (pagination.totalItems = data)
	);

	ItemsModel.find(condition)
		.sort({ ordering: "ascending" })
		.skip(start)
		.limit(pagination.totalItemsPerPage)
		.then(items => {
			// items = items.slice(start, end); other way to config pagination instead for use skip and limit
			res.render("pages/items/list", {
				title: "Item List Page",
				items,
				statusFilter,
				currentStatus,
				keyword,
				pagination
			});
		});
});

router.get("/add", (req, res) => {
	res.render("pages/items/add", { title: "Item add Page" });
});

module.exports = router;
