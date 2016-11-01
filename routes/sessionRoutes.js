var express = require('express');
var sessionRouter = express.Router();
var Session = require('../models/session');

sessionRouter.route('/')
    .get(function (req, res) {
        Session.find(function (err, sessions) {
            if (err) res.status(500).send(err);
            res.send(sessions);
        });
    })


module.exports = sessionRouter;
