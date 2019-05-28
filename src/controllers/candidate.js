
import db from '../db/index';
import validCandidateQueryString from '../middlewares/queryValidator';

const ControllerCandidate = {
  async createCandidate(req, res) {
    const text = `INSERT INTO
          candidates(office, party, user_id, agelimit, status)
          VALUES($1, $2, $3, $4, $5)
          returning *`;
    const values = [
      req.body.office,
      req.body.party,
      req.params.id,
      req.body.ageLimit,
      'pending',
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
    const text = `SELECT candidates.id, candidates.office, users.firstname, users.lastname, office.name AS officename, party.name AS partyname, candidates.status
    FROM users JOIN candidates
    ON users.id = candidates.user_id
    JOIN office ON candidates.office = office.id
    JOIN party ON candidates.party = party.id
    WHERE office = $1 AND candidates.status = 'approved'`;
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

  async getAllCandidatesByStatus(req, res) {
    const findAllQuery = 'SELECT candidates.id, candidates.user_id, candidates.office, candidates.party, users.firstname, users.lastname, party.name, candidates.status FROM candidates JOIN users ON candidates.user_id = users.id JOIN party ON candidates.party = party.id WHERE candidates.status = $1';

    try {
      if (!validCandidateQueryString(req.query)) {
        return res.status(400).json({
          errors: {
            body: ['Invalid query string'],
          },
        });
      }

      const values = [req.query.status];

      const { rows } = await db.query(findAllQuery, values);
      return res.status(200).send({
        status: 200,
        message: 'All Candidates retrieved',
        data: rows,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: {
          message: error.message,
        },
      });
    }
  },

  async updateStatus(req, res) {
    const updateOneQuery = `UPDATE candidates
    SET status=$1
    WHERE id=$2 returning *`;
    try {
      const { rows } = await db.query(updateOneQuery, [req.body.status.trim(), req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'candidate not found',
        });
      }
      return res.status(200).send({
        status: 200,
        message: 'Candidate status updated',
        data: rows[0],
      });
    } catch (err) {
      return res.status(400).send({
        status: 400,
        error: {
          message: err.message,
        },
      });
    }
  },
};


export default ControllerCandidate;
