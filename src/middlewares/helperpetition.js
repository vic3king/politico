import { isURL } from 'validator';
import db from '../db/index';

const Petition = {
  isValidInt(req, res, next) {
    const { office, comment } = req.body;
    if (typeof office === 'string' || typeof comment === 'number') {
      return res.status(400).send({
        error: 'invalid input type',
      });
    }
    return next();
  },

  postCandidate(req, res, next) {
    const { office, comment } = req.body;
    const errorsMessages = [];
    if (!office) {
      const error = { office: 'office id is required' };
      errorsMessages.push(error);
    }
    if (!comment) {
      const error = { comment: 'comment is required' };
      errorsMessages.push(error);
    }

    if (errorsMessages.length !== 0) {
      return res.status(400).send({
        status: 400,
        error: errorsMessages,
      });
    }
    return next();
  },

  async isOffice(req, res, next) {
    const findOneQuery = 'SELECT id FROM office WHERE id=$1';
    const { rows } = await db.query(findOneQuery, [req.body.office]);
    if (!rows[0]) {
      return res.status(404).send({
        status: 404,
        error: 'office not found',
      });
    }
    return next();
  },

  async hasPetitioned(req, res, next) {
    const { id: voter } = req.user;
    const findOneQuery = 'SELECT * FROM petitions WHERE office =$1 AND created_by =$2';
    const values = [
      req.body.office,
      voter,
    ];
    const { rows } = await db.query(findOneQuery, values);
    if (rows[0]) {
      return res.status(409).send({
        status: 409,
        error: 'already raised a petition for this office',
      });
    }
    return next();
  },

  validPost(req, res, next) {
    const url = req.body.evidence;
    if (req.body.evidence && !isURL(url.trim())) {
      return res.status(400).send({
        status: 400,
        message: 'please enter a valid url',
      });
    }
    return next();
  },
};

export default Petition;
