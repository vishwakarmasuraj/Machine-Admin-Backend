const express = require('express');
const router = express.Router();

import {userValidRule, valid} from '../validation';
import { auth } from '../helper';
import {userController} from '../controller'

/**
 * 
 */
router.post('/signup', userValidRule.userValidRule(), valid.validate, userController.addUser);
/**
 * 
 */
router.post('/login', userController.userLogin)
/**
 * 
 */
router.get('/get-user', auth.verifyToken, userController.userListing)
/**
 * 
 */
router.get('/users', auth.verifyToken, userController.fileGet)
/**
 * 
 */
// router.get('/permission', auth.verifyToken, userController.knowPermission)

router.post("/allow-permission", auth.verifyToken, userController.givePermission)


module.exports = router