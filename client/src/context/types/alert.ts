import { Dispatch } from "react";

export interface alert {
  error: boolean;
  info: boolean;
  success: boolean;
  warning: boolean;
  msg: string;
  dispatch?: Dispatch<any>;
}
