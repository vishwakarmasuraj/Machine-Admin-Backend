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
    const data = await userModel.findOne({ email: req.body.email });
    if (!data) {
      return errorHandler(res, 404, allConstants.EMAIL_NOT_FOUND);
    } else {
      await bcrypt.compare(req.body.password, data.password, (error, match) => {
        if (error) {
          return errorHandler(res, 404, allConstants.ERROR_MSG, error);
        } else if (match) {
          successHandler(res, 200, allConstants.SUCCESS_LOGIN, {
            token: generateToken(data),
            data,
          });
        } else {
          return errorHandler(res, 400, allConstants.PASSWORD_NOT_MATCH);
        }
      });
    }
  } catch (error) {
    return errorHandler(res, 500, allConstants.ERR_MSG);
  }
};

export const userListing = async (req, res) => {
    try {
        const result = await userModel.find({}).select('-password');
        successHandler(res, 200, allConstants.FOUND_USER_LIST, result )
    } catch (error) {
        errorHandler(res, 500, allConstants.ERR_MSG)
    };
};

export const fileGet = async(req, res) => {
  try {
    console.log(req.userData)
    const {_id} = req.userData
    const result = await userModel.find({_id: {$ne: _id}}).select('-password')
    res.status(200).json({message: 'Found record', result})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Something went wrong'});
  };
};

export const givePermission = async (req, res) => {
  try {
    const {_id} = req.userData;
    await filePermissionModel.findOneAndUpdate({userId: _id}, {userId: _id, allowedUser: req.body.userIds}, {new: true, upsert: true });
    res.status(200).json({message: 'Permission changed successfully!'})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Something went wrong'});
  }
};

