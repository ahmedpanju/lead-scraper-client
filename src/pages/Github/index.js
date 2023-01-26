import React, { useContext, useEffect } from "react";
import { Flex } from "rebass";
import { CSVLink } from "react-csv";
import { Button, CircularProgress, Pagination, TextField } from "@mui/material";

import useGithubQuery from "../../hooks/useGithubQuery";
import useAddToAirtable from "../../hooks/useAddToAirtable";
import useFetchAllFromAirtable from "../../hooks/useFetchAllFromAirtable";
import SingleGithubRow from "../../components/SingleGithubRow";
import EmailModal from "../../components/EmailModal";
import useOpenAiChat from "../../hooks/useOpenAiChat";
import { UsersContext } from "../../context/users";

const Github = () => {
  const openAiChat = useOpenAiChat();
  const usersContext = useContext(UsersContext);
  const addToAirtableHook = useAddToAirtable();
  const githubQueryHook = useGithubQuery();
  const fetchAllFromAirtalbeHook = useFetchAllFromAirtable();

  useEffect(() => {
    fetchAllFromAirtalbeHook.fetchAll();
  }, []);

  return (
    <div>
      <h1>GITHUB SCRAPER</h1>
      <Flex mb="15px">
        <TextField
          label="Query"
          type="text"
          value={githubQueryHook.currentQueryState}
          onChange={(event) =>
            githubQueryHook.setCurrentQueryState(event.target.value)
          }
        />
      </Flex>
      <Flex>
        {githubQueryHook.isLoadingState ||
        fetchAllFromAirtalbeHook.isLoadingState ? (
          <CircularProgress />
        ) : (
          <Button
            onClick={() => {
              githubQueryHook.newQuery({ pageNumber: 1 });
            }}
            variant="outlined"
          >
            Search
          </Button>
        )}
        <Button
          variant="outlined"
          onClick={() =>
            openAiChat.newPrompt({ users: usersContext.selectedUsersState })
          }
        >
          Bulk Generate Emails
        </Button>
      </Flex>
      {githubQueryHook.isLoadingState ? (
        <CircularProgress />
      ) : (
        <table>
          <tr>
            <th style={{ textAlign: "left" }}>Select</th>
            <th style={{ textAlign: "left" }}>Name</th>
            <th style={{ textAlign: "left" }}>Username</th>
            <th style={{ textAlign: "left" }}>Email</th>
            <th style={{ textAlign: "left" }}>Bio</th>
            <th style={{ textAlign: "left" }}>Hireable</th>
            <th style={{ textAlign: "left" }}>Location</th>
            <th style={{ textAlign: "left" }}>Company</th>
            <th style={{ textAlign: "left" }}>Twitter</th>
            <th style={{ textAlign: "left" }}>Github</th>
            <th style={{ textAlign: "left" }}>Blog</th>
            <th style={{ textAlign: "left" }}>Add To Airtable</th>
            <th style={{ textAlign: "left" }}>Prompt</th>
          </tr>
          {githubQueryHook.queryResponseState.map((singleUser) => {
            const shouldShowAirtableButton =
              !fetchAllFromAirtalbeHook.listOfUsernamesState.includes(
                singleUser.username
              );

            return (
              <SingleGithubRow
                key={singleUser.username}
                singleUser={singleUser}
                addToAirtableHook={addToAirtableHook}
                shouldShowAirtableButton={shouldShowAirtableButton}
              />
            );
          })}
        </table>
      )}
      <Pagination
        page={githubQueryHook.currentPageNumberState}
        onChange={(_, page) => githubQueryHook.setCurrentPageNumberState(page)}
        count={Math.round(githubQueryHook.queryTotalCountState / 100)}
      />
      <CSVLink data={githubQueryHook.queryCsvDataState}>Export To CSV</CSVLink>
      <EmailModal />
    </div>
  );
};

export default Github;
