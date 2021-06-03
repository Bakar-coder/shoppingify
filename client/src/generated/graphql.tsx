import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AddProductInputType = {
  title: Scalars['String'];
  stock: Scalars['Int'];
  price: Scalars['Float'];
  category: Scalars['String'];
  discount?: Maybe<Scalars['String']>;
  discountExpiration?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  tags?: Maybe<Scalars['String']>;
  images: Array<Scalars['Upload']>;
  featured?: Maybe<Scalars['Boolean']>;
  published?: Maybe<Scalars['Boolean']>;
};

export type BraintreeTokenResponseType = {
  __typename?: 'BraintreeTokenResponseType';
  success: Scalars['Boolean'];
  clientToken: Scalars['String'];
};

export type BraintreeTransactionResponseType = {
  __typename?: 'BraintreeTransactionResponseType';
  errors: Scalars['String'];
  success: Scalars['Boolean'];
  transaction: Scalars['String'];
};

export type CartItemType = {
  __typename?: 'CartItemType';
  id: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  images: Scalars['String'];
  quantity: Scalars['Int'];
};


export type ErrorField = {
  __typename?: 'ErrorField';
  field?: Maybe<Scalars['String']>;
  msg: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  processPayment: BraintreeTransactionResponseType;
  addProduct: ProductsResponseType;
  updateProduct: ProductsResponseType;
  deleteProduct: ProductsResponseType;
  addToCart: UserType;
  decrementCartItem: Array<UserType>;
  removeCartItem: UserType;
  clearCart: Scalars['Boolean'];
  register: UserType;
  login: UserType;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  changePassword: Scalars['Boolean'];
};


export type MutationProcessPaymentArgs = {
  paymentMethodNonce: Scalars['String'];
  amount: Scalars['String'];
};


export type MutationAddProductArgs = {
  opts: AddProductInputType;
};


export type MutationUpdateProductArgs = {
  opts: UpdateProductInputType;
};


export type MutationDeleteProductArgs = {
  id: Scalars['Int'];
};


export type MutationAddToCartArgs = {
  quantity: Scalars['Int'];
  productId: Scalars['Int'];
};


export type MutationDecrementCartItemArgs = {
  quantity: Scalars['Int'];
  productId: Scalars['Int'];
};


export type MutationRemoveCartItemArgs = {
  productId: Scalars['Int'];
};


export type MutationRegisterArgs = {
  opts: UserRegisterInputType;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
};

export type ProductResponseType = {
  __typename?: 'ProductResponseType';
  errors?: Maybe<Array<ErrorField>>;
  product?: Maybe<ProductType>;
};

export type ProductType = {
  __typename?: 'ProductType';
  id: Scalars['Int'];
  title: Scalars['String'];
  stock: Scalars['Int'];
  price: Scalars['Float'];
  category: Scalars['String'];
  discount?: Maybe<Scalars['String']>;
  discountExpiration?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  tags?: Maybe<Scalars['String']>;
  images: Scalars['String'];
  user: User;
  featured?: Maybe<Scalars['Boolean']>;
  published?: Maybe<Scalars['Boolean']>;
};

export type ProductsResponseType = {
  __typename?: 'ProductsResponseType';
  errors?: Maybe<Array<ErrorField>>;
  products?: Maybe<Array<ProductType>>;
};

export type Query = {
  __typename?: 'Query';
  getToken: BraintreeTokenResponseType;
  getCart: UserType;
  product: ProductResponseType;
  paginatedProducts: ProductsResponseType;
  allProducts: ProductsResponseType;
  user?: Maybe<UserType>;
  users: Array<User>;
};


export type QueryProductArgs = {
  id: Scalars['Int'];
};


export type QueryPaginatedProductsArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  avatar: Scalars['String'];
  admin?: Maybe<Scalars['Boolean']>;
  seller?: Maybe<Scalars['Boolean']>;
  verified?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserRegisterInputType = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  password2: Scalars['String'];
  seller?: Maybe<Scalars['Boolean']>;
  admin?: Maybe<Scalars['Boolean']>;
};

export type UserType = {
  __typename?: 'UserType';
  user?: Maybe<User>;
  cart?: Maybe<Array<CartItemType>>;
  errors?: Maybe<Array<ErrorField>>;
};

export type UpdateProductInputType = {
  id: Scalars['Int'];
  title: Scalars['String'];
  stock: Scalars['Int'];
  price: Scalars['Float'];
  category: Scalars['String'];
  discount?: Maybe<Scalars['String']>;
  discountExpiration?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  tags?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Scalars['Upload']>>;
  featured?: Maybe<Scalars['Boolean']>;
  published?: Maybe<Scalars['Boolean']>;
};

export type ProductFragment = (
  { __typename?: 'ProductType' }
  & Pick<ProductType, 'id' | 'title' | 'stock' | 'price' | 'category' | 'discount' | 'discountExpiration' | 'description' | 'tags' | 'images' | 'featured' | 'published'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'username' | 'email' | 'avatar' | 'admin' | 'seller'>
  ) }
);

export type ProductsFragment = (
  { __typename?: 'ProductsResponseType' }
  & { errors?: Maybe<Array<(
    { __typename?: 'ErrorField' }
    & ErrorFragment
  )>>, products?: Maybe<Array<(
    { __typename?: 'ProductType' }
    & ProductFragment
  )>> }
);

export type UserDataFragment = (
  { __typename?: 'UserType' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )>, cart?: Maybe<Array<(
    { __typename?: 'CartItemType' }
    & CartFragment
  )>>, errors?: Maybe<Array<(
    { __typename?: 'ErrorField' }
    & ErrorFragment
  )>> }
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'firstName' | 'lastName' | 'username' | 'email' | 'avatar' | 'admin' | 'seller' | 'verified'>
);

export type CartFragment = (
  { __typename?: 'CartItemType' }
  & Pick<CartItemType, 'id' | 'title' | 'description' | 'price' | 'images' | 'quantity'>
);

export type ErrorFragment = (
  { __typename?: 'ErrorField' }
  & Pick<ErrorField, 'field' | 'msg'>
);

export type MakePaymentMutationVariables = Exact<{
  paymentMethodNonce: Scalars['String'];
  amount: Scalars['String'];
}>;


export type MakePaymentMutation = (
  { __typename?: 'Mutation' }
  & { processPayment: (
    { __typename?: 'BraintreeTransactionResponseType' }
    & Pick<BraintreeTransactionResponseType, 'errors' | 'success' | 'transaction'>
  ) }
);

export type AddProductMutationVariables = Exact<{
  title: Scalars['String'];
  stock: Scalars['Int'];
  price: Scalars['Float'];
  category: Scalars['String'];
  discount?: Maybe<Scalars['String']>;
  discountExpiration?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  tags?: Maybe<Scalars['String']>;
  images: Array<Scalars['Upload']> | Scalars['Upload'];
  featured?: Maybe<Scalars['Boolean']>;
  published?: Maybe<Scalars['Boolean']>;
}>;


export type AddProductMutation = (
  { __typename?: 'Mutation' }
  & { addProduct: (
    { __typename?: 'ProductsResponseType' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & ErrorFragment
    )>>, products?: Maybe<Array<(
      { __typename?: 'ProductType' }
      & ProductFragment
    )>> }
  ) }
);

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  stock: Scalars['Int'];
  price: Scalars['Float'];
  category: Scalars['String'];
  discount?: Maybe<Scalars['String']>;
  discountExpiration?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  tags?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Scalars['Upload']> | Scalars['Upload']>;
  featured?: Maybe<Scalars['Boolean']>;
  published?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateProductMutation = (
  { __typename?: 'Mutation' }
  & { updateProduct: (
    { __typename?: 'ProductsResponseType' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & ErrorFragment
    )>>, products?: Maybe<Array<(
      { __typename?: 'ProductType' }
      & ProductFragment
    )>> }
  ) }
);

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteProductMutation = (
  { __typename?: 'Mutation' }
  & { deleteProduct: (
    { __typename?: 'ProductsResponseType' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & ErrorFragment
    )>>, products?: Maybe<Array<(
      { __typename?: 'ProductType' }
      & ProductFragment
    )>> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  password2: Scalars['String'];
  seller?: Maybe<Scalars['Boolean']>;
  admin?: Maybe<Scalars['Boolean']>;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserType' }
    & UserDataFragment
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserType' }
    & UserDataFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type AddToCartMutationVariables = Exact<{
  productId: Scalars['Int'];
  quantity: Scalars['Int'];
}>;


export type AddToCartMutation = (
  { __typename?: 'Mutation' }
  & { addToCart: (
    { __typename?: 'UserType' }
    & UserDataFragment
  ) }
);

export type DecrementCartItemMutationVariables = Exact<{
  productId: Scalars['Int'];
  quantity: Scalars['Int'];
}>;


export type DecrementCartItemMutation = (
  { __typename?: 'Mutation' }
  & { decrementCartItem: Array<(
    { __typename?: 'UserType' }
    & UserDataFragment
  )> }
);

export type RemoveCartItemMutationVariables = Exact<{
  productId: Scalars['Int'];
}>;


export type RemoveCartItemMutation = (
  { __typename?: 'Mutation' }
  & { removeCartItem: (
    { __typename?: 'UserType' }
    & UserDataFragment
  ) }
);

export type ClearCartMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearCartMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'clearCart'>
);

export type PaymentTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type PaymentTokenQuery = (
  { __typename?: 'Query' }
  & { getToken: (
    { __typename?: 'BraintreeTokenResponseType' }
    & Pick<BraintreeTokenResponseType, 'success' | 'clientToken'>
  ) }
);

export type ProductQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProductQuery = (
  { __typename?: 'Query' }
  & { product: (
    { __typename?: 'ProductResponseType' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & ErrorFragment
    )>>, product?: Maybe<(
      { __typename?: 'ProductType' }
      & ProductFragment
    )> }
  ) }
);

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { allProducts: (
    { __typename?: 'ProductsResponseType' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & ErrorFragment
    )>>, products?: Maybe<Array<(
      { __typename?: 'ProductType' }
      & ProductFragment
    )>> }
  ) }
);

export type PaginatedProductsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['Int']>;
}>;


export type PaginatedProductsQuery = (
  { __typename?: 'Query' }
  & { paginatedProducts: (
    { __typename?: 'ProductsResponseType' }
    & ProductsFragment
  ) }
);

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'UserType' }
    & UserDataFragment
  )> }
);

export type GetCartQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartQuery = (
  { __typename?: 'Query' }
  & { getCart: (
    { __typename?: 'UserType' }
    & UserDataFragment
  ) }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export const ErrorFragmentDoc = gql`
    fragment error on ErrorField {
  field
  msg
}
    `;
export const ProductFragmentDoc = gql`
    fragment product on ProductType {
  id
  title
  stock
  price
  category
  discount
  discountExpiration
  description
  tags
  images
  featured
  published
  user {
    id
    firstName
    lastName
    username
    email
    avatar
    admin
    seller
  }
}
    `;
export const ProductsFragmentDoc = gql`
    fragment products on ProductsResponseType {
  errors {
    ...error
  }
  products {
    ...product
  }
}
    ${ErrorFragmentDoc}
${ProductFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment user on User {
  id
  firstName
  lastName
  username
  email
  avatar
  admin
  seller
  verified
}
    `;
export const CartFragmentDoc = gql`
    fragment cart on CartItemType {
  id
  title
  description
  price
  images
  quantity
}
    `;
export const UserDataFragmentDoc = gql`
    fragment userData on UserType {
  user {
    ...user
  }
  cart {
    ...cart
  }
  errors {
    ...error
  }
}
    ${UserFragmentDoc}
${CartFragmentDoc}
${ErrorFragmentDoc}`;
export const MakePaymentDocument = gql`
    mutation MakePayment($paymentMethodNonce: String!, $amount: String!) {
  processPayment(paymentMethodNonce: $paymentMethodNonce, amount: $amount) {
    errors
    success
    transaction
  }
}
    `;

export function useMakePaymentMutation() {
  return Urql.useMutation<MakePaymentMutation, MakePaymentMutationVariables>(MakePaymentDocument);
};
export const AddProductDocument = gql`
    mutation AddProduct($title: String!, $stock: Int!, $price: Float!, $category: String!, $discount: String, $discountExpiration: String, $description: String!, $tags: String, $images: [Upload!]!, $featured: Boolean, $published: Boolean) {
  addProduct(
    opts: {title: $title, stock: $stock, price: $price, category: $category, discount: $discount, discountExpiration: $discountExpiration, description: $description, tags: $tags, images: $images, featured: $featured, published: $published}
  ) {
    errors {
      ...error
    }
    products {
      ...product
    }
  }
}
    ${ErrorFragmentDoc}
${ProductFragmentDoc}`;

export function useAddProductMutation() {
  return Urql.useMutation<AddProductMutation, AddProductMutationVariables>(AddProductDocument);
};
export const UpdateProductDocument = gql`
    mutation UpdateProduct($id: Int!, $title: String!, $stock: Int!, $price: Float!, $category: String!, $discount: String, $discountExpiration: String, $description: String!, $tags: String, $images: [Upload!], $featured: Boolean, $published: Boolean) {
  updateProduct(
    opts: {id: $id, title: $title, stock: $stock, price: $price, category: $category, discount: $discount, discountExpiration: $discountExpiration, description: $description, tags: $tags, images: $images, featured: $featured, published: $published}
  ) {
    errors {
      ...error
    }
    products {
      ...product
    }
  }
}
    ${ErrorFragmentDoc}
${ProductFragmentDoc}`;

export function useUpdateProductMutation() {
  return Urql.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument);
};
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: Int!) {
  deleteProduct(id: $id) {
    errors {
      ...error
    }
    products {
      ...product
    }
  }
}
    ${ErrorFragmentDoc}
${ProductFragmentDoc}`;

export function useDeleteProductMutation() {
  return Urql.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument);
};
export const RegisterDocument = gql`
    mutation Register($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!, $password2: String!, $seller: Boolean, $admin: Boolean) {
  register(
    opts: {firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password, password2: $password2, admin: $admin, seller: $seller}
  ) {
    ...userData
  }
}
    ${UserDataFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(password: $password, usernameOrEmail: $usernameOrEmail) {
    ...userData
  }
}
    ${UserDataFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const AddToCartDocument = gql`
    mutation AddToCart($productId: Int!, $quantity: Int!) {
  addToCart(productId: $productId, quantity: $quantity) {
    ...userData
  }
}
    ${UserDataFragmentDoc}`;

export function useAddToCartMutation() {
  return Urql.useMutation<AddToCartMutation, AddToCartMutationVariables>(AddToCartDocument);
};
export const DecrementCartItemDocument = gql`
    mutation DecrementCartItem($productId: Int!, $quantity: Int!) {
  decrementCartItem(productId: $productId, quantity: $quantity) {
    ...userData
  }
}
    ${UserDataFragmentDoc}`;

export function useDecrementCartItemMutation() {
  return Urql.useMutation<DecrementCartItemMutation, DecrementCartItemMutationVariables>(DecrementCartItemDocument);
};
export const RemoveCartItemDocument = gql`
    mutation RemoveCartItem($productId: Int!) {
  removeCartItem(productId: $productId) {
    ...userData
  }
}
    ${UserDataFragmentDoc}`;

export function useRemoveCartItemMutation() {
  return Urql.useMutation<RemoveCartItemMutation, RemoveCartItemMutationVariables>(RemoveCartItemDocument);
};
export const ClearCartDocument = gql`
    mutation ClearCart {
  clearCart
}
    `;

export function useClearCartMutation() {
  return Urql.useMutation<ClearCartMutation, ClearCartMutationVariables>(ClearCartDocument);
};
export const PaymentTokenDocument = gql`
    query PaymentToken {
  getToken {
    success
    clientToken
  }
}
    `;

export function usePaymentTokenQuery(options: Omit<Urql.UseQueryArgs<PaymentTokenQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PaymentTokenQuery>({ query: PaymentTokenDocument, ...options });
};
export const ProductDocument = gql`
    query Product($id: Int!) {
  product(id: $id) {
    errors {
      ...error
    }
    product {
      ...product
    }
  }
}
    ${ErrorFragmentDoc}
${ProductFragmentDoc}`;

export function useProductQuery(options: Omit<Urql.UseQueryArgs<ProductQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductQuery>({ query: ProductDocument, ...options });
};
export const ProductsDocument = gql`
    query Products {
  allProducts {
    errors {
      ...error
    }
    products {
      ...product
    }
  }
}
    ${ErrorFragmentDoc}
${ProductFragmentDoc}`;

export function useProductsQuery(options: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductsQuery>({ query: ProductsDocument, ...options });
};
export const PaginatedProductsDocument = gql`
    query PaginatedProducts($limit: Int!, $cursor: Int) {
  paginatedProducts(cursor: $cursor, limit: $limit) {
    ...products
  }
}
    ${ProductsFragmentDoc}`;

export function usePaginatedProductsQuery(options: Omit<Urql.UseQueryArgs<PaginatedProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PaginatedProductsQuery>({ query: PaginatedProductsDocument, ...options });
};
export const UserDocument = gql`
    query User {
  user {
    ...userData
  }
}
    ${UserDataFragmentDoc}`;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};
export const GetCartDocument = gql`
    query GetCart {
  getCart {
    ...userData
  }
}
    ${UserDataFragmentDoc}`;

export function useGetCartQuery(options: Omit<Urql.UseQueryArgs<GetCartQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCartQuery>({ query: GetCartDocument, ...options });
};
export const UsersDocument = gql`
    query Users {
  users {
    ...user
  }
}
    ${UserFragmentDoc}`;

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};