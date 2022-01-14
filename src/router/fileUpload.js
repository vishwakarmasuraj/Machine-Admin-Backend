import express from 'express';
const router = express.Router();
import uploadFile from "./../helper/fileUpload";
import {auth} from '../middleware'
import { userController } from '../controller';
import canAccessFile from "./../middleware/checkPermission";

/**
 * 
 */
router.post('/file-upload', auth.verifyToken, uploadFile.single('file'), userController.fileUpload)

/**
 * 
 */
router.get('/download/:fileName', auth.verifyToken, canAccessFile,  (req, res) =>{
    res.download(`./uploads/${req.params.fileName}`);
});

module.exports = router