import { TextField } from "@mui/material";
import styled from "styled-components";

export const InputContainer = styled.div`
  width: 600px;
  posiion: relative;
`;

export const SearchInput = styled(TextField)`
  && {
    font-family: "Montserrat", sans-serif;
    width: 100%;
    border: none;
    background: none;
    outline: none;
  }
`;

export const SuggestionsDrawer = styled.div`
  width: 100%;
  background-color: white;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  position: absolute;
  width: 600px;
`;

export const SuggestionsDrawerWrapper = styled.div`
  padding: 30px;
`;

export const SuggestionsDrawerTitle = styled.p`
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  margin-bottom: 10px;
  color: rgb(102, 102, 102);
`;

export const SuggestionsDrawerSuggestionContainer = styled.div`
  cursor: pointer;
  padding: 10px 0;
  padding-left: 20px;
  transition: 0.1s background-color;

  &:hover {
    background-color: rgba(242, 242, 242, 1);
  }
`;

export const SuggestionsDrawerSuggestionText = styled.p`
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
  font-weight: 400;
`;
