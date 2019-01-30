DROP DATABASE IF EXISTS politico;
CREATE DATABASE politico;

\c politico;

CREATE TYPE officetype AS ENUM('federal', 'legislative', 'state', 'local-government');
CREATE TYPE usertype AS ENUM('citizen', 'politician', 'admin');
CREATE TYPE partystat AS ENUM('new', 'updated');
CREATE TYPE officestat AS ENUM('new', 'updated');

CREATE TABLE IF NOT EXISTS party(
  id serial PRIMARY KEY,
  name VARCHAR(128) NOT NULL UNIQUE,
  hqaddress VARCHAR(128) NOT NULL,
  logourl VARCHAR(128) NOT NULL,
  status partystat NOT NULL,
  modefied_on TIMESTAMP,
  created_on TIMESTAMP
);

CREATE TABLE IF NOT EXISTS  office(
  id serial PRIMARY KEY,
  type officetype NOT NULL,
  officename VARCHAR(128) NOT NULL UNIQUE,
  age VARCHAR(50) NOT NULL,
  status officestat NOT NULL,
  modefied_on TIMESTAMP,
  created_on TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users(
  id serial PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  othernames VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  phoneNumber VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL,
  username VARCHAR(50) NOT NULL,
  registered TIMESTAMP,
  type usertype NOT NULL,
  isAdmin boolean NOT NULL DEFAULT false
);

 CREATE TABLE IF NOT EXISTS 
      candidates( 
        id SERIAL PRIMARY KEY,
        office INT REFERENCES office(id) ON DELETE CASCADE,
        party INT REFERENCES party(id) ON DELETE CASCADE,
        ageLimit VARCHAR(50) NOT NULL,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        registered_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
INSERT INTO
      users(firstname, lastname, othernames, email, phoneNumber, username, password, isadmin, type)
      VALUES('akaniru', 'victory', 'ifeanyi', 'example@gmail.com', '07063212299','vee', '$2a$08$7e/bWKTSvmvI.34fgssyY.N69EYPjTpYLnWKxPN8NJXDZES9Ol69m', 'true', 'admin');