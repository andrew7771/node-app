import express from 'express';
import { router } from './routes';
import * as dotenv from 'dotenv';

const app = express();

dotenv.config();
app.listen(5000, () => console.log('Server running'));

app.use('/', router);