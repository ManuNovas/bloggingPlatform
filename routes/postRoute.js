const express = require('express');
const postController = require("../controllers/postController");
const createRequest = require("../requests/post/createRequest");
const updateRequest = require("../requests/post/updateRequest");
const idRequest = require("../requests/post/idRequest");
const router = express.Router();

router.post("/", createRequest, postController.create);
router.put("/:id", updateRequest, postController.update);
router.delete("/:id", idRequest, postController.delete);
router.get("/:id", idRequest, postController.get);
router.get("/", postController.list);

module.exports = router;
