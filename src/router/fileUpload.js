const { successHandler} = require('./../helper/responseHandler');
const {allConstants} = require('./../constant');
const express = require('express');
const router = express.Router();
const uploadFile = require("./../helper/fileUpload");
const fs = require('fs')
import {fileValidRule, filePermissionRule} from '../validation';
import {auth} from '../helper'
import {userController} from '../controller';

/**
 * 
 */
router.post('/file-upload', uploadFile.array("file", 5), (req, res) => {
    successHandler(res, 201, allConstants.FILE_UPLOAD_SUCCESS_MSG)
});

/**
 * 
 */
router.get('/download/fileName', auth.verifyToken, userController.knowPermission, (req, res) =>{
    res.download(`${'./uploads/fileName'}`, (error)=>{
        return res.status(403).json({message: 'You do not have access to use this file!!'});
    });
});

module.exports = router