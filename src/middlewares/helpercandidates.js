import db from '../db/index';

const Candidate = {
  isValidInt(req, res, next) {
    const { office, party, ageLimit } = req.body;
    if (typeof office === 'string' || typeof party === 'string' || ageLimit === 'string') {
      return res.status(400).send({
        error: 'invalid input type',
      });
    }
    return next();
  },

  postCandidate(req, res, next) {
    const { office, party, ageLimit } = req.body;
    const errorsMessages = [];
    if (!office) {
      const error = { office: 'office id is required' };
      errorsMessages.push(error);
    }
    if (!party) {
      const error = { name: 'party id is required' };
      errorsMessages.push(error);
    }
    if (!ageLimit) {
      const error = { ageLimit: 'Kindly Provide your age' };
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

  async isValidCandidate(req, res, next) {
    const findOneQuery = 'SELECT user_id FROM candidates WHERE user_id=$1';
    const { rows } = await db.query(findOneQuery, [req.params.id]);
    if (rows[0]) {
      return res.status(409).send({
        status: 409,
        error: 'candidate already exists',
      });
    }
    return next();
  },

  async isValidIDt(req, res, next) {
    const findOneQuery = 'SELECT id FROM users WHERE id=$1';
    const { rows } = await db.query(findOneQuery, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).send({
        status: 404,
        error: 'user not found',
      });
    }
    return next();
  },

  async isValidParty(req, res, next) {
    const findOneQuery = 'SELECT id FROM party WHERE id=$1';
    const { rows } = await db.query(findOneQuery, [req.body.party]);
    if (!rows[0]) {
      return res.status(404).send({
        status: 404,
        error: 'party not found',
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

};

export default Candidate;
