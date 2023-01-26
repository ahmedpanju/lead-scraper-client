import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useAddToAirtable = () => {
  const [isLoadingState, setIsLoadingState] = useState(false);

  const addRecord = async ({ payload }) => {
    try {
      setIsLoadingState(true);
      await axios.post(
        `${process.env.REACT_APP_API_URL}/airtable/add-record`,
        payload
      );

      toast.success("Record Added");
    } catch (error) {
      toast.error("Oops! Something went wrong!");
    } finally {
      setIsLoadingState(false);
    }
  };

  return {
    isLoadingState,
    setIsLoadingState,
    addRecord,
  };
};

export default useAddToAirtable;
