import express from 'express';
import { verifyToken } from '../Middleware/AuthMiddleware.js';
import { createReview, getReviews } from '../Controllers/ReviewController.js';

const router = express.Router();

router.post('/review', verifyToken, createReview);
router.get('/reviews', getReviews);

export default router;