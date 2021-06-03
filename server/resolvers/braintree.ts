import { BraintreeGateway, Environment } from "braintree";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {
  BraintreeTokenResponseType,
  BraintreeTransactionResponseType,
} from "../types/braintree";

import { __prod__ } from "../_constants";
import {
  BRAINTREE_MERCHANT_ID,
  BRAINTREE_PUBLIC_KEY,
  BRAINTREE_PRIVATE_KEY,
} from "../_constants";

const paymentGateway = new BraintreeGateway({
  environment: __prod__ ? Environment.Production : Environment.Sandbox,
  merchantId: BRAINTREE_MERCHANT_ID,
  publicKey: BRAINTREE_PUBLIC_KEY,
  privateKey: BRAINTREE_PRIVATE_KEY,
});

@Resolver()
export class BraintreeResolver {
  @Query(() => BraintreeTokenResponseType)
  async getToken(): Promise<BraintreeTokenResponseType> {
    const { success, clientToken } = await paymentGateway.clientToken.generate(
      {}
    );
    return { success, clientToken };
  }

  @Mutation(() => BraintreeTransactionResponseType)
  async processPayment(
    @Arg("amount") amount: string,
    @Arg("paymentMethodNonce") paymentMethodNonce: string
  ): Promise<BraintreeTransactionResponseType> {
    const {
      errors,
      success,
      transaction,
    } = await paymentGateway.transaction.sale({
      amount,
      paymentMethodNonce,
      options: { submitForSettlement: true },
    });
    return { errors, success, transaction };
  }
}
