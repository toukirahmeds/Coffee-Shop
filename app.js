var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const SocketServer = require("ws").Server;

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/menu_items', require("./routes/menu_items"));
app.use('/orders', require("./routes/orders"));

const socketServer = new SocketServer({
  port: 4000
});

// Stores the client connections
let clientSocketConnections = {};
let clientCounter = 0;
socketServer.on("connection", (socket) => {
  clientCounter++;
  clientSocketConnections[clientCounter] = socket;
});

mongoose.connect("mongodb://localhost:27017/coffee_shop", {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, () => {
  console.log("connected to mongodb");
});

// Start CRON JOB
require("./schedulers/order")(clientSocketConnections);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  next();
  // res.render('error');
});

module.exports = app;
