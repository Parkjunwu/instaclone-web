import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import Seperator from "../components/auth/Seperator";
import FormBox from "../components/auth/FormBox";
import routes from "../routes";
import Image from "../mine/Image";
import React from "react";
import PageTitle from "../components/PageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router-dom";
import { login, loginVariables } from "../__generated__/login";

const FacebookLogin = styled.div`
  color: #385285;
  margin-top: 10px;
  span {
    margin-left: 5px;
    font-weight: 600;
  }
`;
const InstagramLogo = styled.div`
  margin-bottom: 30px;
`;

const Notification = styled.div`
  color: #2ecc71;
`;

const LOGIN_MUTATION = gql`
  mutation login($userName:String!,  $password:String!){
    login(userName:$userName, password:$password) {
      ok
      token
      error
    }
  }
`;

interface IFormProps {
  userName: string
  password: string
  result?: string
};

const Login = () => {
  const location:{state:{message?:string,userName?:string,password?:string}} = useLocation();
  const {register, handleSubmit, errors, formState,setError,clearErrors} = useForm<IFormProps>({
    mode:"onChange",
    defaultValues:{
      userName:location?.state?.userName || "",
      password:location?.state?.password || "",
      result:"",
    }
  });

  // interface DataType {
  //   login:{ok:boolean, error?:string, token?:string}
  // }

  // const onCompleted = (data:login) => {
  //   const { login : { ok, error, token } } = data;
  //   if(!ok && error) {
  //     return setError("result", {
  //       message:error
  //     })
  //   }
  //   if(token) {
  //     logUserIn(token)
  //   }
  // }
  const [login,{loading}] = useMutation<login,loginVariables>(LOGIN_MUTATION,{
    onCompleted:(data) => {
    const { login : { ok, error, token } } = data;
    if(!ok && error) {
      return setError("result", {
        message:error
      })
    }
    if(token) {
      logUserIn(token)
    }
  },
    // variables:{
    //   userName:"ssf",
    //   password:true,
    // }
  })
  const onSubmitValid:SubmitHandler<IFormProps> = (data) => {
    if(loading) return
    // const {userName,password} = getValues();
    login({
      // variables:{
      //   userName:userName,
      //   password,
      // } 얘는 밑에랑 똑같음
      variables:data,
    })
  }
  console.log(errors)
  const clearLoginError = () => {
    if(errors?.result) return clearErrors("result")
  }
  return <AuthLayout>
    <PageTitle title="Login"/>
    <FormBox>
      <Image />
      <InstagramLogo>
        {/* <FontAwesomeIcon icon={faInstagram} size="3x"/> */}
      </InstagramLogo>
      <Notification>{location?.state?.message}</Notification>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <Input ref={register({
          required:"userName is required",
          minLength:{
            value:5,
            message:"userName is longer than 5"
          },
          // validate:(currentValue)=>{
          //   const result = currentValue.includes("po")
          //   if(result) {return true}
          //   else {return "Must have po"}
          // },
          // pattern:/./g
        })} name="userName" type="text" placeholder="userName" hasError={!!errors?.userName?.message} onChange={clearLoginError}/>
        <FormError message={errors?.userName?.message} />
        <Input ref={register({
          required:"Password is required",
          minLength:{
            value:5,
            message:"Password longer than 5"
          },
        })} name="password" type="password" placeholder="Password" hasError={Boolean(errors?.password?.message)} onChange={clearLoginError}/>
        <FormError message={errors?.password?.message} />
        <Button type="submit" value={ loading ? "Loading..." : "Log In" } disabled={!formState.isValid || loading}/>
        <FormError message={errors?.result?.message} />
      </form>
      <Seperator/>
      <FacebookLogin>
      <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
      <span>Log In with Facebook</span>
      </FacebookLogin>
      {/* <a href="###">Forgot password?</a> */}
    </FormBox>
    <BottomBox cta="Don't have account?" linkText="Sign Up" link={routes.signUp}>
    </BottomBox>
  </AuthLayout>
}
export default Login;

