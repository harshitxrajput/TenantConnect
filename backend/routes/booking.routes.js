import express from 'express';

import { isLoggedIn } from '../middlewares/isLoggedIn.middleware.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.middleware.js';

import {
    cancelTenantBookingController,
    createBookingRequestController,
    getTenantRequestsController
} from '../controllers/booking.controller.js';

const router = express.Router();

router.post('/tenant/request/:propertyId', isLoggedIn, authorizeRoles(["tenant"]), createBookingRequestController);

router.get('/tenant/requests', isLoggedIn, authorizeRoles(["tenant"]), getTenantRequestsController);

router.put('/tenant/request/:bookingId/cancel', isLoggedIn, authorizeRoles(["tenant"]), cancelTenantBookingController);

export default router;