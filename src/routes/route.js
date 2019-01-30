import express from 'express';
import Validate from '../middlewares/helper';
import controllerParty from '../controllers/party';
import controllerOffice from '../controllers/office';
import ValidateOffice from '../middlewares/helperoffice';
import User from '../controllers/users';
import Helper from '../middlewares/helperuser';
import Auth from '../middlewares/auth';
import Candidate from '../middlewares/helpercandidates';
import ControllerCandidate from '../controllers/candidate';

const router = express.Router();
const admin = [
  Auth.verifyToken,
  Helper.isAdmin,
];
const user = [
  Auth.verifyToken,
];

router.post('/api/v1/parties', admin, Validate.validateParty, Validate.validUrl, Validate.postParty, controllerParty.createParty);

router.get('/api/v1/parties/:id', user, Validate.isNotValid, controllerParty.getOneParty);

router.get('/api/v1/parties', user, controllerParty.getAllParties);

router.patch('/api/v1/parties/:id/name', admin, Validate.isNotValid, Validate.upadteNoName, Validate.updateEmptyName, controllerParty.updatedName);

router.delete('/api/v1/parties/:id', admin, Validate.isNotValid, controllerParty.deleteOneParty);

router.post('/api/v1/offices', admin, ValidateOffice.postOffice, ValidateOffice.postOfficeValidate, ValidateOffice.isValidType, controllerOffice.createOffice);

router.get('/api/v1/offices', user, controllerOffice.getAllOffices);

router.get('/api/v1/offices/:id', user, ValidateOffice.isNotValid, controllerOffice.getOneOffice);

router.post('/api/v1/auth/signup', Helper.validValues, Helper.postUser, Helper.postUserValidate, Helper.isValidInput, Helper.isValidType, Helper.validValues, User.createUser);

router.post('/api/v1/auth/login', Helper.postValidateLogin, User.login);

router.post('/api/v1/office/:id/register', admin, Candidate.postCandidate, Candidate.isValidInt, ValidateOffice.isNotValid, Candidate.isValidCandidate, Candidate.isValidIDt, Candidate.isOffice, Candidate.isValidParty, ControllerCandidate.createCandidate);

router.all('*', (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'endpoint does not exist',
  });
});

export default router;
