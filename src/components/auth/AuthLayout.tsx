import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;
const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;
const Footer = styled.footer`
  margin-top: 20px;
`;
const DarkModeButton = styled.span`
  cursor: pointer;
`;
const AuthLayout:React.FC = ({children}) => {
  const darkMode = useReactiveVar(darkModeVar);
  // const onClick = () => {
  //   darkModeVar(!darkMode)
  // }
  return <Container>
    <Wrapper>
      {children}
    </Wrapper>
    <Footer>
      <DarkModeButton onClick={darkMode? disableDarkMode : enableDarkMode}>
        <FontAwesomeIcon icon={darkMode? faSun:faMoon} size="lg" />
      </DarkModeButton>
    </Footer>
  </Container>;
};
export default AuthLayout;