import express from 'express';
import { getAi, getPromptHistory, deletePrompt } from '../Controllers/AIController.js';
import { verifyToken } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/ai/insight', verifyToken, getAi);
router.get('/ai/history', verifyToken, getPromptHistory);
router.delete('/ai/history/:promptId', verifyToken, deletePrompt);

export default router;