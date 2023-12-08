import React, { useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }) {
    const [darkTheme, setDarkTheme] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        // let savedMode = localStorage.getItem('TV-dark-mode');
        // if (savedMode == 'true') setDarkTheme(true);
        // else setDarkTheme(false);
        if (!user) return;
        let storedTheme = localStorage.getItem(user.email + '--theme');
        if (storedTheme == 'true' && !darkTheme) setDarkTheme(true);
        else if (storedTheme == 'false' && darkTheme) setDarkTheme(false);
    }, []);

    useEffect(() => {
        if (!user) return;
        let storedTheme = localStorage.getItem(user.email + '--theme');
        if (storedTheme == 'true' && !darkTheme) setDarkTheme(true);
        else if (storedTheme == 'false' && darkTheme) setDarkTheme(false);
    }, [user]);

    useEffect(() => {
        if (!user) return;
        if (darkTheme) {
            localStorage.setItem(user.email + '--theme', 'true');
            // localStorage.setItem('TV-dark-mode', 'true');
        } else {
            localStorage.setItem(user.email + '--theme', 'false');
            // localStorage.setItem('TV-dark-mode', 'false');
        }
    }, [darkTheme]);

    function toggleTheme() {
        setDarkTheme(prevDarkTheme => !prevDarkTheme);
    }

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
};