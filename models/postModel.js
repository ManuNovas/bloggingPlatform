const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 128
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        maxLength: 64
    },
    tags: [{
        type: String,
        required: true,
        maxLength: 32
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);
