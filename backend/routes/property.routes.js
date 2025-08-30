import express from 'express';

const router = express.Router();

router.get('/', getAvailablePropertiesController);

export default router;