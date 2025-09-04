import express from 'express';

import { isLoggedIn } from '../middlewares/isLoggedIn.middleware.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.middleware.js';

import {
    changeTenantPasswordController,
    getTenantProfileController,
    loginTenantController,
    registerTenantController,
    updateTenantProfileController
} from '../controllers/tenant.controller.js';

const router = express.Router();

router.post('/register', registerTenantController);

router.post('/login', loginTenantController);

router.get('/profile', isLoggedIn, authorizeRoles(["tenant"]), getTenantProfileController);

router.put('/profile', isLoggedIn, authorizeRoles(["tenant"]), updateTenantProfileController);

router.put('/change-password', isLoggedIn, authorizeRoles(["tenant"]), changeTenantPasswordController);

export default router;