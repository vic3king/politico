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

  getOneOffice(req, res) {
    const data = Office.findById(req.params.id);
    return res.status(200).send({
      status: 200,
      message: 'office retrieved',
      data: [data],
    });
  },
};


export default ControllerOffice;
