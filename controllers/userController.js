'use strict';
const userModel = require('../models/userModel');

//const users = userModel.users;

const user_list_get = async(req, res) => {
    const users = await userModel.getAllUsers();
    await res.json(users);
};

const user_create_post = (req, res) => {
    res.send('With this endpoint you can add users.');
};

const user_get = async(req, res) => {
    const params = [req.params.id];
    const users = await userModel.getUser(params);
    await res.json(users);
};

module.exports = {
    user_list_get,
    user_create_post,
    user_get,
};