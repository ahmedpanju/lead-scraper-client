import openAi from "../config/openAiPrompts";

const convertSocialDataToPrompt = ({
  name,
  description,
  hireable,
  location,
  company,
  url,
  type,
}) => {
  return `${openAi.ACT_AS.seniorCopywriter}${
    type === "FOUNDER"
      ? openAi.ACT_AS.urlForFounders
      : openAi.ACT_AS.urlForInvestors
  }${
    type === "FOUNDER"
      ? openAi.JOB.writeEmailIntroToFounder
      : openAi.JOB.writeEmailIntroToInvestor
  }${
    type === "FOUNDER"
      ? openAi.PURPOSE.askThemToSendAPitchAboutTheirProduct
      : openAi.PURPOSE.askThemToSendAPitchAboutTheirFund
  }${openAi.PROPERTIES.name(name)}${openAi.PROPERTIES.location(
    location
  )}${openAi.PROPERTIES.url(url)}${openAi.TONALITY.friendly}`;
};

export default convertSocialDataToPrompt;
