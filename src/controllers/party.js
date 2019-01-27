/* eslint-disable prefer-const */
import Validate from '../middlewares/helper';
import Party from '../models/party';
import db from '../db/index';

const PartyController = {
  async createParty(request, response) {
    if (Validate.spaces(request.body)) {
      return response.status(400).send({
        status: 400,
        error: 'Fields should contain actual characters and not only spaces',
      });
    }
    const address = request.hqAddressUrl;
    let { name, hqAddressUrl, logoUrl } = request.body;
    hqAddressUrl = address;

    const text = `INSERT INTO
          party(name, hqaddress, logourl, status, created_on, modefied_on)
          VALUES($1, $2, $3, $4, $5, $6)
          returning *`;
    const values = [
      name.trim(),
      hqAddressUrl,
      logoUrl,
      'new',
      new Date(),
      new Date(),
    ];

    try {
      const { rows } = await db.query(text, values);
      return response.status(201).send({
        status: 201,
        message: 'Political Party Created',
        data: rows[0],
      });
    } catch (error) {
      return response.status(400).send({
        status: 400,
        message: error.message,
      });
    }
  },

  getOneParty(req, res) {
    const data = Party.findById(req.params.id);
    return res.status(200).send({
      status: 200,
      message: 'party retrieved',
      data: [data],
    });
  },

  getAllParties(req, res) {
    const data = Party.findAllParties();
    return res.status(200).send({
      status: 200,
      message: 'All parties retrieved',
      data,
    });
  },

  updatedName(req, res) {
    if (!req.body.name) {
      res.status(400).send({
        status: 400,
        message: 'Party name is required',
      });
    }
    if (Validate.spaceUpdate(req.body)) {
      return res.status(400).send({
        status: 400,
        error: 'Field should contain actual characters and not only spaces',
      });
    }
    const updatedName = Party.updateParty(req.params.id, req.body);
    return res.status(200).send({
      status: 200,
      message: 'Party name succesfully updated',
      data: [updatedName],
    });
  },

  deleteOneParty(req, res) {
    const data = Party.deleteById(req.params.id);
    return res.status(200).send(data);
  },
};

export default PartyController;
