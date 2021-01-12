import { Router } from 'express';
import { TableInitializer } from './app/models/table-initializer';

export const router = Router();

const initializer = new TableInitializer();

router.get('/initialize', initializer.create);
router.get('/', (req, res) => {
    res.send('Server is up an running');
});


