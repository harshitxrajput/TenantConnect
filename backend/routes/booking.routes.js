import express from 'express';

import { isLoggedIn } from '../middlewares/isLoggedIn.middleware';
import { authorizeRoles } from '../middlewares/authorizeRoles.middleware';

import {
    cancelTenantBookingController,
    createBookingRequestController,
    getTenantRequestsController
} from '../controllers/booking.controller';

const router = express.Router();

router.post('/tenant/request/:propertyId', isLoggedIn, authorizeRoles(["tenant"]), createBookingRequestController);

router.get('/tenant/requests', isLoggedIn, authorizeRoles(["tenant"]), getTenantRequestsController);

router.put('/tenant/request/:bookingId/cancel', isLoggedIn, authorizeRoles(["tenant"]), cancelTenantBookingController);

export default router;