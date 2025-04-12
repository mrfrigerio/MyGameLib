import React, { useContext, useState } from "react";

interface ISearchContext {
  search?: string;
  setSearchParam: (search: string) => void;
}

const SearchContext = React.createContext({} as ISearchContext);
SearchContext.displayName = "SearchContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [searchParam, setSearchParam] = useState<string>("");

  return (
    <SearchContext.Provider
      value={{
        search: searchParam,
        setSearchParam,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): ISearchContext => useContext(SearchContext);
