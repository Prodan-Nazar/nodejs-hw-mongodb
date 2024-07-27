import Joi from 'joi';
import { emailRegexp } from '../constants/user-constants.js';

export const userSignUp = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).required(),
});

export const userSignIn = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).required(),
});
