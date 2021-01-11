import express from 'express';

const app = express();

app.listen(5000, () => console.log('Server running'));

app.get('/', (req, res) => {
    res.send('Hello');
});
