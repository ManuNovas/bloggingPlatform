const express = require('express');
const postController = require("../controllers/postController");
const router = express.Router();

router.post('/', postController.create);
router.put('/:id', postController.update);

module.exports = router;
