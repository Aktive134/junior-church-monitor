import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fileLogger from '../common/logging/error-logger';
import Configuration from '../config';


const {
  JWT: { secret, subject, issuer, expires },
} = Configuration;

const generateToken = (data: Record<string, any>) => {
  try {
    const { _id, email, isAdmin, is_verified } = data;
    const token = jwt.sign({ _id, email, isAdmin, is_verified }, secret, {
      issuer: issuer,
      expiresIn: expires,
      algorithm: 'HS512',
      subject: subject,
    });
    return token;
  } catch (error: any) {
    fileLogger.log({
      message: error.message,
      level: 'error',
    });
  }
};

export default generateToken;
