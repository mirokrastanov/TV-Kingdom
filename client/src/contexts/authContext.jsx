import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../config/appwriteConfig";
import { ID } from 'appwrite';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setLoading(false);
    }, [])

    const loginUser = async (userInfo) => {
        console.log(userInfo);
        setLoading(true);
        try {
            const response = await account.createEmailSession(
                userInfo.email,
                userInfo.pwd,
            );
            const accountDetails = await account.get();

            console.log('SESSION: ', response);
            console.log('AccountDetails: ', accountDetails);
            setUser(accountDetails); // that will log us in
            return accountDetails;
        } catch (error) {
            // console.log(error.message);
            // console.log(error.response);
            // console.log(error?.response?.code);
            // console.log(error?.response?.message);
            return error;
        }

        setLoading(false);
    };

    const logoutUser = () => {

    };

    const registerUser = (userInfo) => { };

    const checkUserStatus = () => { };

    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser,

    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
            {/* {loading ? <p>Loading...</p> : children} */}
        </AuthContext.Provider>
    );
};
