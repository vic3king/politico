import jwt from 'jsonwebtoken';
import db from '../db/index';

const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({
        status: 401,
        error: {
          message: 'Token is not provided',
        },
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      if (!rows[0]) {
        return res.status(401).send({
          status: 401,
          error: {
            message: 'unauthenticated user',
          },
        });
      }
      req.user = { id: decoded.userId };
      return next();
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: {
          message: error,
        },
      });
    }
  },
};

export default Auth;
