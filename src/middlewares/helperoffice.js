// const validAge = id => Number.isInteger(parseInt(id, 10));
const ValidateOffice = {
  spaces(obj) {
    const strType = obj.type.split(' ').join('');
    const strOfficeName = obj.officeName.split(' ').join('');
    if (strType.length < 1) {
      return true;
    }
    if (strOfficeName.length < 1) {
      return true;
    }
    return false;
  },

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

  isValidType(req, res, next) {
    const obj = req.body.type.trim();
    if (obj === 'federal' || obj === 'legislative' || obj === 'state' || obj === 'local government') {
      return next();
    }
    return res.status(406).send({
      status: 406,
      error: 'office type is limited to federal, legislative, state, local government',
    });
  },
};

export default ValidateOffice;
