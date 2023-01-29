import { createContext, useState } from "react";

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchPromptState, setSearchPromptState] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchPromptState,
        setSearchPromptState,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
