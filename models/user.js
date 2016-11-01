//models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    fname : String,
    lname : String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User", userSchema);
