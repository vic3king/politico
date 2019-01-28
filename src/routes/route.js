import express from 'express';
import Validate from '../middlewares/helper';
import controllerParty from '../controllers/party';
import controllerOffice from '../controllers/office';
import ValidateOffice from '../middlewares/helperoffice';
import User from '../controllers/users';
import Helper from '../middlewares/helperuser';

const router = express.Router();


router.post('/api/v1/parties', Validate.validateParty, Validate.validUrl, Validate.postParty, controllerParty.createParty);

router.get('/api/v1/parties/:id', Validate.isNotValid, controllerParty.getOneParty);

router.get('/api/v1/parties', controllerParty.getAllParties);

router.patch('/api/v1/parties/:id/name', Validate.isNotValid, Validate.upadteNoName, Validate.updateEmptyName, controllerParty.updatedName);

router.delete('/api/v1/parties/:id', Validate.isNotValid, controllerParty.deleteOneParty);

router.post('/api/v1/offices', ValidateOffice.postOffice, ValidateOffice.postOfficeValidate, ValidateOffice.isValidType, controllerOffice.createOffice);

router.get('/api/v1/offices', controllerOffice.getAllOffices);

router.get('/api/v1/offices/:id', ValidateOffice.isNotValid, controllerOffice.getOneOffice);

router.post('/api/v1/auth/signup', Helper.postUser, Helper.postUserValidate, Helper.isValidInput, Helper.isValidType, Helper.validValues, User.createUser);

router.all('*', (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'endpoint does not exist',
  });
});

export default router;
