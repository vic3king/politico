/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import { isURL, isAlpha } from 'validator';
import db from '../db/index';


dotenv.load();
const validId = id => Number.isInteger(parseInt(id, 10));
const spaceUpdate = (obj) => {
  const strName = obj.name.trim();
  if (strName.length < 1) {
    return true;
  }
  return false;
};

const Validate = {
  isValidInputParty(req, res, next) {
    const { name, hqAddress, logoUrl } = req.body;
    if (typeof name === 'number' || typeof hqAddress === 'number' || typeof logoUrl === 'number') {
      return res.status(400).send({
        status: 400,
        error: {
          message: 'invalid input type',
        },
      });
    }
    return next();
  },

  validUrl(req, res, next) {
    const { name } = req.body;
    if (name && !isAlpha(name.trim())) {
      return res.status(400).send({
        status: 400,
        error: {
          message: 'invaild input',
        },
      });
    }
    const url = req.body.logoUrl;
    if (req.body.logoUrl && !isURL(url.trim())) {
      return res.status(400).send({
        status: 400,
        error: {
          message: 'please enter a valid url',
        },
      });
    }
    return next();
  },
  spaces(obj) {
    const strName = obj.name.trim();
    const strHqAddressUrl = obj.hqAddress.trim();
    const strLogoUrl = obj.logoUrl.trim();
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
    const strName = obj.name.trim();
    if (strName.length < 1) {
      return true;
    }
    return false;
  },

  validateParty(request, response, next) {
    if (!request.body.hqAddress || request.body.hqAddress.trim().length < 1) {
      return next();
    }
    let { hqAddress } = request.body;
    hqAddress = hqAddress.trim();
    // eslint-disable-next-line global-require
    const googleMapsClient = require('@google/maps').createClient({
      key: process.env.GOOGLE,
      Promise,
    });

    googleMapsClient.places({
      query: hqAddress,
    })
      .asPromise()
      .then((res) => {
        if (res.json.results) {
          request.hqAddress = res.json.results[0].formatted_address;
        }

        if (res.json.results.length < 1) {
          return response.status(404).send({
            status: 404,
            error: {
              message: 'Address not found, enter a valid add',
            },
          });
        }
        return next();
      })
      .catch(err => response.status(500).send({
        status: 500,
        error: {
          err: err.message,
        },
      }));
  },

  postParty(request, response, next) {
    const errorsMessages = [];
    if (!request.body.name) {
      const error = { name: 'Party name is required' };
      errorsMessages.push(error);
    }
    if (!request.body.hqAddress) {
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
      return response.status(400).send({
        status: 400,
        error: {
          message: 'Party name is required',
        },
      });
    }
    return next();
  },

  updateEmptyName(request, response, next) {
    if (typeof request.body.name === 'number') {
      return response.status(400).send({
        status: 400,
        error: {
          message: 'invalid input type',
        },
      });
    }
    if (request.body.name && spaceUpdate(request.body)) {
      return response.status(400).send({
        status: 400,
        error: {
          message: 'Name Field should contain actual characters and not only spaces',
        },
      });
    }
    return next();
  },

  async partyExists(req, res, next) {
    const findOneQuery = 'SELECT * FROM party WHERE name=$1';
    const { rows } = await db.query(findOneQuery, [req.body.name]);
    if (rows[0]) {
      return res.status(409).send({
        status: 409,
        error: {
          message: 'party already exists',
        },
      });
    }
    return next();
  },

  isNotValid(req, res, next) {
    if (!validId(req.params.id)) {
      return res.status(400).json({
        status: 400,
        error: {
          message: 'The id parameter must be a number',
        },
      });
    }
    return next();
  },
};

export default Validate;
