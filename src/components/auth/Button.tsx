import styled, { css } from "styled-components";

const csss = css`
  border:none;
  margin-top: 15px;
  background-color: ${props=>props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  border-radius: 3px;
  `

const Button = styled.input`
  ${csss}
  opacity: ${props => props.disabled?0.3:1};
`;

export const BtnButton = styled.button`
  ${csss}
  span {
    margin-left: 5px;
    font-weight: 600;
    font-size: 14px;
  }
`
// const Button= (props) => {
//   return <SButton {...props} />;
// };
// 이건 자바스크립트일때. 타입스크립트는 오류뜨네.

export default Button;