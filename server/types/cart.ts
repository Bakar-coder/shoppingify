import { BaseEntity } from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
export class CartItemType extends BaseEntity {
  @Field(() => Int)
  productId: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  discount?: number;

  @Field()
  price: number;

  @Field()
  images: string;

  @Field(() => Int)
  quantity: number;
}

@ObjectType()
export class OrderItemType extends BaseEntity {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  price: number;

  @Field(() => Int)
  quantity: number;
}
