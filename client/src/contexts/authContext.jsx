import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../config/appwriteConfig";
import { ID } from 'appwrite';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkUserStatus();
    }, []);

    const loginUser = async (userInfo) => {
        const { email, pwd } = userInfo;
        // console.log(userInfo);
        try {
            const session = await account.createEmailSession(email, pwd);
            const accountDetails = await account.get();

            localStorage.setItem('TV-session', JSON.stringify(session));
            localStorage.setItem('TV-account', JSON.stringify(accountDetails));

            setUser(accountDetails); // that will login the user locally
            return accountDetails;
        } catch (error) {
            return error;
        }
    };

    const registerUser = async (userInfo) => {
        const { username, email, pwd } = userInfo;
        // console.log(userInfo);
        try {
            const registerRes = await account.create(ID.unique(), email, pwd, username);
            const session = await account.createEmailSession(email, pwd);
            const accountDetails = await account.get();

            localStorage.setItem('TV-session', JSON.stringify(session));
            localStorage.setItem('TV-account', JSON.stringify(accountDetails));

            setUser(accountDetails); // that will login the user locally
            return accountDetails;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const logoutUser = () => {
        account.deleteSession('current');
        setUser(null);
        localStorage.removeItem('TV-session');
        localStorage.removeItem('TV-account');
    };

    const checkUserStatus = async () => {
        try {
            const accountDetails = await account.get();
            if (localStorage.getItem('TV-account') != JSON.stringify(accountDetails)) {
                localStorage.setItem('TV-account', JSON.stringify(accountDetails));
            }
            setUser(accountDetails); // that will login the user locally
            return accountDetails;
        } catch (error) {
            setUser(null);
            return error;
        }
    };

    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser,
        checkUserStatus,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
