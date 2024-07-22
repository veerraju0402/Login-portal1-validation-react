import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const useAuthContext=() =>useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({name:"avr"});
    console.log("AuthContext auth:",auth)
    console.log("children:",children)
    alert('entered auth')
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
           
        </AuthContext.Provider>
    )
}
export default AuthContext;