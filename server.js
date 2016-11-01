// server.js
var express = require("express");
var app = express();
var path = require("path");
var morgan = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var expressJwt = require('express-jwt');

var port = process.env.PORT || 5000;

var config = require('./config');

mongoose.connect(config.database);

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// When we get to doing the frontend, we'll put it in a folder called
// 'public' and we'll let express serve up the static files for us.
app.use(express.static(path.join(__dirname, "..", "public")));

app.use('/api', expressJwt({secret: config.secret}));
app.use('/getsessions', require('./routes/sessionRoutes'));
app.use('/api/makeSession', require('./routes/makeSessionRoutes'));
app.use('/auth', require('./routes/authRoutes'));


app.listen(port, function () {
    console.log("Mongoose is loose on port: " + port);
});
