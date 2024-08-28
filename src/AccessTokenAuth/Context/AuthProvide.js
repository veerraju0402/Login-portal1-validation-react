import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const useAuthContext=() =>useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState();
    console.log("AuthContext auth:",auth)
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
           
        </AuthContext.Provider>
    )
}
export default AuthContext;