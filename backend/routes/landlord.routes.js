import express from 'express';

//Controllers
import { registerLandlordController } from '../controllers/landlord.controller.js';

const router = express.Router();

router.post('/register', registerLandlordController);

export default router;