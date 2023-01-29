import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import * as R from "ramda";
import { Flex } from "rebass";
import RegularText from "../../RegularText";
import SecondaryTitle from "../../SecondaryTitle";
import LinkText from "../../LinkText";

const LeadDetailModal = ({ open, onClose, lead }) => {
  const [showAllLanguagesState, setShowAllLanguagesState] = useState(false);
  const leadPercent = R.pathOr(0, ["quality", "Yes"], lead);
  const numberOfFollowers = R.pathOr(0, ["followerCount"], lead);
  const numberOfRepos = R.pathOr(0, ["repoCount"], lead);
  const languageObject = R.pathOr({}, ["languages"], lead);

  const getHighestValuePair = () => {
    const highestValue = Math.max(...Object.values(languageObject));
    const key = Object.keys(languageObject).find(
      (key) => languageObject[key] === highestValue
    );
    return [key, highestValue];
  };

  const mostUsedLanguage = getHighestValuePair();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <SecondaryTitle>{`${leadPercent * 100}`}% Match</SecondaryTitle>
      </DialogTitle>
      <DialogContent>
        <Flex flexDirection="column">
          <Flex alignItems="center" mb="10px">
            <Flex mr="10px">
              <RegularText>
                <b>Followers:</b>
              </RegularText>
            </Flex>
            <Flex>
              <RegularText>{numberOfFollowers}</RegularText>
            </Flex>
          </Flex>
          <Flex alignItems="center" mb="10px">
            <Flex mr="10px">
              <RegularText>
                <b>A.I Repos:</b>
              </RegularText>
            </Flex>
            <Flex>
              <RegularText>{numberOfRepos}</RegularText>
            </Flex>
          </Flex>
          <Flex mb="10px">
            <Flex mr="10px">
              <RegularText>
                <b>Language:</b>
              </RegularText>
            </Flex>
            <Flex>
              <RegularText>{mostUsedLanguage[0]}</RegularText>
            </Flex>
          </Flex>
          <Flex>
            <LinkText
              onClick={() => setShowAllLanguagesState(!showAllLanguagesState)}
            >
              {showAllLanguagesState ? "See less" : "See more"}
            </LinkText>
          </Flex>
          {showAllLanguagesState && (
            <Flex mt="10px" flexDirection="column">
              {Object.entries(languageObject).map((singleLanguePair) => (
                <Flex mb="10px" key={singleLanguePair[0]}>
                  <Flex mr="10px">
                    <RegularText>
                      <b>{singleLanguePair[0]}</b>
                    </RegularText>
                  </Flex>
                  <Flex>
                    <RegularText>{singleLanguePair[1]}</RegularText>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          )}
        </Flex>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailModal;
