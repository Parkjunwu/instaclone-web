import React from "react";
import styled from "styled-components";

const SFormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`;
interface FormErrorPropsType {
  message?:string
}

const FormError: React.FC<FormErrorPropsType> = ({message}) => {
  return message?<SFormError>{message}</SFormError>:null
}
export default FormError;