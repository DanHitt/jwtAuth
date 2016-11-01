var express = require('express');
var sessionRouter = express.Router();
var Session = require('../models/session');

sessionRouter.route('/')
    .get(function (req, res) {
    Session.find({user: req.user._id},function (err, sessions) {
        if (err) res.status(500).send(err);
        res.send(sessions);
    });
})
    .post(function (req, res) {
    var session = new Session(req.body);
    session.user = req.user;
    session.save(function (err, newSession) {
        if (err) res.status(500).send(err);
        res.status(201).send(newSession);
    })
})
sessionRouter.route('/:sessionId')
    .get(function (req, res) {
    Session.findById({_id: req.params.sessionId, user: req.user._id}, function (err, session) {
        if (err) res.status(500).send(err);
        if (!session) res.status(404).send('No session found.');
        else res.send(session);
    });
})
    .put(function (req, res) {
    Session.findByIdAndUpdate({_id: req.params.sessionId, user: req.user._id}, req, body, {
        new: true
    }, function (err, session) {
        if (err) res.status(500).send(err);
        res.send(session);
    })
})
    .delete(function (req, res) {
    Session.findIdAndRemove({_id: req.params.sessionId, user: req.user._id}, function (err, session) {
        if (err) res.status(500).send(err);
        res.send(session);
    })

})

module.exports = sessionRouter;
