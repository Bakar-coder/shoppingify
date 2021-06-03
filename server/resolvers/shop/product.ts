import { Arg, Int, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Product } from "../../entities/Product";
import { ProductResponseType, ProductsResponseType } from "../../types/product";

@Resolver()
export class ProductResolver {
  @Query(() => ProductResponseType)
  async product(
    @Arg("id", () => Int) id: number
  ): Promise<ProductResponseType> {
    if (!id) return { errors: [{ msg: `failed to product with id ${id}` }] };
    const product = await getConnection().manager.findOne(Product, id, {
      relations: ["user"],
    });
    return { product };
  }

  @Query(() => ProductsResponseType)
  async paginatedProducts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => Int, { nullable: true }) cursor: number
  ): Promise<ProductsResponseType> {
    const realLimit = Math.min(50, limit);
    const realLimitPlus = realLimit + 1;
    const qb = getConnection()
      .getRepository(Product)
      .createQueryBuilder("p")
      .leftJoinAndSelect("p.user", "user")
      .orderBy("p.id", "DESC")
      .take(realLimitPlus);
    cursor && qb.where("p.id > :cursor", { cursor: cursor });
    const products = await qb.getMany();
    return {
      products,
    };
  }

  @Query(() => ProductsResponseType)
  async allProducts(): Promise<ProductsResponseType> {
    const products = await getConnection()
      .getRepository(Product)
      .createQueryBuilder("p")
      .leftJoinAndSelect("p.user", "user")
      .orderBy("p.id", "DESC")
      .getMany();
    return { products };
  }
}
