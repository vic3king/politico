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
  users(firstname, lastname, othernames, email, phoneNumber, password, isadmin, type)
  VALUES('akaniru', 'victory', 'ifeanyi', 'example@yahoo.com', '07063212299', '$2a$08$7e/bWKTSvmvI.34fgssyY.N69EYPjTpYLnWKxPN8NJXDZES9Ol69m', 'true', 'admin');`;

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
  CREATE TYPE petitiontype AS ENUM('draft', 'under-investigation', 'rejected', 'resolved');
  CREATE TYPE officetype AS ENUM('federal', 'legislative', 'state', 'local-government');
  CREATE TYPE usertype AS ENUM('citizen', 'politician', 'admin');
  CREATE TYPE partystat AS ENUM('new', 'updated');
  CREATE TYPE officestat AS ENUM('new', 'updated');
  CREATE TYPE status AS ENUM('approved', 'pending', 'rejected');
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
  const type = `DROP TYPE IF EXISTS petitiontype;
  DROP TYPE IF EXISTS officetype;
  DROP TYPE IF EXISTS usertype;
  DROP TYPE IF EXISTS partystat;
  DROP TYPE IF EXISTS officestat;
  DROP TYPE IF EXISTS status;`;
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
        description VARCHAR(50),
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
        type usertype NOT NULL,
        registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modefied_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        isAdmin boolean NOT NULL DEFAULT false
      );

      CREATE TABLE IF NOT EXISTS 
      candidates( 
        id SERIAL PRIMARY KEY,
        office INT REFERENCES office(id) ON DELETE CASCADE,
        party INT REFERENCES party(id) ON DELETE CASCADE,
        ageLimit VARCHAR(50) NOT NULL,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        status status NOT NULL,
        registered_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS vote( 
        id SERIAL PRIMARY KEY,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        office INT REFERENCES office(id) ON DELETE CASCADE,
        candidate INT REFERENCES candidates(id) ON DELETE CASCADE,
        voter INT REFERENCES users(id) ON DELETE CASCADE
          );

      CREATE TABLE IF NOT EXISTS petitions( 
        id SERIAL PRIMARY KEY,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_by INT REFERENCES users(id) ON DELETE CASCADE,
        office INT REFERENCES office(id) ON DELETE CASCADE,
        comment VARCHAR(128) NOT NULL,
        status petitiontype NOT NULL,
        evidence VARCHAR(128)
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
  const queryText = `
  DROP TABLE IF EXISTS vote;
  DROP TABLE IF EXISTS candidates;
  DROP TABLE IF EXISTS party; 
  DROP TABLE IF EXISTS petitions;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS office;
  `;
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
