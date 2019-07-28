const mongoose = require("mongoose");

var itemsSchema = new mongoose.Schema({
	id: String,
	name: String,
	status: Number,
	ordering: Number
});

module.exports = mongoose.model("items", itemsSchema);
