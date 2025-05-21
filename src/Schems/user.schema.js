import Joi from "joi";

export const userregisterSchema = Joi.object({
    username: Joi.string().min(4).max(24).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
}).required().unknown(true);

export const usersiginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}).required();
export const userforgotPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
}).required();
export const userresetPasswordSchema = Joi.object({
    newPassword: Joi.string().min(6).required(),
}).required();