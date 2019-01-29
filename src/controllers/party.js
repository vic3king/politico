/* eslint-disable prefer-const */
import Validate from '../middlewares/helper';
import Party from '../models/party';

const PartyController = {
  createParty(request, response) {
    if (Validate.spaces(request.body)) {
      return response.status(400).send({
        status: 400,
        error: 'Fields should contain actual characters and not only spaces',
      });
    }
    const address = request.hqAddress;
    let {
      id, name, hqAddress, logoUrl, status, createdOn, createdBy,
    } = Party.createParty(request.body);
    hqAddress = address;
    const data = {
      id,
      name,
      hqAddress,
      logoUrl,
      status,
      createdOn,
      createdBy,
    };
    return response.status(201).send({
      status: 201,
      message: 'Political Party Created',
      data: [data],
    });
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
