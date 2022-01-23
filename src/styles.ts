import { createGlobalStyle, DefaultTheme} from "styled-components";
import {reset} from "styled-reset"

export const lightTheme: DefaultTheme = {
  accent:"#0095f6",
  bgColor:"#fafafa",
  fontColor:"rgb(38,38,38)",
  borderColor:"rgb(219,219,219)",
  focusBorderColor:"rgb(38,38,38)",
};
export const darkTheme: DefaultTheme = {
  accent:"rgb(246, 0, 238)",
  bgColor:"#2c2c2c",
  fontColor:"white",
  borderColor:"rgb(219,219,219)",
  focusBorderWidth:"2px",
}
export const GlobalStyle = createGlobalStyle`
  ${reset}
  input {
    all:unset;
  }
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${props=>props.theme.bgColor};
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    color: ${props=>props.theme.fontColor};
  } 
  main {
    all:unset;
  }
  a{
    text-decoration:none;
    color:inherit;
  }
`