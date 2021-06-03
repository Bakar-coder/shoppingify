import { Field, ObjectType } from 'type-graphql';
@ObjectType()
export class ErrorField {
  @Field(() => String, { nullable: true })
  field?: string;

  @Field()
  msg: string;
}
