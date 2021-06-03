import { ObjectType, Field, InputType } from "type-graphql";
import { CartItemType as CartItem } from "./cart";
import { ErrorField } from "./error";
import { User } from "../entities/User";

@InputType()
export class UserRegisterInputType {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  password2: string;

  @Field(() => Boolean, { nullable: true })
  seller: boolean;

  @Field(() => Boolean, { nullable: true })
  admin: boolean;
}

@ObjectType()
export class UserType {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [CartItem], { nullable: true })
  cart?: CartItem[];

  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];
}
