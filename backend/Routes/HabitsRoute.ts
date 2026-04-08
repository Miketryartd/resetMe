import express from 'express';
import { createHabit, userHabits, updateHabitProgress, updateNotes } from '../Controllers/HabitController.js';
import { verifyToken } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/stat/habits', verifyToken, createHabit);
router.get('/stat/me/habits', verifyToken, userHabits);
router.patch('/stat/habits/progress/:id', verifyToken, updateHabitProgress);
router.patch('/stat/habits/notes/:id', verifyToken, updateNotes);

export default router;