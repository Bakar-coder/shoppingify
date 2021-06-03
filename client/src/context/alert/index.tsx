import React, { useReducer } from "react";
import { preloadedState } from "./state";
import reducer from "./reducer";
import { alertContext } from "./context";

interface propTypes {}

const AlertState: React.FC<propTypes> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, preloadedState);
    const { Provider } = alertContext
    return (<Provider value={{...state, dispatch}}>{children}</Provider>);
};

export default AlertState;
