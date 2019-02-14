
import db from '../db/index';

const ControllerVote = {
  async vote(req, res) {
    const { id: voter } = req.user;
    const text = `INSERT INTO
          vote(office, candidate, voter)
          VALUES($1, $2, $3)
          returning *`;
    const values = [
      req.body.office,
      req.body.candidate,
      voter,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send({
        status: 201,
        message: 'thank you for voting',
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

};


export default ControllerVote;
