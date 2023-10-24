import {Navigate,Outlet} from "react-router-dom";
import {useAuth} from "../provider/AuthProvider";
import jwtDecode from "jwt-decode";

export const ProtectedRootRoute=()=>{
    const {Token}=useAuth();
    if (!Token) {
        return <Navigate to="/login" />
    }
    else{
        const DecodedToken=jwtDecode(Token);
        const CurrentDate=new Date();
        if (DecodedToken.exp*1000<CurrentDate.getTime()) {
            return <Navigate to="/login" />
        }
        else if(DecodedToken.Usuario.rol!='root'){
            localStorage.removeItem("token");
            return <Navigate to="/login" />
        }
    }

    return <Outlet/>
}