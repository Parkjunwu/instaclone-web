import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

const BottomBoxs = styled(BaseBox)`
  text-align: center;
  padding: 20px 0px;
  a {
    font-weight:600;
    color:#0095f6;
    margin-left: 5px;
  }
`;
interface BottomBoxPropsType {
  cta:string;
  linkText:string;
  link:string;
}
const BottomBox:React.FC<BottomBoxPropsType> = ({cta, link, linkText}) => {
  return <BottomBoxs>
    <span>{cta}</span>
    <Link to={link}>{linkText}</Link>
  </BottomBoxs>
};

export default BottomBox;