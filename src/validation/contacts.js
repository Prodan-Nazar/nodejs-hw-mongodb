import Joi from 'joi';
import { phoneNumberRegex, contactTypes } from '../constants/contact-constants.js'


export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name is required',
        'string.min': 'Name should have a minimum length of 3 digits',
        'string.max': 'Name should have a maximum length of 20 digits',
        'any.required': 'Name is required',
    }),
    phoneNumber: Joi.string().pattern(phoneNumberRegex).required().messages({
        'string.pattern.base': 'Phone number should contain +(country code) and at least 4 digits',
        'string.empty': 'Phone number is required',
        'any.required': 'Phone number is required',
    }),
    email: Joi.string().email().messages({
        'string.email': 'Email must be a valid email address',
    }),
    isFavourite: Joi.boolean().default(false),
    contactType: Joi.string().valid(...contactTypes).default('personal').messages({
        'any.only': `Contact type must be one of ${contactTypes.join(', ')}`,
    })
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name is required',
        'string.min': 'Name should have a minimum length of 3',
        'string.max': 'Name should have a maximum length of 20',
    }),
    phoneNumber: Joi.string().pattern(phoneNumberRegex).messages({
        'string.pattern.base': 'Phone number should contain +(country code) and 4 digits',
        'string.empty': 'Phone number is required',
    }),
    email: Joi.string().email().messages({
        'string.email': 'Email must be a valid email address',
    }),
    isFavourite: Joi.boolean().default(false),
    contactType: Joi.string().valid(...contactTypes).default('personal').messages({
        'any.only': `Contact type must be one of ${contactTypes.join(', ')}`,
    })
}).min(1);

