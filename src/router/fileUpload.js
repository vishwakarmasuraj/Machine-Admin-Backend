const { successHandler} = require('./../helper/responseHandler');
const {allConstants} = require('./../constant');
const express = require('express');
const router = express.Router();
const uploadFile = require("./../helper/fileUpload");

router.post('/file-upload', uploadFile.array("file", 5), (req, res) => {
    successHandler(res, 201, allConstants.FILE_UPLOAD_SUCCESS_MSG)
    console.log('code is here------')
});

module.exports = router