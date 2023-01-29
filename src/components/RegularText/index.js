import styled from "styled-components";

const RegularText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 25px;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  text-align: ${({ align = "left" }) => align};
`;

export default RegularText;
