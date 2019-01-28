/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import { isURL } from 'validator';

dotenv.load();
const validId = id => Number.isInteger(parseInt(id, 10));
const spaceUpdate = (obj) => {
  const strName = obj.name.split(' ').join('');
  if (strName.length < 1) {
    return true;
  }
  return false;
};

const Validate = {
  validUrl(req, res, next) {
    const url = req.body.logoUrl;
    if (req.body.logoUrl && !isURL(url)) {
      return res.status(400).send({
        status: 400,
        message: 'please enter a valid url',
      });
    }
    return next();
  },
  spaces(obj) {
    const strName = obj.name.split(' ').join('');
    const strHqAddressUrl = obj.hqAddressUrl.split(' ').join('');
    const strLogoUrl = obj.logoUrl.split(' ').join('');
    if (strName.length < 1) {
      return true;
    }
    if (strHqAddressUrl.length < 1) {
      return true;
    }
    if (strLogoUrl.length < 1) {
      return true;
    }
    return false;
  },

  spaceUpdate(obj) {
    const strName = obj.name.split(' ').join('');
    if (strName.length < 1) {
      return true;
    }
    return false;
  },

  validateParty(request, response, next) {
    if (!request.body.hqAddressUrl || request.body.hqAddressUrl.split(' ').join('').length < 1) {
      return next();
    }
    let { hqAddressUrl } = request.body;
    hqAddressUrl = hqAddressUrl.trim();
    // eslint-disable-next-line global-require
    const googleMapsClient = require('@google/maps').createClient({
      key: process.env.GOOGLE,
      Promise,
    });

    googleMapsClient.places({
      query: hqAddressUrl,
    })
      .asPromise()
      .then((res) => {
        if (res.json.results) {
          request.hqAddressUrl = res.json.results[0].formatted_address;
        } else {
          return response.status(404).send({
            status: 404,
            error: 'Address not found, enter a valid add',
          });
        }
        return next();
      })
      .catch(err => response.status(500).send({
        status: 500,
        error: err.message,
      }));
  },

  postParty(request, response, next) {
    const errorsMessages = [];
    if (!request.body.name) {
      const error = { name: 'Party name is required' };
      errorsMessages.push(error);
    }
    if (!request.body.hqAddressUrl) {
      const error = { Address: 'your Address is required' };
      errorsMessages.push(error);
    }
    if (!request.body.logoUrl) {
      const error = { logoUrl: 'Kindly upload your logo Url' };
      errorsMessages.push(error);
    }
    if (errorsMessages.length !== 0) {
      return response.status(400).send({
        status: 400,
        error: errorsMessages,
      });
    }
    return next();
  },

  upadteNoName(request, response, next) {
    if (!request.body.name) {
      response.status(400).send({
        status: 400,
        message: 'Party name is required',
      });
    }
    return next();
  },

  updateEmptyName(request, response, next) {
    if (spaceUpdate(request.body)) {
      return response.status(400).send({
        status: 400,
        error: 'Name Field should contain actual characters and not only spaces',
      });
    }
    return next();
  },

  isNotValid(req, res, next) {
    if (!validId(req.params.id)) {
      return res.status(406).json({
        status: 406,
        error: 'The id parameter must be a number',
      });
    }
    return next();
  },
};

export default Validate;
