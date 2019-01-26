import express from 'express';
import Validate from '../middlewares/helper';
import Controller from '../controllers/party';

const router = express.Router();


router.post('/api/v1/parties', Validate.validateParty, Validate.validUrl, Validate.postParty, Controller.createParty);

router.get('/api/v1/parties/:id', Validate.isNotValid, Controller.getOneParty);

router.get('/api/v1/parties', Controller.getAllParties);

router.patch('/api/v1/parties/:id/name', Validate.isNotValid, Controller.updatedName);

router.delete('/api/v1/parties/:id', Validate.isNotValid, Controller.deleteOneParty);

router.all('*', (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Wrong endpoint. Such endpoint does not exist',
  });
});

export default router;
