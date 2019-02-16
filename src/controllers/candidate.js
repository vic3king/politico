
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
      req.body.ageLimit,
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
        error: {
          message: error.message,
        },
      });
    }
  },

  async getCandidatesByOffice(req, res) {
    const text = `SELECT candidates.id, candidates.office, users.firstname, users.lastname, office.name AS officename, party.name AS partyname
    FROM users JOIN candidates
    ON users.id = candidates.user_id
    JOIN office ON candidates.office = office.id
    JOIN party ON candidates.party = party.id
    WHERE office = $1`;
    const value = [req.params.office];

    try {
      const { rows } = await db.query(text, value);
      if (!rows) {
        return res.status(404).send({
          status: 404,
          error: {
            message: 'No candidate was found',
          },
        });
      }
      return res.status(200).send({
        status: 200,
        message: 'Candidates retrieved',
        data: rows,
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: {
          message: 'enter a valid id',
        },
      });
    }
  },
};


export default ControllerCandidate;
