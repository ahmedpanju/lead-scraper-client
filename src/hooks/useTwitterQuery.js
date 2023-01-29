import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const useTwitterQuery = () => {
  const [currentQueryState, setCurrentQueryState] = useState("");
  const [currentPageNumberState, setCurrentPageNumberState] = useState(0);
  const [queryResponseState, setQueryResponseState] = useState([]);
  const [queryTotalCountState, setQueryTotalCountState] = useState(0);
  const [isLoadingState, setIsLoadingState] = useState(false);

  const newQuery = async ({ pageNumber = null, query = "" } = {}) => {
    try {
      setIsLoadingState(true);
      const newQueryResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/twitter/new-query`,
        {
          query: query || currentQueryState,
          pageNumber: pageNumber || currentPageNumberState,
        }
      );
      setQueryResponseState(newQueryResponse.data.users);
    } catch (error) {
      toast.error("Oops! Something went wrong!");
    } finally {
      setIsLoadingState(false);
    }
  };

  return {
    newQuery,
    isLoadingState,
    currentQueryState,
    setCurrentQueryState,
    currentPageNumberState,
    setCurrentPageNumberState,
    queryResponseState,
    setQueryResponseState,
    setIsLoadingState,
    queryTotalCountState,
    setQueryTotalCountState,
  };
};

export default useTwitterQuery;
