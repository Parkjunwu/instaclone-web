import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import routes from "../routes";
import Avatar from "./Avatar";

const SHeader = styled.header`
  width:100%;
  background-color: ${props=>props.theme.bgColor};
  border-bottom: 1px solid ${props=>props.theme.borderColor};
  padding: 18px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;
// color: ${props=>props.theme.fontColor};
const Wrapper = styled.div`
  max-width: 615px;
  width: 100%;
  /* height: 100%; */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Column = styled.div`
  /* height: 100%;
  display: flex;
  align-items: center;
  background-color: whitesmoke;
  margin: 0px 10px; */
`;
const Icon = styled.span`
  margin-left: 15px;
`;
const Button = styled.span`
  background-color: ${props=>props.theme.accent};
  border-radius: 4px;
  padding: 5px 15px;
  color: white;
  font-weight: 600;
`;
const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const {data} = useUser();
  return <SHeader>
    <Wrapper>
      <Column>
        <Icon>
          <Link to={routes.home}>
            <FontAwesomeIcon icon={faInstagram} size="2x"/>
          </Link>
        </Icon>
      </Column>
      <Column>
        {isLoggedIn? <IconsContainer>
          <Link to={routes.home}>
            <Icon>
              <FontAwesomeIcon icon={faHome} size="lg"/>
            </Icon>
          </Link>
          <Icon>
            <FontAwesomeIcon icon={faCompass} size="lg"/>
          </Icon>
          {/* {data?.me?.avatar? <Avatar></Avatar>:<Icon>
            <FontAwesomeIcon icon={faUser} size="lg"/>
          </Icon>} */}
          <Icon>
            <Link to={`/users/${data?.me?.userName}`}>
              <Avatar url={data?.me?.avatar}/>
            </Link>
          </Icon>
        </IconsContainer>
        :<Link to={routes.home}>
          <Button>Login</Button>
        </Link>}
      </Column>
    </Wrapper>
  </SHeader>
}
export default Header;