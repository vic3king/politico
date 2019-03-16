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
import ControllerVote from '../controllers/votes';
import Vote from '../middlewares/helpervote';
import Results from '../middlewares/results';
import ControllerResult from '../controllers/results';
import ControllerPetition from '../controllers/petitions';
import Petition from '../middlewares/helperpetition';

const router = express.Router();
const admin = [
  Auth.verifyToken,
  Helper.isAdmin,
];
const user = [
  Auth.verifyToken,
];

router.post('/api/v1/parties', admin, Validate.isValidInputParty, Validate.validateParty, Validate.validUrl, Validate.postParty, controllerParty.createParty);

router.get('/api/v1/parties/:id', user, Validate.isNotValid, controllerParty.getOneParty);

router.get('/api/v1/parties', user, controllerParty.getAllParties);

router.patch('/api/v1/parties/:id/name', admin, Validate.updateEmptyName, Validate.isNotValid, Validate.validUrl, Validate.upadteNoName, Validate.partyExists, controllerParty.updatedName);

router.delete('/api/v1/parties/:id', admin, Validate.isNotValid, controllerParty.deleteOneParty);

router.post('/api/v1/offices', admin, ValidateOffice.isValidInputOffice, ValidateOffice.postOffice, ValidateOffice.postOfficeValidate, ValidateOffice.isValidType, controllerOffice.createOffice);

router.get('/api/v1/offices', user, controllerOffice.getAllOffices);

router.get('/api/v1/offices/:id', user, ValidateOffice.isNotValid, controllerOffice.getOneOffice);

router.post('/api/v1/auth/signup', Helper.isValidInputSignup, Helper.validValues, Helper.postUser, Helper.postUserValidate, Helper.isValidInput, Helper.isValidType, Helper.validValues, User.createUser);

router.post('/api/v1/auth/login', Helper.isValidInputLogin, Helper.postValidateLogin, User.login);

router.post('/api/v1/office/:id/register', user, Candidate.postCandidate, Candidate.isValidInt, ValidateOffice.isNotValid, Candidate.isValidCandidate, Candidate.isValidIDt, Candidate.isOffice, Candidate.isValidParty, Candidate.partyHasCandidate, ControllerCandidate.createCandidate);

router.post('/api/v1/votes', user, Vote.postCandidate, Vote.isValidInt, Vote.hasVoted, Vote.isValidCandidate, Vote.isOffice, ControllerVote.vote);

router.get('/api/v1/office/:id/result', user, ValidateOffice.isNotValid, Results.verifyOffice, ControllerResult.viewResult);

router.post('/api/v1/petitions', user, Petition.validPost, Petition.isValidInt, Petition.postCandidate, Petition.isOffice, Petition.hasPetitioned, ControllerPetition.petition);

router.get('/api/v1/candidates/:office', user, ControllerCandidate.getCandidatesByOffice);

router.get('/api/v1/candidates', admin, ControllerCandidate.getAllCandidates);

router.put('/api/v1/candidates/:id/status', admin, Candidate.statusReq, Candidate.isValidInputtype, ValidateOffice.isNotValid, ControllerCandidate.updateStatus);

router.all('*', (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'endpoint does not exist',
  });
});

export default router;
