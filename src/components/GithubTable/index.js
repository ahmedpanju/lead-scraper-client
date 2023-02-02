import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const GithubTable = ({
  githubData,
  fetchAllFromAirtalbeHook,
  addToAirtableHook,
}) => {
  const navigate = useNavigate();

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="left">Name</TableCell>
          <TableCell align="left">Username</TableCell>
          <TableCell align="left">Email</TableCell>
          <TableCell align="left">Bio</TableCell>
          <TableCell align="left">Hireable</TableCell>
          <TableCell align="left">Location</TableCell>
          <TableCell align="left">Company</TableCell>
          <TableCell align="left">Add to Airtable</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {githubData.map((row) => {
          const shouldShowAirtableButton =
            !fetchAllFromAirtalbeHook.listOfUsernamesState.includes(
              row.username
            );
          return (
            <TableRow
              style={{ cursor: "pointer", marginBottom: "4px" }}
              hover
              key={row.username}
              onClick={() =>
                navigate("/lead", {
                  state: {
                    user: row,
                  },
                })
              }
            >
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.bio}</TableCell>
              <TableCell align="left">{row.hireable}</TableCell>
              <TableCell align="left">{row.location}</TableCell>
              <TableCell align="left">{row.company}</TableCell>
              <TableCell align="left">
                {addToAirtableHook.isLoadingState ? (
                  <CircularProgress />
                ) : shouldShowAirtableButton ? (
                  <Button
                    variant="outlined"
                    onClick={() =>
                      addToAirtableHook.addRecord({
                        payload: row,
                      })
                    }
                  >
                    Add
                  </Button>
                ) : (
                  <div>Added</div>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default GithubTable;
