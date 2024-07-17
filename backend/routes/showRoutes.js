import express from 'express';
import { getShows, getShowsByMovie, getShowsByTheater, getShowById, createShow, updateShow, deleteShow } from '../controllers/showController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(getShows).post(protect, admin, createShow);
router.route('/movie/:movieId').get(getShowsByMovie);
router.route('/theater/:theaterId').get(getShowsByTheater);
router.route('/:id').get(getShowById).put(protect, admin, updateShow).delete(protect, admin, deleteShow);

export default router;
