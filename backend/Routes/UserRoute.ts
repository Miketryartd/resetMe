import express from 'express';
import { createUser, loginUser, loggedUser } from '../Controllers/UserController.js';
import { verifyToken } from '../Middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/create', createUser);
router.post('/sign-in', loginUser);
router.get('/user/me', verifyToken, loggedUser);

export default router;