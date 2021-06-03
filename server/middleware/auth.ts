import { MiddlewareFn } from 'type-graphql';
import { appContext } from '../context';

export const isAuth: MiddlewareFn<appContext> = ({ context }, next): Promise<MiddlewareFn<appContext> > => {
    const { res } = context
  if (!res.locals.isAuth) 
    throw new Error('Unauthenticated');
  return next();
}

export const isMerchant: MiddlewareFn<appContext> = ({ context }, next) => {
  const { res } = context
  if (!res.locals.user.admin && !res.locals.user.seller) 
    throw new Error('Unauthorized. Upgrade to a pro account.');
  return next();
}

export const isAdmin: MiddlewareFn<appContext> = ({ context }, next) => {
  const { res } = context
  if (!res.locals.user.admin) 
    throw new Error('Unauthorized, Admin access only.');
  return next();
}