import express from 'express';
import Validate from '../middlewares/helper';
import controllerParty from '../controllers/party';
import controllerOffice from '../controllers/office';
import ValidateOffice from '../middlewares/helperoffice';

const router = express.Router();


router.post('/api/v1/parties', Validate.validateParty, Validate.validUrl, Validate.postParty, controllerParty.createParty);

router.get('/api/v1/parties/:id', Validate.isNotValid, controllerParty.getOneParty);

router.get('/api/v1/parties', controllerParty.getAllParties);

router.patch('/api/v1/parties/:id/name', Validate.isNotValid, controllerParty.updatedName);

router.delete('/api/v1/parties/:id', Validate.isNotValid, controllerParty.deleteOneParty);

router.post('/api/v1/offices', ValidateOffice.postOffice, ValidateOffice.isValidType, controllerOffice.createOffice);

router.all('*', (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Wrong endpoint. Such endpoint does not exist',
  });
});

export default router;