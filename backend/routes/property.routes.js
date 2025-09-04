import express from 'express';

import {
    createLandlordPropertyController,
    deleteLandlordPropertyController,
    getAvailablePropertiesController,
    getLandlordPropertiesController,
    getLandlordPropertyByIdController,
    getPropertyByIdController,
    updateLandlordPropertyController
} from '../controllers/property.controller.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.middleware.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.middleware.js';

const router = express.Router();

//Public Routes
router.get('/', getAvailablePropertiesController);
router.get('/:id', getPropertyByIdController);

//Landlord Specific Routes
router.post('/create', isLoggedIn, authorizeRoles(["landlord"]), createLandlordPropertyController);
router.get('/landlord', isLoggedIn, authorizeRoles(["landlord"]), getLandlordPropertiesController);
router.get('/landlord/:id', isLoggedIn, authorizeRoles(["landlord"]), getLandlordPropertyByIdController);
router.put('/:id', isLoggedIn, authorizeRoles(["landlord"]), updateLandlordPropertyController);
router.delete('/:id', isLoggedIn, authorizeRoles(["landlord"]), deleteLandlordPropertyController);

//Tenant Specific Routes


export default router;