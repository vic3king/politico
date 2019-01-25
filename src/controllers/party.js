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
    const address = request.hqAddressUrl;
    let {
      id, name, hqAddressUrl, logoUrl, status, createdOn, createdBy,
    } = Party.createParty(request.body);
    hqAddressUrl = address;
    const data = {
      id,
      name,
      hqAddressUrl,
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
};

export default PartyController;
