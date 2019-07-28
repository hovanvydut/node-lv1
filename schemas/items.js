const mongoose = require("mongoose");

var itemsSchema = new mongoose.Schema({
	id: String,
	name: String,
	status: String,
	ordering: Number
});

module.exports = mongoose.model("items", itemsSchema);
