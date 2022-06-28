import express from 'express';
import { verifyWebhook } from '../handlers/flutterwave';

const router = express.Router();

router.post('/', verifyWebhook);

export default router;
