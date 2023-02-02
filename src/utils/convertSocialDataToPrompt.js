import openAi from "../config/openAiPrompts";

const convertSocialDataToPrompt = ({
  name,
  description,
  hireable,
  location,
  company,
  url,
}) => {
  return `${openAi.ACT_AS.seniorCopywriter}${openAi.JOB.writeEmailIntroToDev}${
    openAi.PURPOSE.askThemToWorkOnAProject
  }${openAi.PROPERTIES.name(name)}${openAi.PROPERTIES.description(
    description
  )}${openAi.PROPERTIES.hireable(hireable)}${openAi.PROPERTIES.location(
    location
  )}${openAi.PROPERTIES.company(company)}${openAi.PROPERTIES.url(url)}${
    openAi.TONALITY.friendly
  }`;
};

export default convertSocialDataToPrompt;
