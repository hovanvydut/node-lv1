var express = require("express");
var router = express.Router();

const systemConfig = require("./../../configs/system");
const ItemsModel = require("./../../schemas/items.js");
const UtilsHelper = require("./../../helper/utils.js");
const ParamsHelper = require("./../../helper/params.js");
const linkIndex = "/" + systemConfig.prefixAdmin + "/items/";

router.get("/(:status)?", (req, res) => {
	let currentStatus = ParamsHelper.getParam(req.params, "status", "all");
	let keyword = ParamsHelper.getParam(req.query, "keyword", "");
	let pagination = {
		totalItems: 1,
		totalItemsPerPage: 3,
		currentPage: parseInt(ParamsHelper.getParam(req.query, "page", 1)),
		pageRanges: 3
	};
	let start = (pagination.currentPage - 1) * pagination.totalItemsPerPage;

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

// change status
router.get("/change-status/:id/:status", (req, res, next) => {
	let id = ParamsHelper.getParam(req.params, "id", "");
	let currentStatus = ParamsHelper.getParam(req.params, "status", "active");
	let status;

	currentStatus === "active" ? (status = "inactive") : (status = "active");
	ItemsModel.updateOne({ _id: id }, { status: status }, (err, raw) => {
		req.flash({
			type: "success",
			message: "Thay đổi Status thành công",
			redirect: false
		});
		res.redirect(linkIndex);
	});
});

// change status - multi
router.post("/change-status/:status", (req, res, next) => {
	let currentStatus = ParamsHelper.getParam(req.params, "status", "active");
	ItemsModel.updateMany(
		{ _id: { $in: req.body.cid } },
		{ status: currentStatus },
		(err, raw) => {
			req.flash({
				type: "success",
				message: "Thay đổi Status thành công của " + raw.n + " phần tử",
				redirect: false
			});
			res.redirect(linkIndex);
		}
	);
});

router.post("/delete", (req, res, next) => {
	ItemsModel.remove({ _id: { $in: req.body.cid } }, err => {
		req.flash({
			type: "success",
			message: "Xoá thành công",
			redirect: false
		});
		res.redirect(linkIndex);
	});
});

// Delete Item
router.get("/delete/:id", (req, res, next) => {
	// let systemConfig = req.app.locals.systemConfig;
	ItemsModel.deleteOne({ _id: req.params.id }, err => {
		req.flash({
			type: "success",
			message: "Xoá thành công",
			redirect: false
		});
		res.redirect(linkIndex);
	});
});

router.post("/delete", (req, res, next) => {
	ItemsModel.remove({ _id: { $in: req.body.cid } }, (err, raw) => {
		req.flash({
			type: "success",
			message: `Xoá thành công ${raw.n} items`,
			redirect: false
		});
	});
});

// Change ordering - Multi
router.post("/change-ordering", (req, res, next) => {
	let cids = req.body.cid;
	let ordering = req.body.ordering;
	if (Array.isArray(cids)) {
		cids.forEach((id, idx) => {
			ItemsModel.updateOne(
				{ _id: id },
				{ ordering: parseInt(ordering[idx]) },
				(err, raw) => {}
			);
		});
	} else {
		ItemsModel.updateOne(
			{ _id: cids },
			{ ordering: parseInt(ordering) },
			(err, raw) => {}
		);
	}
	req.flash({
		type: "success",
		message: "Cập nhật ordering thành công " + cids.length + " phần tử!",
		redirect: false
	});

	res.redirect(linkIndex);
});

router.get("/add", (req, res) => {
	res.render("pages/items/add", { title: "Item add Page" });
});

module.exports = router;
