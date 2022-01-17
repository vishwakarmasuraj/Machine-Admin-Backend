import jwt from 'jsonwebtoken';

/**
 * 
 * @param {*} user 
 * @returns 
 */
export const generateToken = (payload) => {
  return jwt.sign({ data: payload }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};