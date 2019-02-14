import db from '../db/index';

const Results = {

  async verifyOffice(req, res, next) {
    const findOneQuery = 'SELECT * FROM office WHERE id =$1';
    const values = [
      req.params.id,
    ];
    const { rows } = await db.query(findOneQuery, values);
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

export default Results;
