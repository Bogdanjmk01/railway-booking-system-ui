import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const token = window.localStorage.getItem("access_token");
    return !token ? (<Outlet />) : <Navigate to="/" />
};

export default PublicRoute;
