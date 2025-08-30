import express from 'express';

import {
    getTenantProfileController,
    loginTenantController,
    registerTenantController
} from '../controllers/tenant.controller.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.middleware.js';

const router = express.Router();

router.post('/register', registerTenantController);

router.post('/login', loginTenantController);

router.get('/profile', isLoggedIn, getTenantProfileController);

export default router;