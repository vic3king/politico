import Office from '../models/office';

const validId = id => Number.isInteger(parseInt(id, 10));

const spaces = (obj) => {
  const strType = obj.type.split(' ').join('');
  const strOfficeName = obj.officeName.split(' ').join('');
  if (strType.length < 1) {
    return true;
  }
  if (strOfficeName.length < 1) {
    return true;
  }
  return false;
};

const ValidateOffice = {
  postOffice(request, response, next) {
    const errorsMessages = [];
    if (!request.body.type) {
      const error = { type: 'office type is required eg (fedral,state...)' };
      errorsMessages.push(error);
    }
    if (!request.body.officeName) {
      const error = { officeName: 'office name is required eg(presiency)' };
      errorsMessages.push(error);
    }
    if (!request.body.age) {
      const error = { age: 'Kindly Provide your age' };
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
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(req.body.age)) {
      return res.status(406).json({
        status: 406,
        error: 'must be a numeber',
      });
    }

    if (spaces(req.body)) {
      return res.status(400).send({
        status: 400,
        error: 'Fields should contain actual characters and not only spaces',
      });
    }

    if (req.body.age.trim() < 30) {
      return res.status(406).json({
        status: 406,
        error: 'Too young to run',
      });
    }

    return next();
  },

  isValidType(req, res, next) {
    const obj = req.body.type.trim();
    if (obj === 'federal' || obj === 'legislative' || obj === 'state' || obj === 'local-government') {
      return next();
    }
    return res.status(406).send({
      status: 406,
      error: 'office type is limited to federal, legislative, state, local government',
    });
  },

  isNotValid(req, res, next) {
    // eslint-disable-next-line radix
    const office = Office.findById(parseInt(req.params.id));
    if (!validId(req.params.id)) {
      return res.status(406).json({
        status: 406,
        error: 'The id parameter must be a number',
      });
    }
    if (!office) {
      return res.status(404).send({
        status: 404,
        error: 'office not found, enter a valid id',
      });
    }
    return next();
  },
};

export default ValidateOffice;
