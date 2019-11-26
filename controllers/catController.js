'use strict';
const catModel = require('../models/catModel');

//const cats = catModel.cats;

const cat_list_get = async(req, res) => {
    const cats = await catModel.getAllCats();
    await res.json(cats);
};

const cat_create_post = async(req, res) => {
    console.log(req.body);
    const params = [
        req.body.name,
        req.body.age,
        req.body.weight,
        req.body.owner,
        req.file.filename,
    ];
    const response = await catModel.addCat(params);
    console.log(response);
    const cat = await catModel.getCat([response.insertId]);
    await res.json(cat);
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