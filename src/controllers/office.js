/* eslint-disable max-len */
import Office from '../models/office';
import db from '../db/index';

const ControllerOffice = {
  async createOffice(request, response) {
    const { type, officeName, age } = request.body;

    const text = `INSERT INTO
          office(type, officename, age, status, created_on, modefied_on)
          VALUES($1, $2, $3, $4, $5, $6)
          returning *`;
    const values = [
      type.trim(),
      officeName.trim(),
      age.trim(),
      'new',
      new Date(),
      new Date(),
    ];

    try {
      const { rows } = await db.query(text, values);
      return response.status(201).send({
        status: 201,
        message: 'Political Office Created',
        data: rows[0],
      });
    } catch (error) {
      return response.status(400).send({
        status: 400,
        message: error.message,
      });
    }
  },

  getAllOffices(req, res) {
    const data = Office.findAllOffices();
    return res.status(200).send({
      status: 200,
      message: 'All offices retrieved',
      data,
    });
  },

  async getOneOffice(req, res) {
    const text = 'SELECT * FROM office WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'office not found',
        });
      }
      return res.status(200).send({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: 'enter a valid id',
      });
    }
  },
};


export default ControllerOffice;
