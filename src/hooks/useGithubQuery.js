import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const useGithubQuery = () => {
  const [currentQueryState, setCurrentQueryState] = useState("");
  const [currentPageNumberState, setCurrentPageNumberState] = useState(0);
  const [queryResponseState, setQueryResponseState] = useState([]);
  const [queryCsvDataState, setQueryCsvDataState] = useState([]);
  const [queryTotalCountState, setQueryTotalCountState] = useState(0);
  const [isLoadingState, setIsLoadingState] = useState(false);

  const newQuery = async ({ pageNumber = null, query = "" } = {}) => {
    try {
      setIsLoadingState(true);
      const newQueryResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/github/new-query`,
        {
          query: query || currentQueryState,
          pageNumber: pageNumber || currentPageNumberState,
        }
      );
      setQueryResponseState(newQueryResponse.data.users);
      setQueryCsvDataState(newQueryResponse.data.csvUsers);
      setQueryTotalCountState(newQueryResponse.data.totalCount);
    } catch (error) {
      toast.error("Oops! Something went wrong!");
    } finally {
      setIsLoadingState(false);
    }
  };

  // useEffect(() => {
  //   if (currentPageNumberState) {
  //     newQuery();
  //   }
  // }, [currentPageNumberState]);

  return {
    newQuery,
    isLoadingState,
    queryResponseState,
    queryCsvDataState,
    queryTotalCountState,
    currentPageNumberState,
    setCurrentPageNumberState,
    currentQueryState,
    setCurrentQueryState,
  };
};

export default useGithubQuery;
