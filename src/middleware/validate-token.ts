import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import Configuration from '../config';
import BadRequestError from '../common/error-handler/BadRequestError';
import NotAuthorizeError from '../common/error-handler/NotAuthorizedError';
import { redisClient } from '../redis.config';

const {
  JWT: { secret, subject, issuer },
} = Configuration;

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (authorization === undefined || authorization === '') {
      return next(new BadRequestError('Provide Authorization header'));
    }
    let bearer;
    let token = '';

    if (authorization !== undefined) {
      [bearer, token] = authorization.split(' ');
    }
    
    if (bearer !== 'Bearer') {
      res.set('WWW-Authenticate', 'Basic realm= Access Token , charset=UTF-8');
      return next(new NotAuthorizeError('Bad Request: Invalid Authorization'));
    }

     const blacklistedTokenKey = `token:blacklist:${token}`
        const isBlacklistedToken = await redisClient.get(blacklistedTokenKey) 
      
        if (isBlacklistedToken) {
            return next(new BadRequestError("Please, login again. Session Expired"))
      }

    const payload: jwt.JwtPayload = jwt.verify(token, secret, {
      issuer,
      subject,
    }) as jwt.JwtPayload;
  
    res.locals.payload = payload;
    res.locals.token = token;
    next();

  } catch (error: any) {
    return next(new BadRequestError("Invalid Authorization!"));
  }
};

export default validateToken;
