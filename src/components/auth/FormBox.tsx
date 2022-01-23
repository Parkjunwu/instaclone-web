import React from "react";
import styled from "styled-components";
import { BaseBox } from "../shared";

const FormBoxs = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding:35px 40px 25px 40px;
  margin-bottom: 10px;
  form {
    /* margin-top: 30px; */
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    width:100%;
    
  }
`;

const FormBox:React.FC = ({children}) => {
  return <FormBoxs>
    {children}
  </FormBoxs>
}

export default FormBox;