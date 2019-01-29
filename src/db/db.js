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

const createAdmin = async () => {
  const user = ` INSERT INTO
  users(firstname, lastname, othernames, email, phoneNumber, username, password, isadmin, type)
  VALUES('akaniru', 'victory', 'ifeanyi', 'example@yahoo.com', '07063212299','vee', '$2a$08$7e/bWKTSvmvI.34fgssyY.N69EYPjTpYLnWKxPN8NJXDZES9Ol69m', 'true', 'admin');`;

  pool.query(user)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createType = async () => {
  const type = `
  CREATE TYPE officetype AS ENUM('federal', 'legislative', 'state', 'local-government');
  CREATE TYPE usertype AS ENUM('citizen', 'politician', 'admin');
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
        name VARCHAR(128) NOT NULL UNIQUE,
        ageLimit VARCHAR(50) NOT NULL,
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
        password VARCHAR(128) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        phonenumber VARCHAR(128) NOT NULL UNIQUE,
        username VARCHAR(50) NOT NULL UNIQUE,
        type usertype NOT NULL,
        registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modefied_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
  await createAdmin();
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
