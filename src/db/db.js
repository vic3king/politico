/* eslint-disable no-console */
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createType = async () => {
  const type = `
  CREATE TYPE officetype AS ENUM('federal', 'legislative', 'state', 'local-government');
  CREATE TYPE usertype AS ENUM('citizen', 'politician');
  CREATE TYPE partystat AS ENUM('new', 'updated');
  CREATE TYPE officestat AS ENUM('new', 'updated');
 `;

  pool.query(type)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const dropType = async () => {
  const type = `DROP TYPE IF EXISTS officetype;
  DROP TYPE IF EXISTS usertype;
  DROP TYPE IF EXISTS partystat;
  DROP TYPE IF EXISTS officestat;`;
  pool.query(type)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};


/**
 * Create Tables
 */
const createTables = async () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS
      party(
        id serial PRIMARY KEY,
        name VARCHAR(128) NOT NULL UNIQUE,
        hqaddress VARCHAR(128) NOT NULL,
        logourl VARCHAR(128) NOT NULL,
        status partystat NOT NULL,
        modefied_on TIMESTAMP,
        created_on TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS 
      office(
        id serial PRIMARY KEY,
        type officetype NOT NULL,
        officename VARCHAR(128) NOT NULL UNIQUE,
        age VARCHAR(50) NOT NULL,
        status officestat NOT NULL,
        modefied_on TIMESTAMP,
        created_on TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS
      users(
        id serial PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        othernames VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        phoneNumber VARCHAR(50) NOT NULL UNIQUE,
        username VARCHAR(50) NOT NULL,
        registered TIMESTAMP,
        type usertype NOT NULL,
        isAdmin boolean NOT NULL DEFAULT false
      )
      `;

  await pool.query(queryText)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Drop Tables
 */
const dropTables = async () => {
  const queryText = `DROP TABLE IF EXISTS party; 
  DROP TABLE IF EXISTS office;
  DROP TABLE IF EXISTS users`;
  await pool.query(queryText)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const createAllTables = async () => {
  await dropTables();
  await createTables();
};

// createAllTables();
module.exports = {
  createAllTables,
  createTables,
  dropTables,
  createType,
  dropType,
};

require('make-runnable');