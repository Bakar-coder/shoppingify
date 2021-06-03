import { ErrorField } from '../generated/graphql';

export const errorMap = (errors: ErrorField[]) => {
  const error: Record<string, string> = {};
  errors.forEach(({ field, msg }) => {
    error[field as string] = msg;
  });

  return error;
};
