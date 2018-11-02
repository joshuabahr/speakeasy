const Sequelize = require('sequelize');
// const config = require('../../config');

const db = new Sequelize(process.env.DBURL, {
  pool: {
    max: 1,
    min: 0,
    idle: 10000
  }
});

module.exports = db;
