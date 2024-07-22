import { useContext, useDebugValue } from "react";
import AuthContext from "../Context/AuthProvide";

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    console.log("auth:", auth);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}
export default useAuth;