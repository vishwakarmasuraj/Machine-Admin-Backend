const { successHandler} = require('./../helper/responseHandler');
const {allConstants} = require('./../constant');
const express = require('express');
const router = express.Router();
const uploadFile = require("./../helper/fileUpload");
const fs = require('fs')

/**
 * 
 */
router.post('/file-upload', uploadFile.array("file", 5), (req, res) => {
    successHandler(res, 201, allConstants.FILE_UPLOAD_SUCCESS_MSG)
});

/**
 * 
 */
router.get('/download', (req, res) =>{
    res.download('./uploads/1642060000990_notebook-natural-laptop-macbook_jpg.jpg', (error)=>{
        return res.status(403).json({message: 'You do not have access to use this file!!'});
    });
});

module.exports = router