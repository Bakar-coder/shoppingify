import { resolve } from "path";
import { Product } from "../../entities/Product";
import { deleteFile } from "../../utils/deleteFile";
import { getConnection } from "typeorm";
import { Arg, Ctx, Mutation, Resolver, Int, UseMiddleware } from "type-graphql";
import { appContext } from "../../context";
import {
  AddProductInputType,
  ProductsResponseType,
  updateProductInputType,
} from "../../types/product";
import { uploadedFiles } from "../../utils/getUploadedFiles";
import { isMerchant } from "../../middleware/auth";
import {
  updateProductValidation,
  validateProduct,
} from "../../validation/product";

@Resolver()
export class AdminProductResolver {
  @Mutation(() => ProductsResponseType)
  @UseMiddleware(isMerchant)
  async addProduct(
    @Arg("opts") opts: AddProductInputType,
    @Ctx() { req }: appContext
  ): Promise<ProductsResponseType> {
    let {
      title,
      stock,
      category,
      price,
      description,
      images,
      tags,
      discount,
      discountExpiration,
      featured,
      published,
    } = opts;
    const { error } = validateProduct(opts);

    const errorField = error?.details[0].message
      .split(" ")[0]
      .split("")
      .slice(1, -1)
      .join("");
    if (error)
      return { errors: [{ field: errorField, msg: error.details[0].message }] };

    const file = await uploadedFiles(images);
    await Product.create({
      title: title.toLowerCase(),
      stock,
      category,
      price,
      description,
      tags,
      discount: discount ? discount : undefined,
      discountExpiration,
      featured,
      published,
      images: `${file}`,
      userId: req.session.userId,
    }).save();
    const products = await Product.find({ relations: ["user"] });
    return { products };
  }

  @Mutation(() => ProductsResponseType)
  @UseMiddleware(isMerchant)
  async updateProduct(
    @Arg("opts") opts: updateProductInputType,
    @Ctx() { res }: appContext
  ): Promise<ProductsResponseType> {
    let {
      id,
      title,
      stock,
      category,
      price,
      description,
      images,
      tags,
      discount,
      discountExpiration,
      featured,
      published,
    } = opts;

    const { error } = updateProductValidation(opts);

    const errorField = error?.details[0].message
      .split(" ")[0]
      .split("")
      .slice(1, -1)
      .join("");
    if (error)
      return { errors: [{ field: errorField, msg: error.details[0].message }] };

    const product = await Product.findOne(id);
    if (!product)
      return {
        errors: [
          {
            msg: `failed to find product with id ${id}`,
          },
        ],
      };
    if (res.locals.user.seller && product.user.id !== res.locals.user.id)
      return {
        errors: [
          {
            msg:
              "Unauthorized, trying to update a product which doesn't belong to you.",
          },
        ],
      };

    if (images) {
      deleteFile(resolve(product.images));
      const imgs = await uploadedFiles(images);
      product.images = `${imgs}`;
    }

    product.title = title;
    product.category = category;
    product.stock = stock;
    product.price = price;
    product.description = description;
    if (tags) product.tags = tags;
    if (!discount || discount === "") {
      product.discount = undefined;
      product.discountExpiration = undefined;
    } else {
      product.discount = parseFloat(discount);
      product.discountExpiration = discountExpiration
        ? new Date(discountExpiration)
        : undefined;
    }
    product.featured = featured;
    product.published = published;
    await product.save();
    const products = await Product.find({ relations: ["user"] });
    return {
      products,
    };
  }

  @Mutation(() => ProductsResponseType)
  @UseMiddleware(isMerchant)
  async deleteProduct(
    @Arg("id", () => Int) id: number,
    @Ctx() { res }: appContext
  ): Promise<ProductsResponseType> {
    const product = await getConnection().manager.findOne(Product, id, {
      relations: ["user"],
    });
    if (product?.user.id !== res.locals.user.id)
      return { errors: [{ msg: "unauthorized action." }] };
    deleteFile(resolve(product!.images));
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where("id = :id", { id })
      .execute();
    const products = await getConnection().manager.find(Product, {
      relations: ["user"],
    });
    return { products };
  }
}
