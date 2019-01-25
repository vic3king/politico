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
    let { name, hqAddressUrl, logoUrl } = Party.createParty(request.body);
    hqAddressUrl = address;
    const data = {
      name,
      hqAddressUrl,
      logoUrl,
    };
    return response.status(201).send({
      status: 201,
      message: 'Political Party Created',
      data: [data],
    });
  },
};

export default PartyController;
