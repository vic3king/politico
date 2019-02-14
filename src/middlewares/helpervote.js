import db from '../db/index';

const Vote = {
  isValidInt(req, res, next) {
    const { office, candidate } = req.body;
    if (typeof office === 'string' || typeof candidate === 'string') {
      return res.status(400).send({
        status: 400,
        error: {
          message: 'invalid input type',
        },
      });
    }
    return next();
  },

  postCandidate(req, res, next) {
    const { office, candidate } = req.body;
    const errorsMessages = [];
    if (!office) {
      const error = { office: 'office id is required' };
      errorsMessages.push(error);
    }
    if (!candidate) {
      const error = { candidate: 'candidate id is required' };
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
    return next();
  },

  async hasVoted(req, res, next) {
    const { id: voter } = req.user;
    const findOneQuery = 'SELECT * FROM vote WHERE office =$1 AND voter =$2';
    const values = [
      req.body.office,
      voter,
    ];
    const { rows } = await db.query(findOneQuery, values);
    if (rows[0]) {
      return res.status(409).send({
        status: 409,
        error: {
          message: 'you already cast your vote for this candidate',
        },
      });
    }
    return next();
  },

  async isValidCandidate(req, res, next) {
    const findOneQuery = 'SELECT id FROM candidates WHERE id=$1';
    const { rows } = await db.query(findOneQuery, [req.body.candidate]);
    if (!rows[0]) {
      return res.status(404).send({
        status: 404,
        error: {
          message: 'candidate not found',
        },
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
        error: {
          message: 'office not found',
        },
      });
    }
    return next();
  },

};

export default Vote;
