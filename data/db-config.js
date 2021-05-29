const knex = require('knex');
const config = require('../knexfile');

const env = process.env.NODE_ENV

module.exports = knex(config[env])