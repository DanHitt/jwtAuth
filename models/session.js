var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    game: {
        type: String,
        required: true

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("Session", sessionSchema);
