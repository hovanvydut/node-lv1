const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// 3rd module
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("express-flash-notification");
const session = require("express-session");

// module by me
const systemConfig = require("./configs/system.js");

// connection to db, use mlab
mongoose.connect("mongodb://abc:123456abc@ds135790.mlab.com:35790/todolist", {
	useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("connect to db successfully!");
});

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layout.ejs");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);

app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true
	})
);
app.use(
	flash(app, {
		sessionName: "flash",
		utilityName: "flash",
		localsName: "flash",
		viewName: "elements/flash",
		beforeSingleRender: function(item, callback) {
			callback(null, item);
		},
		afterAllRender: function(htmlFragments, callback) {
			callback(null, htmlFragments.join("\n"));
		}
	})
);

app.locals.systemConfig = systemConfig;

// define route
app.use(`/${systemConfig.prefixAdmin}`, require("./routes/backend/index.js"));
app.use("/", require("./routes/frontend/index.js"));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("pages/error", { title: "Error Page" });
});

module.exports = app;
