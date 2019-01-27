DROP DATABASE IF EXISTS politico;
CREATE DATABASE politico;

\c politico;

CREATE TYPE officetype AS ENUM('federal', 'legislative', 'state', 'local-government');
  CREATE TYPE usertype AS ENUM('citizen', 'politician');
  CREATE TYPE stat AS ENUM('new', 'updated');

  CREATE TABLE IF NOT EXISTS
      party(
        id serial PRIMARY KEY,
        name VARCHAR(128) NOT NULL UNIQUE,
        hqaddress VARCHAR(128) NOT NULL,
        logourl VARCHAR(128) NOT NULL,
        status stat NOT NULL,
        modefied_on TIMESTAMP,
        created_on TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS 
      office(
        id serial PRIMARY KEY,
        type officetype NOT NULL,
        officename VARCHAR(128) NOT NULL UNIQUE,
        age VARCHAR(50) NOT NULL,
        status stat NOT NULL,
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
      );