import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import catchAsync from '../common/error-handler/CatchAsyncError';

const validateParent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Trim and sanitize email if it exists
    if (req.body.personal?.email) {
        req.body.personal.email = req.body.personal.email.trim().toLowerCase();
    }

    // Schema Definitions
    const PersonalSchema = Joi.object({
        first_name: Joi.string().min(2).trim().required(),
        last_name: Joi.string().min(2).trim().required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        phone_number: Joi.string().pattern(/^\+?\d+$/).required(),
        gender: Joi.string().valid('male', 'female').required(),
        role: Joi.string().required(),
        role_type: Joi.string().required(),
        user_type: Joi.string().valid('member', 'visitor').required(),
        image: Joi.string().uri().required(),
        address: Joi.string().required(),
        country: Joi.string().required(),
        state: Joi.string().required(),
        lga: Joi.string().required(),
        location: Joi.string().required(),
        branch: Joi.string().required(),
        identification_type: Joi.string().required(),
        identification_photo: Joi.string().uri().required(),
        identification_number: Joi.string().pattern(/^\d+$/).required(),
    });

    const ChildrenSchema = Joi.array().items(
        Joi.object({
            first_name: Joi.string().min(2).trim().required(),
            last_name: Joi.string().min(2).trim().required(),
            gender: Joi.string().valid('male', 'female').required(),
            dob: Joi.string()
                .isoDate()
                .required()
                .messages({
                    'string.isoDate': 'Child date of birth is not in the iso format',
                }),
            age_division: Joi.string().required(),
            image: Joi.string().uri().required(),
            child_relationship: Joi.string().required(),
            relationship_type: Joi.string().required(),
            special_needs: Joi.string().allow('', 'none').required(),
        })
    );

    const CaregiversSchema = Joi.array().items(
        Joi.object({
            first_name: Joi.string().min(2).trim().required(),
            last_name: Joi.string().min(2).trim().required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            phone_number: Joi.string().pattern(/^\+?\d+$/).required(),
            gender: Joi.string().valid('male', 'female').required(),
            role: Joi.string().required(),
            role_type: Joi.string().required(),
            user_type: Joi.string().valid('member', 'visitor').required(),
            image: Joi.string().uri().required(),
            child_relationship: Joi.string().required(),
            parent_relationship: Joi.string().required(),
            child_relationship_type: Joi.string().required(),
            parent_relationship_type: Joi.string().required(),
        })
    );

    const Schema = Joi.object({
        personal: PersonalSchema.required(),
        children: ChildrenSchema.optional(),
        caregivers: CaregiversSchema.optional(),
    });

    // Validate the request body
    await Schema.validateAsync(req.body);

    next();
});

export default validateParent;
