const { successHandler,  errorHandler} = require('./../helper/responseHandler');
const {allConstants} = require('./../constant');
const express = require('express');
const router = express.Router();
const uploadFile = require("./../helper/fileUpload");
const fs = require('fs')
import {fileValidRule, filePermissionRule} from '../validation';
import {auth} from '../helper'
import {userController} from '../controller';
import { fileModel } from '../models';

import canAccessFile from "./../middleware/checkPermission";

/**
 * 
 */
router.post('/file-upload',auth.verifyToken, uploadFile.single("file"), async (req, res) => {

    try {
        const fileName = req.file.filename;
        await fileModel.create({name: fileName, userId: req.userData._id});
        successHandler(res, 201, allConstants.FILE_UPLOAD_SUCCESS_MSG)
        
    } catch (error) {
        console.log("error", error)
        return errorHandler(res, 500, allConstants.ERR_MSG);
    }
});

/**
 * 
 */
router.get('/download/:fileName', auth.verifyToken, canAccessFile,  (req, res) =>{
    res.download(`./uploads/${req.params.fileName}`);
});

module.exports = router