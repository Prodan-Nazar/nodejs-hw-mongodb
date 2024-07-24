import Joi from 'joi';
import { contactType } from '../constants/contacts-constants.js';


export const contactAddSchema = Joi.object({
    name: Joi.string().required().min(3).max(20).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {3} characters',
    'string.max': 'Username should have at most {20} characters',
    'any.required': 'Username is required',
  }),
    phoneNumber: Joi.string().required().min(3).max(20),
    email: Joi.string().email().min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...contactType)
});

export const contactPatchSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {3} characters',
    'string.max': 'Username should have at most {20} characters',
  }),
    phoneNumber: Joi.string().min(3).max(20),
    email: Joi.string().email().min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...contactType)
});
