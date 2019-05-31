/* eslint-disable max-len */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db/index';

const spacesLogin = (obj) => {
  const emailAdd = obj.email.trim();
  const passWord = obj.password.trim();
  if (passWord.length < 1) {
    return true;
  }
  if (emailAdd.length < 1) {
    return true;
  }
  return false;
};
const spaces = (obj) => {
  const firstName = obj.firstname.trim();
  const lastName = obj.lastname.trim();
  const otherNames = obj.othernames.trim();
  const phoneNumber = obj.phonenumber.trim();
  const emailAdd = obj.email.trim();
  const passWord = obj.password.trim();
  const userType = obj.type.trim();
  if (firstName.length < 1) {
    return true;
  }
  if (lastName.length < 1) {
    return true;
  }
  if (otherNames.length < 1) {
    return true;
  }
  if (phoneNumber.length < 1) {
    return true;
  }
  if (emailAdd.length < 1) {
    return true;
  }
  if (passWord.length < 1) {
    return true;
  }
  if (userType.length < 1) {
    return true;
  }
  return false;
};

const isValidEmail = email => /\S+@\S+\.\S+/.test(email);

const isValid = phoneNumber => !(/^[\d+-]{3,15}$/.test(phoneNumber));

const Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(id, isadmin) {
    const token = jwt.sign({
      userId: id,
      isAdmin: isadmin,
    },
    process.env.SECRET, { expiresIn: '7d' });
    return token;
  },

  isValidInputSignup(req, res, next) {
    const {
      firstname, lastname, othernames, email, username, type, password,
    } = req.body;
    if (typeof firstname === 'number' || lastname === 'number' || typeof othernames === 'number' || typeof email === 'number' || typeof username === 'number' || typeof type === 'number' || typeof password === 'number') {
      return res.status(400).send({
        status: 400,
        error: {
          message: 'invalid input type',
        },
      });
    }
    return next();
  },

  isValidInputLogin(req, res, next) {
    const { email, password } = req.body;
    if (typeof email === 'number' || password === 'number') {
      return res.status(400).send({
        status: 400,
        error: {
          message: 'invalid input type',
        },
      });
    }
    return next();
  },
  postUser(request, response, next) {
    const errorsMessages = [];
    if (!request.body.firstname) {
      const error = { error: 'firstname is required' };
      errorsMessages.push(error);
    }
    if (!request.body.lastname) {
      const error = { error: 'lastname is required' };
      errorsMessages.push(error);
    }
    if (!request.body.othernames) {
      const error = { error: 'othernames is required' };
      errorsMessages.push(error);
    }
    if (!request.body.password) {
      const error = { error: 'password is required' };
      errorsMessages.push(error);
    }
    if (!request.body.email) {
      const error = { error: 'email is required' };
      errorsMessages.push(error);
    }
    if (!request.body.type) {
      const error = { error: 'user Type is required' };
      errorsMessages.push(error);
    }
    if (!request.body.phonenumber) {
      const error = { error: 'user phonenumber is required' };
      errorsMessages.push(error);
    }
    if (errorsMessages.length !== 0) {
      return response.status(400).send({
        status: 400,
        error: {
          message: errorsMessages,
        },
      });
    }
    return next();
  },

  postUserValidate(req, res, next) {
    if (spaces(req.body)) {
      return res.status(400).send({
        status: 400,
        error: {
          message: 'Fields should contain actual characters and not only spaces',
        },
      });
    }
    if (!isValidEmail(req.body.email)) {
      return res.status(400).send({
        status: 400,
        error: {
          message: 'Please enter a valid email address',
        },
      });
    }
    return next();
  },

  postValidateLogin(req, res, next) {
    const errorsMessages = [];
    if (!req.body.password) {
      const error = { error: 'password is required' };
      errorsMessages.push(error);
    }
    if (!req.body.email) {
      const error = { error: 'email is required' };
      errorsMessages.push(error);
    }
    if (errorsMessages.length !== 0) {
      return res.status(400).send({
        status: 400,
        error: {
          message: errorsMessages,
        },
      });
    }

    if (spacesLogin(req.body)) {
      return res.status(400).send({
        status: 400,
        error: {
          message: 'Fields should contain actual characters and not only spaces',
        },
      });
    }

    if (!isValidEmail(req.body.email)) {
      return res.status(400).send({
        status: 400,
        error: {
          email: 'Please enter a valid email address',
        },
      });
    }
    return next();
  },

  isValidType(req, res, next) {
    const obj = req.body.type.trim();
    if (obj === 'politician' || obj === 'citizen') {
      return next();
    }
    return res.status(400).send({
      status: 400,
      error: {
        message: 'user type is limited to citizen and politician',
      },
    });
  },

  validValues(req, res, next) {
    const phnNum = req.body.phonenumber;
    if (phnNum && isValid(phnNum)) {
      return res.status(400).send({
        status: 400,
        error: {
          phone: 'phone number must be between 3 - 15 numbers',
        },
      });
    }
    return next();
  },
  async isValidInput(req, res, next) {
    const findOneQuery = 'SELECT * FROM users WHERE phonenumber=$1 OR email=$2';
    const { rows } = await db.query(findOneQuery, [req.body.phonenumber, req.body.email]);
    if (rows[0]) {
      return res.status(400).send({
        status: 400,
        error: {
          user: 'user already exists',
        },
      });
    }
    return next();
  },

  async isAdmin(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({
        status: 400,
        error: {
          message: 'Token is not provided',
        },
      });
    }
    const decoded = await jwt.verify(token, process.env.SECRET);
    if (decoded.isAdmin === false) {
      return res.status(403).json({
        status: 400,
        error: {
          message: 'only admin users have access to this route',
        },
      });
    }
    return next();
  },
};

export default Helper;
