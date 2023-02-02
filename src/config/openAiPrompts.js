const openAi = {
  ACT_AS: {
    seniorCopywriter:
      "I want you to act as a senior copywriter for a company called singularity labs. We are holding an AI event for founders, investors, and engineers. Please mention in the email tha the date of the event is February 9th from 6pm until 8pm. It will be in Canggu, in Bali, and they can participate virtually.",
    urlForFounders:
      " Please ask them to fill out the following google form if they are interested in attending: https://tinyurl.com/2uada4mf",
    urlForInvestors:
      " Please ask them to fill out the following google form if they are interested in attending: https://tinyurl.com/3ckvmdef",
  },
  JOB: {
    writeEmailIntroToDev:
      " I want you to write the first 1 or 2 sentences of an email to a developer.",
    writeEmailIntroToFounder:
      " I want you to write this email to a founder of an AI startup. You can assume that they are the founder of a tech startup in AI.",
    writeEmailIntroToInvestor:
      " I want you to write this email to an investor of AI startups. You can assume they are an investor in AI startups",
  },
  PURPOSE: {
    askThemToWorkOnAProject:
      " The purpose of this email is to ask them to work on a project we have at our incubator.",
    askThemToSendAPitchAboutTheirProduct:
      " The purpose of this email is to ask them to send a very short, 30 second pitch of who they are, and what their AI company does. We will show this pitch at our event to hundreds of people",
    askThemToSendAPitchAboutTheirFund:
      " The purpose of this email is to ask them to send a very short, 30 second pitch of who they are, and what sorts of AI ventures they invest in. We will show this pitch at our event to hundreds of people",
  },
  TONALITY: {
    friendly: " Make the tone of the writing friendly and professional.",
  },
  PROPERTIES: {
    name: (name) =>
      name
        ? ` Their name is ${name}. Make sure it is a real name if you are going to use it in the email. If it is not a real name, greet them as something generic. Also only include their first name in the email.`
        : "",
    description: (description) =>
      description
        ? ` Here is some information about the person: ${description}.`
        : "",
    hireable: (hireable) =>
      hireable
        ? hireable === true
          ? " This person is hireable."
          : " This person is not hireable."
        : "",
    location: (location) =>
      location
        ? ` This is their location: ${location}. Make sure it is a valid location on earth if you are going to include it in the email.`
        : "",
    company: (company) =>
      company
        ? ` This is the company that the person we are writing the email to is involed with: ${company}. Make sure it is a valid company if you are going to include it in the email.`
        : "",
    url: (url) =>
      url
        ? " This person has their own website, or a company website linked on their profile."
        : "",
  },
};

export default openAi;
