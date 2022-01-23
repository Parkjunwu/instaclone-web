import styled from "styled-components";

const Seperators = styled.div`
  margin: 20px 0px;
  text-transform: uppercase;
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: rgb(219,219,219);
  }
  span {
    margin: 0px 10px;
    color: #828282;
    font-weight: 600;
    font-size: 12px;
  }
`;

const Seperator = () => (
  <Seperators>
    <div></div>
    <span> OR </span>
    <div></div>
  </Seperators>
);

export default Seperator;