import React from "react";
import styled from "styled-components";

interface ISAvatarProps {
  lg?:boolean 
}
interface IAvatarProps extends ISAvatarProps{
  url?:string|null
}

const SAvatar = styled.div<ISAvatarProps>`
  width: ${props=>props.lg?"35px":"25px"};
  height: ${props=>props.lg?"35px":"25px"};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  max-width: 100%;
`;

const Avatar: React.FC<IAvatarProps> = ({url = "", lg = false,}) => {
  return <SAvatar lg={lg}>
    {url?<Img src={url}/>:null}
  </SAvatar>;
}
export default Avatar;