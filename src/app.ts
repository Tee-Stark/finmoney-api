import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import flwRoute from './routes/flwWebhook';
import { API_PATH } from './config/constants';
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use(`${API_PATH}/user`, userRoutes);
app.use('/flw-webhook', flwRoute);
export default app;
