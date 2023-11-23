import React, { useState, useContext } from "react";

const SearchContext = React.createContext();
const SearchUpdateContext = React.createContext();

export function useSearch() {
    return useContext(SearchContext);
}

export function useSearchUpdate() {
    return useContext(SearchUpdateContext);
}

export function SearchProvider({ children }) {
    const [searchValue, setSearchValue] = useState('');

    return (
        <SearchContext.Provider value={searchValue}>
            <SearchUpdateContext.Provider value={setSearchValue}>
                {children}
            </SearchUpdateContext.Provider>
        </SearchContext.Provider>
    );
};