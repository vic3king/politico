import { isAlpha } from 'validator';

const validId = id => Number.isInteger(parseInt(id, 10));

const spaces = (obj) => {
  const strType = obj.type.trim();
  const strOfficeName = obj.name.trim();
  if (strType.length < 1) {
    return true;
  }
  if (strOfficeName.length < 1) {
    return true;
  }
  return false;
};

const ValidateOffice = {
  isValidInputOffice(req, res, next) {
    const { type, name, ageLimit } = req.body;
    if (typeof type === 'number' || typeof name === 'number' || typeof ageLimit === 'string' || typeof description === 'string') {
      return res.status(400).send({
        status: 400,
        error: {
          message: 'invalid input type',
        },
      });
    }
    return next();
  },

  postOffice(request, response, next) {
    const errorsMessages = [];
    if (!request.body.type) {
      const error = { error: 'office type is required eg (fedral,state...)' };
      errorsMessages.push(error);
    }
    if (!request.body.name) {
      const error = { error: 'office name is required eg(presiency)' };
      errorsMessages.push(error);
    }
    if (!request.body.ageLimit) {
      const error = { error: 'Kindly Provide your ageLimit' };
      errorsMessages.push(error);
    }
    if (!request.body.description) {
      const error = { error: 'Kindly Provide a description for this office' };
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

  postOfficeValidate(req, res, next) {
    const { name } = req.body;
    if (!isAlpha(name)) {
      return res.status(400).send({
        status: 400,
        error: {
          message: 'invaild input',
        },
      });
    }

    if (spaces(req.body)) {
      return res.status(400).send({
        status: 400,
        error: {
          message: 'Fields should contain actual characters and not only spaces',
        },
      });
    }

    if (req.body.ageLimit < 30) {
      return res.status(400).json({
        status: 400,
        error: {
          agemessage: 'Too young to run',
        },
      });
    }

    return next();
  },

  isValidType(req, res, next) {
    const obj = req.body.type.trim();
    if (obj === 'federal' || obj === 'legislative' || obj === 'state' || obj === 'local-government') {
      return next();
    }
    return res.status(400).send({
      status: 400,
      error: {
        message: 'office type is limited to federal, legislative, state, local government',
      },
    });
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

export default ValidateOffice;
