const openAi = {
  ACT_AS: {
    seniorCopywriter:
      "I want you to act as a senior copywriter for an AI incubator for startups.",
  },
  JOB: {
    writeEmailIntroToDev:
      " I want you to write the first 1 or 2 sentences of an email to a developer.",
  },
  PURPOSE: {
    askThemToWorkOnAProject:
      " The purpose of this email is to ask them to work on a project we have at our incubator.",
  },
  TONALITY: {
    friendly: " Make the tone of the writing friendly.",
  },
  PROPERTIES: {
    name: (name) =>
      name
        ? ` Their name is ${name}. Make sure it is a real name if you are going to use it in the email. If it is not a real name, greet them as something generic.`
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
        ? ` This is the company that they are part of: ${company}. Make sure it is a valid company if you are going to include it in the email.`
        : "",
    url: (url) =>
      url
        ? " This person has their own website, or a company website linked on their profile."
        : "",
  },
};

export default openAi;
