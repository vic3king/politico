/* eslint-disable max-len */
import Office from '../models/office';
import ValidateOffice from '../middlewares/helperoffice';

const ControllerOffice = {
  createOffice(req, res) {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(req.body.age)) {
      return res.status(406).json({
        status: 406,
        error: 'must be a numeber',
      });
    }
    if (req.body.age.trim() < 30) {
      return res.status(406).json({
        status: 406,
        error: 'Too young to run',
      });
    }

    if (ValidateOffice.spaces(req.body)) {
      return res.status(400).send({
        status: 400,
        error: 'Fields should contain actual characters and not only spaces',
      });
    }

    const office = Office.createOffice(req.body);
    return res.status(201).send({
      status: 201,
      data: [office],
    });
  },

  getAllOffices(req, res) {
    const data = Office.findAllOffices();
    return res.status(200).send({
      status: 200,
      message: 'All offices retrieved',
      data,
    });
  },
};


export default ControllerOffice;
