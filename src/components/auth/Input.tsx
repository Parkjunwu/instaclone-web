import styled from "styled-components";

interface InputPropsType {
  hasError?:boolean;
}

const Input = styled.input<InputPropsType>`
  width:100%;
  border-radius: 3px;
  padding:7px;
  background-color: ${props=>props.theme.bgColor};
  border: 1px solid ${props=>props.hasError? "tomato" : props.theme.borderColor};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size:12px;
  }
  &:focus {
    /* border-color: rgb(38,38,38); */
    border-width: ${props=>props.theme.focusBorderWidth};
    border-color: ${props=>props.theme.focusBorderColor};
  }
`;

export default Input;