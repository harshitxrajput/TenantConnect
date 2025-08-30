import express from 'express';

//Controllers
import {
    getLandlordProfileController,
    loginLandlordController,
    registerLandlordController
} from '../controllers/landlord.controller.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.middleware.js';

const router = express.Router();

router.post('/register', registerLandlordController);

router.post('/login', loginLandlordController);

router.get('/profile', isLoggedIn, getLandlordProfileController);

export default router;