import express from 'express';
import { getTheaters, createTheater } from '../controllers/theaterController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.route('/').get(getTheaters);

// Protected route to create a theater (Admin only)
router.route('/').post(protect, admin, createTheater);

export default router;
