import express from 'express';
import { submitContactMessage } from '../controllers/contact.controller';

const router = express.Router();
router.post('/', submitContactMessage);

export default router;
