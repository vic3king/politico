import db from '../db/index';
import Helper from '../middlewares/helperuser';


const User = {
  async createUser(req, res) {
    const hashPassword = Helper.hashPassword(req.body.password);
    const text = `INSERT INTO
      users(firstname, lastname, othernames, email, phonenumber, username, type, password)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const values = [
      req.body.firstname.trim(),
      req.body.lastname.trim(),
      req.body.othernames.trim(),
      req.body.email.trim(),
      req.body.phonenumber.trim(),
      req.body.username.trim(),
      req.body.type.trim(),
      hashPassword.trim(),
    ];

    try {
      const { rows } = await db.query(text, values);
      const token = Helper.generateToken(rows[0].id, rows[0].isAdmin);
      const {
        id, firstname, lastname, othernames, username, type, email, phonenumber, isadmin,
      } = rows[0];
      const user = {
        id,
        firstname,
        lastname,
        othernames,
        username,
        type,
        email,
        phonenumber,
        isadmin,
      };
      return res.status(201).send({
        status: 201,
        data: [{
          user,
          token,
          message: 'Succesful signup',
        }],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: error.message,
      });
    }
  },

  async login(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email.trim()]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect' });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password.trim())) {
        return res.status(401).send({ message: 'The credentials you provided is incorrect' });
      }
      const {
        id, firstname, lastname, othernames, username, type, email, phonenumber, isadmin,
      } = rows[0];
      const user = {
        id,
        firstname,
        lastname,
        othernames,
        username,
        type,
        email,
        phonenumber,
        isadmin,
      };
      const token = Helper.generateToken(rows[0].id, rows[0].isadmin);
      return res.status(200).send({
        status: 200,
        data: [{
          message: `welcome to politico ${lastname}`,
          token,
          user,
        }],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default User;
