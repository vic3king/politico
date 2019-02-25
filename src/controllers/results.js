import db from '../db/index';

const ControllerResult = {
  async viewResult(req, res) {
    const text = `SELECT vote.office, users.firstname, users.lastname, party.name as party, count(candidates) as results
    FROM vote, candidates, users, party
    WHERE vote.candidate = candidates.id
    AND candidates.user_id = users.id
    AND candidates.party = party.id
    AND vote.office = $1
    GROUP BY vote.office, vote.candidate, users.firstname, users.lastname, party.name`;

    const values = [
      req.params.id,
    ];
    try {
      const { rows } = await db.query(text, values);
      return res.status(200).send({
        status: 200,
        message: 'results retrived',
        data: rows,
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

export default ControllerResult;
