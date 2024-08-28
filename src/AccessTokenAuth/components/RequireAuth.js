import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";//

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    //https://www.youtube.com/watch?v=3QaFEu-KkR8&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=7
// const decodeauth=auth?.accessToken?jwtDecode(auth.accessToken):undefined
// const roles=decodeauth?.userInfo?.roles || []

    return (
        //roles?.find(role => allowedRoles?.includes(role))
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;