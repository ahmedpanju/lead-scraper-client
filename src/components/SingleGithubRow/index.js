import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import convertSocialDataToPrompt from "../../utils/convertSocialDataToPrompt";
import { UsersContext } from "../../context/users";

const SingleGithubRow = ({
  singleUser,
  addToAirtableHook,
  shouldShowAirtableButton,
}) => {
  const [userIsSelectedState, setUserIsSelected] = useState(false);
  const usersContext = useContext(UsersContext);

  const [promptTextState, setPromptTextState] = useState(
    convertSocialDataToPrompt({
      name: singleUser.name,
      description: singleUser.bio,
      hireable: singleUser.hireable,
      location: singleUser.location,
      company: singleUser.company,
      url: singleUser.blog,
    })
  );
  const [promptModalOpenState, setPromptModalOpenState] = useState(false);

  useEffect(() => {
    if (userIsSelectedState) {
      usersContext.setSelectedUsersState([
        ...usersContext.selectedUsersState,
        {
          id: singleUser.username,
          prompt: promptTextState,
          userData: singleUser,
        },
      ]);
    } else {
      const newArrayOfSelectedUsers = usersContext.selectedUsersState.filter(
        (user) => user.id !== singleUser.username
      );
      usersContext.setSelectedUsersState(newArrayOfSelectedUsers);
    }
  }, [userIsSelectedState]);

  return (
    <tr key={singleUser.username}>
      <td>
        <Checkbox
          checked={userIsSelectedState}
          onChange={(event) => setUserIsSelected(event.target.checked)}
        />
      </td>
      <td>{singleUser.name}</td>
      <td>{singleUser.username}</td>
      <td>{singleUser.email}</td>
      <td>{singleUser.bio}</td>
      <td>{singleUser.hireable}</td>
      <td>{singleUser.location}</td>
      <td>{singleUser.company}</td>
      <td>
        {singleUser.twitter === null ? null : (
          <a target="_blank" href={singleUser.twitter} rel="noreferrer">
            Link
          </a>
        )}
      </td>
      <td>
        <a target="_blank" href={singleUser.githubProfile} rel="noreferrer">
          Link
        </a>
      </td>
      <td>
        {singleUser.blog === null ? null : (
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

export default SingleGithubRow;
