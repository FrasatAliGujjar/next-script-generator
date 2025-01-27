"use client"

// context/AppContext.jsx
import { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {


    // ============================= [ Data ] ===============================


    var [count, setCount] = useState(0);


    // ======================================================================


    return (

        <AppContext.Provider value={{ count, setCount }}>
            {children}
        </AppContext.Provider>

    );
};
