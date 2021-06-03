import { createContext } from "react";
import { auth } from "../types/auth";
import { preloadedState } from "./state";
export const authContext = createContext<auth>(preloadedState);
