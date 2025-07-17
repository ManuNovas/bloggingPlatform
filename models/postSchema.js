const {Schema, model} = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 128,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    maxLength: 64,
  },
  tags: [String]
}, {
  timestamps: true
});

module.exports = model('Post', postSchema);
