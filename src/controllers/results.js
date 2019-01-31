import db from '../db/index';

const ControllerResult = {
  async viewResult(req, res) {
    const text = 'SELECT office, candidate, count(candidate) as results FROM vote where vote.office = $1 GROUP BY vote.candidate, vote.office';
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
        message: error.message,
      });
    }
  },
};


export default ControllerResult;
