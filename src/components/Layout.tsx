import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Content = styled.main`
  max-width: 930px;
  width: 100%;
  margin: 0px auto;
  margin-top: 45px;
`;

const Layout:React.FC = ({children}) => {
  return <>
    <Header/>
    <Content>
      {children}
    </Content>
  </>;
}
export default Layout;