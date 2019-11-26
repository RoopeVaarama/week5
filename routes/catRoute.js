'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const catController = require('../controllers/catController');

router.get('/', catController.cat_list_get);

router.get('/:id', catController.cat_get);

router.post('/', upload.single('cat'), catController.cat_create_post);

router.put('/', async(req, res) => {
    await catController.cat_modify_cat(req.body);
    res.send("Update received!");
});

router.delete('/:id', async (req, res) => {

    await catController.cat_delete_cat(req.params.id);
    res.send("Cat deleted!");
});
module.exports = router;