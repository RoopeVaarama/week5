'use strict';
const userModel = require('../models/userModel');

//const users = userModel.users;

const user_list_get = async (req, res) => {
    const users = await userModel.getAllUsers();
    await res.json(users);
};

const user_create_post = async (req, res) => {
    console.log(req.body)
    const params = [
        req.body.name,
        req.body.email,
        req.body.passwd,
    ];
    const response = await userModel.addUser(params);
    console.log(response);
    const user = await userModel.getUser([response.insertId]);
    await res.json(user);
};

const user_get = async (req, res) => {
    const params = [req.params.id];
    const users = await userModel.getUser(params);
    await res.json(users);
};

module.exports = {
    user_list_get,
    user_create_post,
    user_get,
};