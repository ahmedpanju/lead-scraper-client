import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useContext } from "react";

import { UsersContext } from "../../context/users";

const EmailModal = () => {
  const usersContext = useContext(UsersContext);

  return (
    <Dialog
      open={usersContext.showEmailModalState}
      onClose={() => usersContext.setShowEmailModal(false)}
    >
      <DialogTitle>Generated Emails</DialogTitle>
      <DialogContent>
        {usersContext.generatedResponsesState.map((response) => {
          return (
            <div key={response.id}>
              <h4>{response.id}</h4>
              <p>{response.generatedResponse}</p>
            </div>
          );
        })}
      </DialogContent>
    </Dialog>
  );
};

export default EmailModal;
