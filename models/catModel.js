'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try{
    const [rows] = await promisePool.query('SELECT wop_cat.*, wop_user.name as ownername FROM `wop_cat` \n' +
        'JOIN wop_user\n' +
        'ON wop_user.user_id = wop_cat.owner');
    return rows;
  }catch (e) {
    console.log('error', e.message);
  }
};

const getCat = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_cat WHERE cat_id = ?;',
        params,
    );
    return rows;
  }catch (e) {
    console.log('error', e.message);
    return {error: 'error in database query'};
  }
};
const addCat = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO wop_cat (name, age, weight, owner, filename, coords) VALUES (?, ?, ?, ?, ?, ?);',
        params,
    );
    return rows;
  }catch (e) {
    console.log('error', e.message);
    return {error: 'error in database query'};
  }
};

const deleteCat = async (id) => {
  try {
    await promisePool.query(
        'DELETE FROM wop_cat WHERE cat_id = ?;',
        [id],
    );
  }catch (e) {
    console.log('error', e.message);
  }
};

const modifyCat = async(name, age, weight, owner, id) => {
  try{
    await promisePool.execure(
        `UPDATE wop_cat
        SET
        name = ?,
        age = ?,
        weight = ?,
        owner = ?
        WHERE cat_id = ?`,
        [name, age, weight, owner, id],
        function (err, results, fields) {
          console.log(results);
          console.log(fields);
        });
  }catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getAllCats,
  getCat,
  addCat,
  deleteCat,
  modifyCat,
};