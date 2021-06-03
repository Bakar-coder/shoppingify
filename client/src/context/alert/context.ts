import { createContext } from "react"
import { alert } from "../types/alert"
import { preloadedState } from "./state"
export const alertContext =  createContext<alert>(preloadedState)