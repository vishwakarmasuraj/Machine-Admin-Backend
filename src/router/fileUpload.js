const { successHandler} = require('./../helper/responseHandler');
const {allConstants} = require('./../constant');
const express = require('express');
const router = express.Router();
const uploadFile = require("./../helper/fileUpload");
const fs = require('fs')

router.post('/file-upload', uploadFile.array("file", 5), (req, res) => {
    successHandler(res, 201, allConstants.FILE_UPLOAD_SUCCESS_MSG)
});

router.post('/file-uploaded', uploadFile.array('file', 10), (req, res) => {
    let img = fs.readFile(req.file.path)
    let encode_image = img.toString('base64');
    const finalImg = {
      contentType: req.file.mimetype,
      image:  new Buffer(encode_image, 'base64')
   };
})

module.exports = router