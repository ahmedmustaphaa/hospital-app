import { createContext, useContext, useState } from "react";
import axios from 'axios'
const appContext = createContext();

function AppProvider({ children }) {
    const [atoken, setToken] = useState('');

  


  

    const value = {
        atoken,
        setToken
    };

    
    return (
        <appContext.Provider value={value}>
            {children}
        </appContext.Provider>
    );
}

export const UseproviderContext = () => {
    return useContext(appContext);
};

export default AppProvider;