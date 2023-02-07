import express from 'express';
const router =express.Router();
import helperUpload from '../helpers/upload.js';
import { uploadController } from '../controllers/upload.js'
router.post('', helperUpload.single('file') , uploadController);
export default router