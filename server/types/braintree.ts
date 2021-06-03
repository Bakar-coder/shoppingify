import { ValidationErrorsCollection, Transaction } from 'braintree';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class BraintreeTokenResponseType {
  @Field()
  success: boolean;

  @Field()
  clientToken: string;
}

@ObjectType()
export class BraintreeTransactionResponseType {
  @Field(() => String)
  errors: ValidationErrorsCollection;

  @Field()
  success: boolean;

  @Field(() => String)
  transaction: Transaction;
}
