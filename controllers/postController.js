const Post = require('../models/postSchema');

const postController = {
  notFoundResponse: function (response) {
    response.status(404).send('La publicación no existe');
  },
  create: function (request, response) {
    const {title, content, category, tags} = request.body;
    Post.create({title, content, category, tags}).then((post) => {
      if (post) {
        response.status(201).json(post);
      } else {
        postController.notFoundResponse(response);
      }
    }).catch(error => {
      console.log(error);
      response.status(500).send('Ocurrió un error al crear la publicación');
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
      if (post) {
        response.status(200).json(post);
      } else {
        postController.notFoundResponse(response);
      }
    }).catch(error => {
      console.log(error);
      response.status(500).send('Ocurrió un error al actualizar la publicación');
    });
  },
  delete: function (request, response) {
    const {id} = request.params;
    Post.findByIdAndDelete(id).then(post => {
      if (post) {
        response.status(200).json(post);
      } else {
        postController.notFoundResponse(response);
      }
    }).catch(error => {
      console.log(error);
      response.status(500).send('Ocurrió un error al eliminar la publicación');
    });
  },
};

module.exports = postController;
