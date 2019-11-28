'use strict';
const catModel = require('../models/catModel');
const resize = require('../thumbnails/utils/resize');
const imageMeta = require('../thumbnails/utils/imageMeta');

//const cats = catModel.cats;

const cat_list_get = async(req, res) => {
    const cats = await catModel.getAllCats();
    await res.json(cats);
};

const cat_create_post = async(req, res) => {
    //create thumbnail
    try {
        resize.makeThumbnail(
            req.file.path,
            'thumbnails/' + req.file.filename,
            {width: 160, height: 160}
        );
        //get coordinates
        const coords = await imageMeta.getCoordinates(req.file.path);
        console.log('coords', coords);

        const params = [
            req.body.name,
            req.body.age,
            req.body.weight,
            req.body.owner,
            req.file.filename,
            coords,
        ];
        const response = await catModel.addCat(params);
        console.log(response);
        const cat = await catModel.getCat([response.insertId]);
        await res.json(cat);
    } catch (e) {
        console.log('exif error', e);
        res.status(400).json({message: 'error'});
    }
};

const cat_get = async(req, res) => {
    const params = [req.params.id];
    const cats = await catModel.getCat(params);
    await res.json(cats);
};
const cat_modify_cat = async(body) => {
    await catModel.modifyCat(body.name, body.age, body.weight, body.owner, body.id);
};

const cat_delete_cat = async(id) => {
    console.log("testi" + id);
    await catModel.deleteCat(id);
};

module.exports = {
    cat_list_get,
    cat_create_post,
    cat_get,
    cat_modify_cat,
    cat_delete_cat,
};