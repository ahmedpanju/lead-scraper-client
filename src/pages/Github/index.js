import React, { useEffect, useState } from "react";
import * as R from "ramda";
import { Flex } from "rebass";
import { CSVDownload } from "react-csv";
import { CircularProgress, Pagination } from "@mui/material";

import useGithubQuery from "../../hooks/useGithubQuery";
import useAddToAirtable from "../../hooks/useAddToAirtable";
import useFetchAllFromAirtable from "../../hooks/useFetchAllFromAirtable";
import EmailModal from "../../components/EmailModal";
import { useLocation } from "react-router-dom";
import GithubTable from "../../components/GithubTable";
import SecondaryTitle from "../../components/SecondaryTitle";
import SearchInput from "../../components/Home/SearchInput";

const suggestionsForSearch = [
  {
    text: "Export this data to a CSV",
  },
  {
    text: "Sort by the most number of followers",
  },
  {
    text: "Highlight the third column in yellow",
  },
];

const Github = () => {
  const location = useLocation();
  const addToAirtableHook = useAddToAirtable();
  const githubQueryHook = useGithubQuery();
  const fetchAllFromAirtalbeHook = useFetchAllFromAirtable();
  const currentSearchKey = R.path(["state", "prompt"], location);
  const [makeCsvDemo, setMakeCsvDemo] = useState(false);
  const [showSuggestionsState, setShowSuggestionsState] = useState(false);
  const originalSearchPrompt = R.path(["state", "originalSearch"], location);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchAllFromAirtalbeHook.fetchAll();
  }, []);

  useEffect(() => {
    if (currentSearchKey) {
      githubQueryHook.setCurrentQueryState(currentSearchKey);
      githubQueryHook.newQuery({ pageNumber: 1, query: currentSearchKey });
    }
  }, []);

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      if (!inputValue) {
      } else {
        setShowSuggestionsState(false);
        setMakeCsvDemo(true);
      }
    }
  };

  return (
    <div>
      <Flex flexDirection="column" alignItems="center">
        <Flex mt="20px" mb="20px">
          <SecondaryTitle>{originalSearchPrompt}</SecondaryTitle>
        </Flex>
        <Flex mb="20px">
          <SearchInput
            onKeyDown={onKeyDown}
            showSuggestionsState={showSuggestionsState}
            setShowSuggestionsState={setShowSuggestionsState}
            suggestions={suggestionsForSearch}
            placeholder="Anything else?"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </Flex>
      </Flex>
      {githubQueryHook.isLoadingState ? (
        <Flex justifyContent="center">
          <CircularProgress />
        </Flex>
      ) : (
        <GithubTable
          githubData={githubQueryHook.queryResponseState}
          fetchAllFromAirtalbeHook={fetchAllFromAirtalbeHook}
          addToAirtableHook={addToAirtableHook}
          originalSearchPrompt={originalSearchPrompt}
        />
      )}
      {!githubQueryHook.isLoadingState && (
        <Pagination
          page={githubQueryHook.currentPageNumberState}
          onChange={(_, page) =>
            githubQueryHook.setCurrentPageNumberState(page)
          }
          count={Math.round(githubQueryHook.queryTotalCountState / 100)}
        />
      )}
      {makeCsvDemo && (
        <CSVDownload target="_blank" data={githubQueryHook.queryCsvDataState} />
      )}
      <EmailModal />
    </div>
  );
};

export default Github;
