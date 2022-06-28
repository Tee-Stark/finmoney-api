// import app from '../app';
import express from 'express';
import { CreateUser, LoginUser } from '../controllers/user';

const router = express.Router();

router.post('/', CreateUser);
router.post('/login', LoginUser);

export default router;
