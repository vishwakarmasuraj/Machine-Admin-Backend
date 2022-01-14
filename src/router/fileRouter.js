import express from 'express';
const router = express.Router();
import {fileValidRule, valid} from '../validation';
import { auth } from '../middleware';
import {fileController} from '../controller'

/**
 * 
 */
router.get('/file-list', auth.verifyToken, fileController.fileListing);

module.exports = router