import { Dispatch } from "react";
import { UserType } from "../../generated/graphql";

export interface auth {
  user: any;
  cart: any;
  setUser: any;
  setCart: any;
  dispatch?: Dispatch<any>;
}
