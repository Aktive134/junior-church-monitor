import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import catchAsync from '../common/error-handler/CatchAsyncError';

const validateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Trim and sanitize email if it exists
    if (req.body.email) {
        req.body.email = req.body.email.trim().toLowerCase();
    }

    const Schema = Joi.object({
        first_name: Joi.string().min(2).trim().required(),
        last_name: Joi.string().min(2).trim().required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        phone_number: Joi.string().pattern(/^\+?\d+$/).required(),
        gender: Joi.string().valid('male', 'female').required(),
        role: Joi.string().required(),
        role_type: Joi.string().required(),
    });

    // Validate the request body
    await Schema.validateAsync(req.body);

    next();
});

export default validateUser;
