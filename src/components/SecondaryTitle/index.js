import React from "react";

import * as Styled from "./styles";

const SecondaryTitle = ({ children, align = "center" }) => {
  return <Styled.Text align={align}>{children}</Styled.Text>;
};

export default SecondaryTitle;
