import axios from "axios";
import { createContext,useContext,useEffect,useMemo,useState } from "react";

const AuthContext=createContext();

const AuthProvider=({children})=>{
    const [Token,setToken_]=useState(localStorage.getItem("token"));

    const setToken=(newToken)=>{
        setToken_(newToken);
    }

    useEffect(()=>{
        if (Token) {
            axios.defaults.headers.common["Authorization"]=Token;
            localStorage.setItem("token",Token);
        }
        else{
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
        }
    },[Token]);

    const ContextValue=useMemo(()=>({
        Token,
        setToken
    }),[Token]);

    return(
        <AuthContext.Provider value={ContextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth=()=>{
    return useContext(AuthContext);
}
export default AuthProvider;