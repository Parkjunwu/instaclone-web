import { useReactiveVar } from "@apollo/client"
import styled from "styled-components"
import { darkModeVar } from "../apollo"
import BlackLogo from "./pngegg.png"
import whiteLogo from "./realWhite.png"

const Images = styled.img`
  width: 70%;
  height: 70px;
`
const Image = () => {
  const darkMode = useReactiveVar(darkModeVar)
  return <Images src={darkMode?BlackLogo:whiteLogo} alt="instagram"/>
}

export default Image;