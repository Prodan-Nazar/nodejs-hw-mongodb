import Joi from 'joi';
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '../constants/index.js';

export const createContactsSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  phoneNumber: Joi.string()
    .min(2)
    .max(20)
    .pattern(PHONE_NUMBER_REGEX)
    .required(),
  email: Joi.string().min(2).max(20).pattern(EMAIL_REGEX),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('personal', 'work', 'home'),
  userId: Joi.string(),
});

export const updateContactsSchema = Joi.object({
  name: Joi.string().min(2).max(20),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/, 'numbers')
    .min(2)
    .max(20),
  email: Joi.string().email().min(2).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('personal', 'work', 'home'),
});
