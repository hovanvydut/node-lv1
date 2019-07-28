const ItemsModel = require("./../schemas/items.js");

let createFilterStatus = () => {
	let statusFilter = [
		{ name: "All", value: "all", count: 4, link: "#", class: "default" },
		{ name: "Active", value: "active", count: 4, link: "#", class: "default" },
		{
			name: "Inactive",
			value: "inactive",
			count: 4,
			link: "#",
			class: "default"
		}
	];

	statusFilter.forEach(item => {
		let condition = {};
		item.value !== "all" ? (condition = { status: item.value }) : condition;
		ItemsModel.countDocuments(condition).then(result => (item.count = result));
	});

	return statusFilter;
};

module.exports = {
	createFilterStatus
};
