import { createContext, useState } from "react";

export const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const [selectedUsersState, setSelectedUsersState] = useState([]);
  const [generatedResponsesState, setGeneratedResponsesState] = useState([]);
  const [showEmailModalState, setShowEmailModal] = useState(false);

  return (
    <UsersContext.Provider
      value={{
        selectedUsersState,
        setSelectedUsersState,
        showEmailModalState,
        setShowEmailModal,
        generatedResponsesState,
        setGeneratedResponsesState,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
