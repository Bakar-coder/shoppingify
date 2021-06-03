import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';
import { UserRegisterInputType } from '../types/user';

const complexityOptions = {
  min: 8,
  max: 24,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  requirementCount: 5,
};

export const validatePassword = (pass: string) =>
  passwordComplexity(complexityOptions, 'Password').validate(pass);
export const validateRegister = (opts: UserRegisterInputType) => {
  return Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required().min(3),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required().min(8).max(25),
    password2: Joi.string().required().min(8).max(25),
    seller: Joi.boolean(),
    admin: Joi.boolean(),
  }).validate(opts);
};
