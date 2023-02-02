import axios from "axios";
import * as R from "ramda";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UsersContext } from "../context/users";

const useOpenAiChat = () => {
  const usersContext = useContext(UsersContext);
  const [isLoadingState, setIsLoadingState] = useState(false);

  const newPrompt = async ({ users }) => {
    try {
      setIsLoadingState(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/openAi/new-prompt-multi`,
        {
          users,
        }
      );
      usersContext.setGeneratedResponsesState(response.data);
    } catch (error) {
      toast.error("Oops! Something went wrong!");
    } finally {
      setIsLoadingState(false);
    }
  };

  useEffect(() => {
    if (R.length(usersContext.generatedResponsesState)) {
      usersContext.setShowEmailModal(true);
    }
  }, [usersContext.generatedResponsesState]);

  return {
    isLoadingState,
    newPrompt,
  };
};

export default useOpenAiChat;
