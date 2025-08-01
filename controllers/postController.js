const Post = require("../models/postModel");
const {request, response} = require("express");

const postController = {
    sendNotFound: function (response) {
        response.status(404).send("La publicación no existe");
    },
    create: function (request, response) {
        const {title, content, category, tags} = request.body;
        Post.create([{title, content, category, tags}], {new: true}).then((post) => {
            response.status(201).json(post[0]);
        }).catch((error) => {
            console.error("PostController error", error);
            response.status(400).send("Ocurrió un problema al crear la publicación");
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
            new: true
        }).then((post) => {
            if (post) {
                response.status(200).json(post);
            } else {
                postController.sendNotFound(response);
            }
        }).catch((error) => {
            console.error(error);
            response.status(400).send("Ocurrió un problema al actualizar la publicación");
        });
    },
    delete: function (request, response) {
        const {id} = request.params;
        Post.findByIdAndDelete(id, {new: true}).then((post) => {
            if (post) {
                response.status(204).json(post);
            } else {
                postController.sendNotFound(response);
            }
        }).catch((error) => {
            console.error(error);
            response.status(404).send("Ocurrió un problema al eliminar la publicaciópn");
        });
    },
    get: function (request, response) {
        const {id} = request.params;
        Post.findById(id).then((post) => {
            if (post) {
                response.status(200).json(post);
            } else {
                postController.sendNotFound(response);
            }
        }).catch((error) => {
            console.error(error);
            response.status(500).send("Ocurrió un problema al obtener la publicación");
        });
    },
    list: function (request, response) {
        const {term} = request.query;
        let filters, regex;
        if (term) {
            regex = new RegExp(term, "i");
            filters = {
                $or: [
                    {title: {$regex: regex}},
                    {content: {$regex: term}},
                    {category: {$regex: term}},
                ]
            };
        } else {
            filters = {}
        }
        Post.find(filters).then((posts) => {
            if (posts.length > 0) {
                response.status(200).json(posts);
            } else {
                postController.sendNotFound(response);
            }
        }).catch((error) => {
            console.error(error);
            response.status(500).send("Ocurrió un problema al cargar las publicaciones");
        });
    }
};

module.exports = postController;
