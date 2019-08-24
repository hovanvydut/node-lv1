let getParam = (params, property, defaultValue) => {
	if (params.hasOwnProperty(property) && params[property] !== undefined) {
		return [property];
	}
	return defaultValue;
};

module.exports = {
	getParam
};
