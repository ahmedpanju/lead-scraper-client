import { useState } from "react";
import axios from "axios";

const useFetchAllFromAirtable = () => {
  const [listOfUsernamesState, setListOfUsernames] = useState([]);
  const [isLoadingState, setIsLoadingState] = useState(false);

  const fetchAll = async () => {
    try {
      setIsLoadingState(true);
      const fetchAllResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/airtable/fetch-all`
      );
      setListOfUsernames(fetchAllResponse.data);
    } catch (error) {
    } finally {
      setIsLoadingState(false);
    }
  };

  return {
    isLoadingState,
    fetchAll,
    listOfUsernamesState,
  };
};

export default useFetchAllFromAirtable;
