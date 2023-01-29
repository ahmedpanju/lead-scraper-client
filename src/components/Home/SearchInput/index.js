import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";

import * as Styled from "./styles";

const defaultSuggestions = [
  {
    text: "Search for anyone who is in the market for a meal-delivery service",
  },
  {
    text: "Find me all of the AI developers in Bali and sort by competency",
  },
  {
    text: "Look for high net worth people who are interested in buying a home in Dubai",
  },
];

const SearchInput = ({
  suggestions,
  showSuggestionsState,
  setShowSuggestionsState,
  ...props
}) => {
  const [pageLoadedState, setPageLoadedState] = useState(false);

  useEffect(() => {
    if (props.value) {
      setShowSuggestionsState(true);
    }
  }, [props.value]);

  useEffect(() => {
    setPageLoadedState(true);
  }, []);

  return (
    <Styled.InputContainer>
      <Styled.SearchInput
        placeholder="Search for all of the A.I devs in Toronto"
        autoFocus
        onFocus={() => pageLoadedState && setShowSuggestionsState(true)}
        onBlur={() => setShowSuggestionsState(false)}
        {...props}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        autoComplete="off"
      />
      {showSuggestionsState && (
        <Styled.SuggestionsDrawer>
          <Styled.SuggestionsDrawerWrapper>
            <Styled.SuggestionsDrawerTitle>
              SUGGESTIONS
            </Styled.SuggestionsDrawerTitle>
            {(suggestions || defaultSuggestions).map((suggestion) => {
              return (
                <Styled.SuggestionsDrawerSuggestionContainer
                  key={suggestion.text}
                >
                  <Styled.SuggestionsDrawerSuggestionText>
                    {suggestion.text}
                  </Styled.SuggestionsDrawerSuggestionText>
                </Styled.SuggestionsDrawerSuggestionContainer>
              );
            })}
          </Styled.SuggestionsDrawerWrapper>
        </Styled.SuggestionsDrawer>
      )}
    </Styled.InputContainer>
  );
};

export default SearchInput;
