const express = require('express');
const postController = require("../controllers/postController");
const router = express.Router();

router.post('/', postController.create);
router.put('/:id', postController.update);
router.delete('/:id', postController.delete);

module.exports = router;
