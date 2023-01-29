import styled from "styled-components";

const LinkText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  text-align: ${({ align = "left" }) => align};
  color: #0066cc;
  transition: 0.1s text-decoration;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default LinkText;
