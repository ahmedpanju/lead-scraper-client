import styled from "styled-components";

export const Text = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 40px;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  text-align: ${({ align }) => align};
`;
