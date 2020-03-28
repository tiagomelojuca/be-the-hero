const knex = require('knex');
const conf = require('../../knexfile');

const thisEnv = process.env.NODE_ENV == 'test' ? conf.test : conf.development;

const connection = knex(thisEnv);

module.exports = connection;