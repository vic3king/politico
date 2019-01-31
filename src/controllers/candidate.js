
import db from '../db/index';

const ControllerCandidate = {
  async createCandidate(req, res) {
    const text = `INSERT INTO
          candidates(office, party, user_id, agelimit)
          VALUES($1, $2, $3, $4)
          returning *`;
    const values = [
      req.body.office,
      req.body.party,
      req.params.id,
      req.body.ageLimit.trim(),
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send({
        status: 201,
        message: 'candidate registered',
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: error.message,
      });
    }
  },

};


export default ControllerCandidate;
