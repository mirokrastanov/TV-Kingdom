import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../config/appwriteConfig";
import { ID } from 'appwrite';

const AuthContext = createContext();
const AuthUpdateContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthUpdate() {
    return useContext(AuthUpdateContext);
}

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState('');

    
    

    return (
        <AuthContext.Provider value={auth}>
            <AuthUpdateContext.Provider value={setAuth}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    );
};