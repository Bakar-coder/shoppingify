import { createContext } from "react";
import { shop } from "../types/shop";
import { preloadedState } from "./state";
export const shopContext = createContext<shop>(preloadedState);
