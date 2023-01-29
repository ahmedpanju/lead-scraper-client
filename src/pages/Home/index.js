import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Flex } from "rebass";

import { SearchContext } from "../../context/search";
import convertSearchToChatGptSearch from "../../utils/convertSearchToChatGptSearch";

import * as Styled from "./styles";
import axios from "axios";
import SearchInput from "../../components/Home/SearchInput";
import Title from "../../components/Title";
import SecondaryTitle from "../../components/SecondaryTitle";
import { CircularProgress } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const [showSuggestionsState, setShowSuggestionsState] = useState(false);
  const [searchIsLoadingState, setSearchIsLoadingState] = useState(false);
  const [inputIsDisabledState, setInputIsDisabledState] = useState(false);
  const searchContext = useContext(SearchContext);
  const [searchBarInputState, setSearchBarInputState] = useState();

  const handleSearch = async () => {
    try {
      setSearchIsLoadingState(true);
      const searchPromptResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/openAi/new-prompt`,
        {
          prompt: convertSearchToChatGptSearch(searchBarInputState).prompt,
        }
      );

      searchContext.setSearchPromptState(
        searchPromptResponse.data.trim().replace(/['"]+/g, "")
      );
    } catch (error) {
      toast.error("Oops! Something went wrong!");
    } finally {
      setInputIsDisabledState(false);
      setSearchIsLoadingState(false);
    }
  };

  useEffect(() => {
    if (searchContext.searchPromptState) {
      navigate("/github", {
        state: {
          prompt: searchContext.searchPromptState,
          originalSearch: searchBarInputState,
        },
      });
    }
  }, [searchContext.searchPromptState]);

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      if (!searchBarInputState) {
      } else {
        setInputIsDisabledState(true);
        setShowSuggestionsState(false);
        handleSearch();
      }
    }
  };
  return (
    <Styled.Container>
      <Flex flexDirection="column">
        <Title>Lola</Title>
        <Flex mt="30px">
          <SecondaryTitle>we've reinveted human connection</SecondaryTitle>
        </Flex>
      </Flex>
      <Flex mt="50px">
        <SearchInput
          showSuggestionsState={showSuggestionsState}
          setShowSuggestionsState={setShowSuggestionsState}
          onKeyPress={onKeyDown}
          value={searchBarInputState}
          disabled={inputIsDisabledState}
          onChange={(event) => setSearchBarInputState(event.target.value)}
        />
      </Flex>
      {searchIsLoadingState && (
        <Flex mt="20px">
          <CircularProgress />
        </Flex>
      )}
    </Styled.Container>
  );
};

export default Home;
