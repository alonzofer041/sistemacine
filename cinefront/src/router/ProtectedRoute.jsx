import {Navigate,Outlet} from "react-router-dom";
import {useAuth} from "../provider/AuthProvider";

export const ProtectedRoute=()=>{
    const {Token}=useAuth();

    if (!Token) {
        return <Navigate to="/login" />
    }

    return <Outlet/>
}