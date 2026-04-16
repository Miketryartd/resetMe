import express from 'express';
import { verifyToken } from '../Middleware/AuthMiddleware.js';
import { createReview, getReviews, getAllReviews } from '../Controllers/ReviewController.js';

const router = express.Router();

router.post('/review', verifyToken, createReview);
router.get('/reviews', verifyToken, getReviews);
router.get('/allReviews', verifyToken, getAllReviews);

export default router;