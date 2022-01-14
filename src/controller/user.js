import {userModel, fileModel, filePermissionModel} from '../models';
import { successHandler, errorHandler } from '../helper/responseHandler';
import {allConstants} from '../constant';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const addUser = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, allConstants.ROUND);
        const user = await new userModel(req.body);
        await user.save();
        successHandler(res, 201, allConstants.SIGNUP_SUCCESS_MSG);
    } catch (error) {
        return errorHandler(res, 500, allConstants.ERR_MSG);
    };
};

export const generateToken = (user) => {
  return jwt.sign({ data: user }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const userLogin = async (req, res) => {
  try {
    const data = await userModel.findOne({email: req.body.email});
    if (!data){
      return errorHandler(res, 404, allConstants.EMAIL_NOT_FOUND);
    }
    await bcrypt.compare(req.body.password, data.password, (err, match) => {
      if (err){
        return errorHandler(res, 404, allConstants.ERROR_MSG, err);
      }else if (match) {
        successHandler(res, 200, allConstants.LOGIN_SUCCESS_MSG, {
          token: generateToken(data),
          data
        })
      }else {
        return errorHandler(res, 400, allConstants.PASSWORD_NOT_MATCH)
      }
    });
  } catch (error) {
    return errorHandler(res, 500, allConstants.ERR_MSG)
  };
}; 

export const userListing = async (req, res) => {
    try {
        const result = await userModel.find({}).select('-password');
        successHandler(res, 200, allConstants.FOUND_USER_LIST, result );
    } catch (error) {
        errorHandler(res, 500, allConstants.ERR_MSG);
    };
};

export const userTruncate = async (req, res) => {
  try {
    await userModel.remove({});
    return successHandler(res, 200, allConstants.RECORD_TRUNCATED);
  } catch (error) {
    console.log(error);
    return errorHandler(res, 500, allConstants.ERR_MSG);
  };
};

export const fileGet = async(req, res) => {
  try {
    const {_id} = req.userData
    const result = await userModel.find({_id: {$ne: _id}}).select('-password')
    return successHandler(res, 200, allConstants.GET_FILE_MSG, result)
  } catch (error) {
    console.log(error)
    errorHandler(res, 500, allConstants.ERR_MSG)
  };
};

export const givePermission = async (req, res) => {
  try {
    const {_id} = req.userData;
    await filePermissionModel.findOneAndUpdate({userId: _id}, {userId: _id, allowedUser: req.body.userIds}, {new: true, upsert: true });
    return successHandler(res, 200, allConstants.PERMISSION_CHNG_SUCCESS)
  } catch (error) {
    console.log(error);
    return errorHandler(res, 500, allConstants.ERR_MSG);
  }
};

