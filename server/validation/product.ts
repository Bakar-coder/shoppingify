import Joi from "joi";
import { AddProductInputType, updateProductInputType } from "types/product";

export const validateProduct = (opts: AddProductInputType) => {
  const {
    title,
    category,
    stock,
    price,
    discount,
    discountExpiration,
    description,
    images,
    tags,
    published,
    featured,
  } = opts;
  return Joi.object({
    title: Joi.string().required(),
    stock: Joi.number().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    discount: Joi.string(),
    discountExpiration: Joi.string(),
    description: Joi.string().required(),
    images: Joi.array().required(),
    tags: Joi.any(),
    featured: Joi.boolean(),
    published: Joi.boolean(),
  }).validate({
    title,
    stock,
    price,
    discount,
    discountExpiration,
    description,
    images,
    category,
    tags,
    published,
    featured,
  });
};

export const updateProductValidation = (opts: updateProductInputType) => {
  const {
    title,
    category,
    stock,
    price,
    discount,
    discountExpiration,
    description,
    images,
    tags,
    published,
    featured,
  } = opts;
  return Joi.object({
    title: Joi.string().required(),
    stock: Joi.number().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    discount: Joi.string(),
    discountExpiration: Joi.string(),
    description: Joi.string().required(),
    images: Joi.array(),
    tags: Joi.any(),
    featured: Joi.boolean(),
    published: Joi.boolean(),
  }).validate({
    title,
    stock,
    price,
    discount,
    discountExpiration,
    description,
    images,
    category,
    tags,
    published,
    featured,
  });
};
