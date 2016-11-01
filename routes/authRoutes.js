//routes/authRoutes.js

var express = require('express');
var authRoutes = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');

authRoutes.post('/login', function (req, res){
    User.findOne({username: req.body.username}, function(err,user){
        if (err) res.status(500).send(err);
        if (!user) {
            res.status(401).json({success: false, message: 'username not found'})
        } else if (user) {
            if (user.password !== req.body.password) {
                res.status(401).json({success: false, message: 'Incorrect password'})
            } else {
                var token = jwt.sign(user.toObject(), config.secret, {expiresIn: '24h'});
                res.json({token:token, user:user.toObject(), success: true, message:'Here is your token'})
            }
        }
    });
});

authRoutes.post('/signup', function (req, res){
    User.find({username: req.body.username}, function (err, existingUser) {
        if (err) res.status(500).send(err);
        if (existingUser.length) res.send({success: false, message: 'That username is already taken'});
        else {
            var newUser = new User(req.body);
            newUser.save(function(err,userObj) {
                if (err) res.status(500).send(err);
                res.send({user: userObj, message: 'Successfully created new user!'});
            });
        }
    })
});

module.exports = authRoutes;
