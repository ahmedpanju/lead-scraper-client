import React, { useEffect, useState } from "react";
import axios from "axios";
import * as R from "ramda";
import { toast } from "react-toastify";
import { Flex } from "rebass";
import { useLocation, useNavigate } from "react-router-dom";

import Title from "../../components/Title";

import * as LeadUtils from "./utils";
import * as Styled from "./styles";
import { CircularProgress } from "@mui/material";
import SecondaryTitle from "../../components/SecondaryTitle";
import LinkText from "../../components/LinkText";
import LeadDetailModal from "../../components/Lead/LeadDetailModal";
import RegularText from "../../components/RegularText";

const Lead = () => {
  const [leadDetailsModalState, setLeadDetailsModalState] = useState(false);
  const [qualityDetailsState, setQualityDetailsState] = useState({
    quality: {
      Yes: 0,
    },
  });
  const [qualityIsLoadingState, setQualityIsLoadingState] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = R.path(["state", "user"], location);

  const nameOfUser = R.pathOr("", ["name"], user);

  const determineLeadQuality = async () => {
    try {
      setQualityIsLoadingState(true);
      const qualityResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/github/lead-quality`,
        {
          username: user.username,
          followers: user.followers,
        }
      );
      setQualityDetailsState(qualityResponse.data);
    } catch (error) {
      toast.error("Oops! Something went wrong!");
    } finally {
      setQualityIsLoadingState(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      determineLeadQuality();
    }
  }, []);

  return qualityIsLoadingState ? (
    <Styled.LoadingContainer>
      <CircularProgress />
    </Styled.LoadingContainer>
  ) : (
    <Flex p="30px">
      <Styled.Container>
        <Flex flex={1} mr="20px" flexDirection="column">
          <Flex alignItems="center">
            <Flex mr="10px" alignItems="center">
              <Styled.GithubIcon
                onClick={() => window.open(user.githubProfile, "_blank")}
              />
              <Title>{nameOfUser}</Title>
            </Flex>
          </Flex>
          <Flex mt="20px">
            <Flex mr="20px">
              <Styled.CardButton onClick={() => setLeadDetailsModalState(true)}>
                <Flex
                  style={{ width: "100%" }}
                  flexDirection="column"
                  alignItems="center"
                >
                  <Styled.GraphIcon />
                  <SecondaryTitle align="center">
                    <Styled.QualityText
                      textColor={LeadUtils.getColorOfQualityText(
                        qualityDetailsState.quality.Yes * 100
                      )}
                    >
                      {qualityDetailsState.quality.Yes * 100}%
                    </Styled.QualityText>{" "}
                    Match
                  </SecondaryTitle>
                  <Flex mt="20px" alignItems="center">
                    <LinkText align="center">See why</LinkText>
                    <Styled.RightChev />
                  </Flex>
                </Flex>
              </Styled.CardButton>
            </Flex>
            <Flex ml="20px" flexDirection="column">
              <RegularText>{user.bio}</RegularText>
              {user.email && (
                <Flex mt="20px">
                  <Styled.CardButton
                    onClick={() =>
                      window.open(`mailto:${user.email}`, "_blank")
                    }
                  >
                    <Flex alignItems="center" justifyContent="center">
                      <Styled.EmailIcon />
                      <LinkText align="center">Contact</LinkText>
                      <Styled.RightChev />
                    </Flex>
                  </Styled.CardButton>
                </Flex>
              )}
            </Flex>
          </Flex>
          <LeadDetailModal
            onClose={() => setLeadDetailsModalState(false)}
            open={leadDetailsModalState}
            lead={qualityDetailsState}
          />
        </Flex>
      </Styled.Container>
    </Flex>
  );
};

export default Lead;
