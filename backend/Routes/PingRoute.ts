import express from 'express';
import {pingBackend} from "../Controllers/HealthController.js";
const router = express.Router();


//cron job//
router.get('/status/check', pingBackend)

export default router;