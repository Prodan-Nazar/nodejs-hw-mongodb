import Joi from "joi";
import { emailRegexp } from "../constants/users-constants.js";

export const sendResetEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
});

export const resetPasswordSchema = Joi.object({
    password: Joi.string().required(),
    token: Joi.string().required(),
});
