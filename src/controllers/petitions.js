import db from '../db/index';

const ControllerPetition = {
  async petition(req, res) {
    const { id: voter } = req.user;
    const text = `INSERT INTO
      petitions(created_by, office, comment, status, evidence)
      VALUES($1, $2, $3, $4, $5)
      returning *`;

    const values = [
      voter,
      req.body.office,
      req.body.comment.trim(),
      'draft',
      req.body.evidence,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send({
        status: 201,
        message: 'Petition raised',
        data: rows[0],
      });
    } catch (error) {
      return res.status(404).send({
        status: 400,
        error: error.message,
      });
    }
  },
};


export default ControllerPetition;
