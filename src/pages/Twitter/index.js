import React, { useContext, useEffect } from "react";
import { Flex } from "rebass";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import * as R from "ramda";

import useFetchAllFromAirtable from "../../hooks/useFetchAllFromAirtable";
import useTwitterQuery from "../../hooks/useTwitterQuery";
import SingleTwitterRow from "../../components/SingleTwitterRow";
import { UsersContext } from "../../context/users";
import useOpenAiChat from "../../hooks/useOpenAiChat";
import EmailModal from "../../components/EmailModal";

const Twitter = () => {
  const location = useLocation();
  const openAiChat = useOpenAiChat();
  const usersContext = useContext(UsersContext);
  const twitterQueryHook = useTwitterQuery();
  const fetchAllFromAirtalbeHook = useFetchAllFromAirtable();

  useEffect(() => {
    const promptFromLocation = R.path(["state", "prompt"], location);
    if (promptFromLocation) {
      twitterQueryHook.setCurrentQueryState(promptFromLocation);
      twitterQueryHook.newQuery({ pageNumber: 1, query: promptFromLocation });
    }
  }, []);

  return (
    <div>
      <h1>TWITTER SCRAPER</h1>
      <Flex mb="15px">
        <TextField
          label="Query"
          type="text"
          value={twitterQueryHook.currentQueryState}
          onChange={(event) =>
            twitterQueryHook.setCurrentQueryState(event.target.value)
          }
        />
      </Flex>
      <Flex>
        {twitterQueryHook.isLoadingState ||
        fetchAllFromAirtalbeHook.isLoadingState ? (
          <CircularProgress />
        ) : (
          <Button
            onClick={() => {
              twitterQueryHook.newQuery({ pageNumber: 1 });
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
      {twitterQueryHook.isLoadingState ? (
        <CircularProgress />
      ) : (
        <table>
          <tr>
            <th style={{ textAlign: "left" }}>Select</th>
            <th style={{ textAlign: "left" }}>Screenname</th>
            <th style={{ textAlign: "left" }}>Lead Quality (static)</th>
            <th style={{ textAlign: "left" }}>Bio</th>
            <th style={{ textAlign: "left" }}>Followers</th>
            <th style={{ textAlign: "left" }}>Location</th>
            <th style={{ textAlign: "left" }}>Name</th>
            <th style={{ textAlign: "left" }}>Url</th>
            <th style={{ textAlign: "left" }}>Verified</th>
            <th style={{ textAlign: "left" }}>Prompt</th>
            <th style={{ textAlign: "left" }}>View</th>
          </tr>
          {twitterQueryHook.queryResponseState.map((singleUser) => {
            return (
              <SingleTwitterRow
                singleUser={singleUser}
                key={singleUser.screenname}
              />
            );
          })}
        </table>
      )}
      <EmailModal />
    </div>
  );
};

export default Twitter;
