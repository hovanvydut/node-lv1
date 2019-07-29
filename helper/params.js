const ItemsModel = require("./../schemas/items.js");

let createFilterStatus = currentStatus => {
	let statusFilter = [
		{ name: "All", value: "all", count: 0, link: "#", class: "default" },
		{ name: "Active", value: "active", count: 0, link: "#", class: "default" },
		{
			name: "Inactive",
			value: "inactive",
			count: 0,
			link: "#",
			class: "default"
		}
	];

	statusFilter.forEach(item => {
		let condition = {};
		if (item.value !== "all") condition = { status: item.value };
		if (item.value === currentStatus) item.class = "success";
		ItemsModel.countDocuments(condition).then(result => (item.count = result));
	});

	return statusFilter;
};

module.exports = {
	createFilterStatus
};
