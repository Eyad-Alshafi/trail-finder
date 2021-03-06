var mongoose = require("mongoose");
var trailSchema = new mongoose.Schema({
    name: String,
    distance: String,
    image: String,
    location: String,
    createdAt: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
});

module.exports = mongoose.model("Trail", trailSchema);