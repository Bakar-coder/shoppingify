import { FileUpload } from "context";
import { GraphQLUpload } from "graphql-upload";
import { Field, InputType, ObjectType, Int } from "type-graphql";
import { User } from "./../entities/User";
import { ErrorField } from "./error";

@InputType()
export class AddProductInputType {
  @Field()
  title: string;

  @Field(() => Int)
  stock: number;

  @Field()
  price: number;

  @Field()
  category: string;

  @Field(() => String, { nullable: true })
  discount?: number;

  @Field(() => String, { nullable: true })
  discountExpiration?: Date;

  @Field()
  description: string;

  @Field(() => String, { nullable: true })
  tags?: string;

  @Field(() => [GraphQLUpload])
  images: FileUpload[];

  @Field(() => Boolean, { nullable: true })
  featured: boolean;

  @Field(() => Boolean, { nullable: true })
  published: boolean;
}

@InputType()
export class updateProductInputType {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  stock: number;

  @Field()
  price: number;

  @Field()
  category: string;

  @Field(() => String, { nullable: true })
  discount?: string;

  @Field(() => String, { nullable: true })
  discountExpiration?: string;

  @Field()
  description: string;

  @Field(() => String, { nullable: true })
  tags?: string;

  @Field(() => [GraphQLUpload], { nullable: true })
  images: FileUpload[];

  @Field(() => Boolean, { nullable: true })
  featured: boolean;

  @Field(() => Boolean, { nullable: true })
  published: boolean;
}

@ObjectType()
export class ProductType {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  stock: number;

  @Field()
  price: number;

  @Field()
  category: string;

  @Field(() => String, { nullable: true })
  discount?: number;

  @Field(() => String, { nullable: true })
  discountExpiration?: Date;

  @Field()
  description: string;

  @Field(() => String, { nullable: true })
  tags?: string;

  @Field()
  images: string;

  @Field(() => User)
  user?: User;

  @Field(() => Boolean, { nullable: true })
  featured: boolean;

  @Field(() => Boolean, { nullable: true })
  published: boolean;
}

@ObjectType()
export class ProductsResponseType {
  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];

  @Field(() => [ProductType], { nullable: true })
  products?: ProductType[];
}

@ObjectType()
export class ProductResponseType {
  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];

  @Field(() => ProductType, { nullable: true })
  product?: ProductType;
}
