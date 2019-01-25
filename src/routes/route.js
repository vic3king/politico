import express from 'express';
import Validate from '../middlewares/helper';
import Controller from '../controllers/party';

const router = express.Router();

// Handle POST requests
router.post('/api/v1/parties', Validate.validateParty, Validate.postParty, Controller.createParty);

router.all('*', (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Wrong endpoint. Such endpoint does not exist',
  });
});

export default router;
