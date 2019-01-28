/* eslint-disable max-len */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db/index';


const spaces = (obj) => {
  const firstName = obj.firstname.split(' ').join('');
  const lastName = obj.lastname.split(' ').join('');
  const otherNames = obj.othernames.split(' ').join('');
  const userName = obj.username.split(' ').join('');
  const phoneNumber = obj.phonenumber.split(' ').join('');
  const emailAdd = obj.email.split(' ').join('');
  const passWord = obj.password.split(' ').join('');
  const userType = obj.type.split(' ').join('');
  if (firstName.length < 1) {
    return true;
  }
  if (lastName.length < 1) {
    return true;
  }
  if (otherNames.length < 1) {
    return true;
  }
  if (userName.length < 1) {
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

function isValid(p) {
  const phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  const digits = p.replace(/\D/g, '');
  return phoneRe.test(digits);
}

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

  postUser(request, response, next) {
    const errorsMessages = [];
    if (!request.body.firstname) {
      const error = { firstname: 'firstname is required' };
      errorsMessages.push(error);
    }
    if (!request.body.lastname) {
      const error = { lasrname: 'lastname is required' };
      errorsMessages.push(error);
    }
    if (!request.body.othernames) {
      const error = { othernames: 'othernames is required' };
      errorsMessages.push(error);
    }
    if (!request.body.password) {
      const error = { password: 'password is required' };
      errorsMessages.push(error);
    }
    if (!request.body.email) {
      const error = { email: 'email is required' };
      errorsMessages.push(error);
    }
    if (!request.body.type) {
      const error = { type: 'user Type is required' };
      errorsMessages.push(error);
    }
    if (errorsMessages.length !== 0) {
      return response.status(400).send({
        status: 400,
        error: errorsMessages,
      });
    }
    return next();
  },

  postUserValidate(req, res, next) {
    if (spaces(req.body)) {
      return res.status(400).send({
        status: 400,
        error: 'Fields should contain actual characters and not only spaces',
      });
    }
    if (!isValidEmail(req.body.email)) {
      return res.status(400).send({ message: 'Please enter a valid email address' });
    }
    return next();
  },

  isValidType(req, res, next) {
    const obj = req.body.type.trim();
    if (obj === 'politician' || obj === 'citizen') {
      return next();
    }
    return res.status(406).send({
      status: 406,
      error: 'user type is limited to citizen and politician',
    });
  },

  validValues(req, res, next) {
    const phnNum = req.body.phonenumber;
    // const userName = req.body.username;
    if (req.body.phnNum && isValid(phnNum)) {
      return res.status(400).send({
        status: 400,
        message: 'please enter a valid phone number',
      });
    }
    // if (req.body.userName && !isAlphanumeric(userName)) {
    //   return res.status(400).send({
    //     status: 400,
    //     message: 'please enter a valid username',
    //   });
    // }
    return next();
  },
  async isValidInput(req, res, next) {
    const findOneQuery = 'SELECT * FROM users WHERE username=$1 OR phonenumber=$2 OR email=$3';
    const { rows } = await db.query(findOneQuery, [req.body.username, req.body.phonenumber, req.body.email]);
    if (rows[0]) {
      return res.status(400).send({
        status: 400,
        error: 'user already exists',
      });
    }
    return next();
  },
};

export default Helper;
