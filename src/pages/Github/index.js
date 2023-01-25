import React, { useEffect } from "react";
import { Flex } from "rebass";
import { CSVLink } from "react-csv";
import { Button, CircularProgress, Pagination, TextField } from "@mui/material";

import useGithubQuery from "../../hooks/useGithubQuery";
import useAddToAirtable from "../../hooks/useAddToAirtable";
import useFetchAllFromAirtable from "../../hooks/useFetchAllFromAirtable";

const Github = () => {
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
      {githubQueryHook.isLoadingState ? (
        <CircularProgress />
      ) : (
        <table>
          <tr>
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
          </tr>
          {githubQueryHook.queryResponseState.map((singleUser) => {
            const shouldShowAirtableButton =
              !fetchAllFromAirtalbeHook.listOfUsernamesState.includes(
                singleUser.username
              );

            return (
              <tr key={singleUser.username}>
                <td>{singleUser.name}</td>
                <td>{singleUser.username}</td>
                <td>{singleUser.email}</td>
                <td>{singleUser.bio}</td>
                <td>{singleUser.hireable}</td>
                <td>{singleUser.location}</td>
                <td>{singleUser.company}</td>
                <td>
                  {singleUser.twitter === "N/A" ? (
                    "N/A"
                  ) : (
                    <a
                      target="_blank"
                      href={singleUser.twitter}
                      rel="noreferrer"
                    >
                      Link
                    </a>
                  )}
                </td>
                <td>
                  <a
                    target="_blank"
                    href={singleUser.githubProfile}
                    rel="noreferrer"
                  >
                    Link
                  </a>
                </td>
                <td>
                  {singleUser.blog === "N/A" ? (
                    "N/A"
                  ) : (
                    <a target="_blank" href={singleUser.blog} rel="noreferrer">
                      Link
                    </a>
                  )}
                </td>
                <td>
                  {addToAirtableHook.isLoadingState ? (
                    <CircularProgress />
                  ) : shouldShowAirtableButton ? (
                    <Button
                      variant="outlined"
                      onClick={() =>
                        addToAirtableHook.addRecord({
                          payload: singleUser,
                        })
                      }
                    >
                      Add
                    </Button>
                  ) : (
                    <div>Already Added</div>
                  )}
                </td>
              </tr>
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
    </div>
  );
};

export default Github;
