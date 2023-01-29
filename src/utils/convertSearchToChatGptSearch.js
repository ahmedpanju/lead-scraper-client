const convertSearchToChatGptSearch = (query) => {
  const formattedQuery = query.toLowerCase();

  if (formattedQuery.includes("twitter")) {
    const sentence = `This is my sentence: ${query}. Convert this sentence into a search query that I can type into the twitter search box to filter for the results I'm looking for. Only return the search query, and don't include the word twitter in the final search string unless a user is querying for it. Search Query:`;
    return {
      prompt: sentence,
      path: "/twitter",
    };
  }
  if (formattedQuery.includes("github")) {
    const sentence = `This is my sentence: ${query}. Convert this sentence into a search query that I can type into the github search box to filter for the results I'm looking for. Only return the search query, and don't include the word github in the final search string unless a user is querying for it. Also make sure there is no plurals in the search. Search Query:`;
    return {
      prompt: sentence,
      path: "/github",
    };
  }
  return {
    prompt: "",
    path: "/",
  };
};

export default convertSearchToChatGptSearch;
