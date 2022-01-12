const express = require('express');
const router = express.Router();

router.use('/auth', require('./userRouter'));
router.use('/upload', require('./fileUpload'));

module.exports = router