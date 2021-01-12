import express from 'express';
import { router } from './routes';

const app = express();

app.listen(5000, () => console.log('Server running'));


app.use('/', router);


app.get('/hi', (req, res) => {
    res.send('Hello');
});

