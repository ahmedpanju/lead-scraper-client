import React, { useContext, useEffect, useState } from "react";
import * as R from "ramda";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import convertSocialDataToPrompt from "../../utils/convertSocialDataToPrompt";
import { UsersContext } from "../../context/users";

const SingleTwitterRow = ({ singleUser }) => {
  const [userIsSelectedState, setUserIsSelected] = useState(false);
  const usersContext = useContext(UsersContext);

  const [promptTextState, setPromptTextState] = useState(
    convertSocialDataToPrompt({
      name: singleUser.name,
      description: singleUser.bio,
      hireable: null,
      location: singleUser.location,
      company: null,
      url: singleUser.url,
    })
  );
  const [promptModalOpenState, setPromptModalOpenState] = useState(false);

  useEffect(() => {
    if (userIsSelectedState) {
      usersContext.setSelectedUsersState([
        ...usersContext.selectedUsersState,
        {
          id: singleUser.screenname,
          prompt: promptTextState,
          userData: singleUser,
        },
      ]);
    } else {
      const newArrayOfSelectedUsers = usersContext.selectedUsersState.filter(
        (user) => user.id !== singleUser.screenname
      );
      usersContext.setSelectedUsersState(newArrayOfSelectedUsers);
    }
  }, [userIsSelectedState]);

  return (
    <tr>
      <td>
        <Checkbox
          checked={userIsSelectedState}
          onChange={(event) => setUserIsSelected(event.target.checked)}
        />
      </td>
      <td>{singleUser.screenname}</td>
      <td>{singleUser.bio}</td>
      <td>{singleUser.followers}</td>
      <td>{singleUser.location}</td>
      <td>{singleUser.name}</td>
      <td>{singleUser.url}</td>
      <td>{R.path(["verified"], singleUser) ? "Yes" : "No"}</td>
      <td>
        <Button
          onClick={() => setPromptModalOpenState(true)}
          variant="outlined"
        >
          Prompt
        </Button>
        <Dialog
          open={promptModalOpenState}
          onClose={() => setPromptModalOpenState(false)}
        >
          <DialogTitle>CHAT GPT PROMPT</DialogTitle>
          <DialogContent style={{ width: "500px" }}>
            <TextField
              style={{ width: "100%" }}
              multiline
              minRows={5}
              value={promptTextState}
              onChange={(event) => setPromptTextState(event.target.value)}
            />
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  );
};

export default SingleTwitterRow;
