import router from "next/router";
import { dedupExchange, Exchange } from "urql";
import { pipe, tap } from "wonka";
import { cacheExchange } from "@urql/exchange-graphcache";
import { multipartFetchExchange as fetchExchange } from "@urql/exchange-multipart-fetch";
import { betterUpdateQry } from "./updateQry";
import {
  AddProductMutation,
  AddToCartDocument,
  AddToCartMutation,
  DecrementCartItemMutation,
  DeleteProductMutation,
  GetCartDocument,
  GetCartQuery,
  LoginMutation,
  LogoutMutation,
  PaginatedProductsQuery,
  ProductsDocument,
  ProductsQuery,
  RegisterMutation,
  RemoveCartItemDocument,
  RemoveCartItemMutation,
  UpdateProductMutation,
  UserDocument,
  UserQuery,
} from "../generated/graphql";
import { API_URL } from "../../_constants";

const errorExchange: Exchange = ({ forward }) => (ops$) =>
  pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error) {
        error.message.includes("not authenticated") &&
          router.replace("/users/auth/login");
        error.message.includes("not authorized") && router.replace("/");
      }
    })
  );

export const createUrqlClient = (ssrExchange: any) => ({
  url: API_URL as string,
  fetchOptions: { credentials: `include` as const },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        UserType: () => null,
      },
      updates: {
        Mutation: {
          register: (result, _, cache) => {
            betterUpdateQry<RegisterMutation, UserQuery>(
              cache,
              { query: UserDocument },
              result,
              ({ register }, query) =>
                register.errors ? query : { user: register }
            );
          },

          login: (result, args, cache) => {
            betterUpdateQry<LoginMutation, UserQuery>(
              cache,
              { query: UserDocument },
              result,
              ({ login }, query) =>
                login.errors
                  ? query
                  : {
                      id: args.id,
                      user: login,
                    }
            );
          },

          logout: (result, args, cache) => {
            betterUpdateQry<LogoutMutation, UserQuery>(
              cache,
              { query: UserDocument },
              result,
              () => ({
                id: args.id,
                user: null,
              })
            );
          },

          addProduct: (result, args, cache) => {
            betterUpdateQry<AddProductMutation, ProductsQuery>(
              cache,
              { query: ProductsDocument },
              result,
              ({ addProduct }, query) =>
                addProduct.errors
                  ? query
                  : { id: args.id, allProducts: addProduct }
            );
          },

          updateProduct: (result, args, cache) => {
            betterUpdateQry<UpdateProductMutation, ProductsQuery>(
              cache,
              { query: ProductsDocument },
              result,
              ({ updateProduct }, query) =>
                updateProduct.errors
                  ? query
                  : { id: args.id, allProducts: updateProduct }
            );
          },

          deleteProduct: (result, args, cache) => {
            betterUpdateQry<DeleteProductMutation, ProductsQuery>(
              cache,
              { query: ProductsDocument },
              result,
              ({ deleteProduct }, query) =>
                deleteProduct.errors
                  ? query
                  : { id: args.id, allProducts: deleteProduct }
            );

            betterUpdateQry<DeleteProductMutation, PaginatedProductsQuery>(
              cache,
              { query: ProductsDocument },
              result,
              ({ deleteProduct }, query) =>
                deleteProduct.errors
                  ? query
                  : { id: args.id, paginatedProducts: deleteProduct }
            );
          },

          addToCart: (result, args, cache) => {
            betterUpdateQry<AddToCartMutation, UserQuery>(
              cache,
              { query: UserDocument },
              result,
              ({ addToCart }, query) =>
                addToCart.errors
                  ? query
                  : {
                      id: args.id,
                      user: addToCart,
                    }
            );
          },

          removeCartItem: (result, args, cache) => {
            betterUpdateQry<RemoveCartItemMutation, UserQuery>(
              cache,
              { query: UserDocument },
              result,
              ({ removeCartItem }, query) =>
                removeCartItem.errors
                  ? query
                  : {
                      id: args.id,
                      user: removeCartItem,
                    }
            );
          },
        },
      },
    }),
    errorExchange,
    fetchExchange,
    ssrExchange,
  ],
});
