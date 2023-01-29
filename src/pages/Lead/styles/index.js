import { TextField } from "@mui/material";
import styled from "styled-components";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import GitHubIconMui from "@mui/icons-material/GitHub";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EmailIconMui from "@mui/icons-material/Email";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
  background-color: white;
`;

export const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 50px;
  font-weight: 300;
`;

export const QualityText = styled.span`
  color: ${({ textColor }) => textColor};
`;

export const SmallerText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 25px;
  font-weight: 300;
`;

export const AiImageContainer = styled.div`
  width: 100%;
`;

export const AiImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

export const TextArea = styled(TextField)`
  && {
    width: 100%;
  }
`;

export const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GithubIcon = styled(GitHubIconMui)`
  && {
    font-size: 50px;
    margin-right: 20px;
    cursor: pointer;
  }
`;

export const CardButton = styled.div`
  width: 300px;
  padding: 30px;
  background-color: #f5f5f7;
  border-radius: 17px;
  cursor: pointer;
`;

export const GraphIcon = styled(AutoGraphIcon)`
  && {
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
  }
`;

export const RightChev = styled(ChevronRightIcon)`
  && {
    color: #0066cc;
    cursor: pointer;
  }
`;

export const EmailIcon = styled(EmailIconMui)`
  && {
    font-size: 30px;
    margin-right: 20px;
  }
`;
