const Post = require('../models/postSchema');

const postController = {
  create: function (request, response) {
    const {title, content, category, tags} = request.body;
    Post.create({title, content, category, tags}, {
      new: true,
      runValidators: true
    }).then((post) => {
      response.status(201).json(post);
    }).catch(error => {
      console.log(error);
      response.status(500).json('Ocurrió un error al crear la publicación');
    });
  },
  update: function (request, response) {
    const {id} = request.params;
    const {title, content, category, tags} = request.body;
    Post.findByIdAndUpdate(id, {
      title,
      content,
      category,
      tags
    }, {
      new: true,
      runValidators: true
    }).then((post) => {
      response.status(200).json(post);
    }).catch(error => {
      console.log(error);
      response.status(500).json('Ocurrió un error al actualizar la publicación');
    });
  },
};

module.exports = postController;
