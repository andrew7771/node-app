import { Router } from 'express';
import { createTable } from './models/guests';

export const router = Router();

router.get('/', createTable);