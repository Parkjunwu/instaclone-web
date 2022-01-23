import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button, { BtnButton } from "../components/auth/Button";
import Input from "../components/auth/Input";
import Seperator from "../components/auth/Seperator";
import FormBox from "../components/auth/FormBox";
import routes from "../routes";
import styled from "styled-components";
import { FatLink } from "../components/shared";
import Image from "../mine/Image";
import PageTitle from "../components/PageTitle";
import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { useHistory } from "react-router-dom";
import { createAccount, createAccountVariables } from "../__generated__/createAccount";

const HeaderContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount ($firstName:String!,$lastName:String,$userName:String!,$email:String!,$password:String!) {
    createAccount (
      firstName:$firstName,
      lastName:$lastName,
      userName:$userName,
      email:$email,
      password:$password
    ){
      ok
      error
    }
  }
`
interface IFormProps {
  email:string
  firstName:string
  lastName?:string
  userName:string
  password:string
  result?:string
}

const SignUp = () => {
  const history = useHistory();
  const onClick = () => {}
  const {errors,setError,clearErrors,register,handleSubmit,formState,getValues} = useForm<IFormProps>({mode:"onChange"})
  const onCompleted = (data:createAccount) => {
    const {createAccount:{ok,error}} = data;
    if(!ok && error) {
      setError("result",{message:error});
      console.log(error);
      alert(error)
    };
    console.log(ok);
    const {userName,password,} = getValues()
    history.push(routes.home,{message:"Account created. Please Log In",userName,password});
  }
  const [createAccount,{loading}] = useMutation<createAccount,createAccountVariables>(CREATE_ACCOUNT_MUTATION,{onCompleted})
  const onSubmitValid:SubmitHandler<IFormProps> = (data) => {
    // const onSubmitValid = (data: SubmitHandler<IFormProps>) => { 이렇게 안하게 주의
    if(loading) return;
    createAccount({variables:data})
    // createAccount({variables:getValues()})
  }
  const clearCreateError = () => {
    if(errors?.result) return clearErrors("result")
  }
  return <AuthLayout>
    <PageTitle title="SignUp"/>
      <FormBox>
        <HeaderContainer>
          <Image/>
        <SubTitle>
          Sign up to see photos and videos from your friends.
        </SubTitle>
        <BtnButton onClick={onClick}>
          <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
          <span>
            Log In with Facebook
          </span>
        </BtnButton>
        </HeaderContainer>
        <Seperator/>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required:"Email is required",
              minLength:{
                value:5,
                message:"Email longer than 5"
              }
            })}
            name="email"
            type="email"
            placeholder="Email"
            onChange={clearCreateError}
            hasError={Boolean(errors?.email?.message)}
          />
          <FormError message={errors?.email?.message}/>
          <Input
            ref={register({
              required:"First Name is required",
              minLength:{
                value:5,
                message:"First Name longer than 5"
              }})}
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={clearCreateError} 
            hasError={Boolean(errors?.firstName?.message)}/>
          <FormError message={errors?.firstName?.message}/>
          <Input
            ref={register({
              // required:"Last Name is required", 
              minLength:{
                value:5,
                message:"Last Name longer than 5"
              }})}
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={clearCreateError}
            hasError={Boolean(errors?.lastName?.message)}/>
          <FormError message={errors?.lastName?.message}/>
          <Input
            ref={register({
              required:"Username is required",
              minLength:{
                value:5,
                message:"Username longer than 5"
              }
            })}
            name="userName"
            type="text"
            placeholder="Username"
            onChange={clearCreateError}
            hasError={Boolean(errors?.userName?.message)}/>
          <FormError message={errors?.userName?.message}/>
          <Input
            ref={register({
              required:"Password is required",
              minLength:{
                value:5,
                message:"Password longer than 5"
              }
            })}
            name="password"
            type="password"
            placeholder="Password"
            onChange={clearCreateError}
            hasError={Boolean(errors?.password?.message)}/>
          <FormError message={errors?.password?.message}/>
          <Button type="submit" value={loading? "Loading...":"Create Account"} disabled={!formState.isValid || loading}/>
          <FormError message={errors?.result?.message}/>
        </form>
      </FormBox>
      <BottomBox cta="Already have an account?" linkText="Log in" link={routes.home}>
      </BottomBox>
    </AuthLayout>
}
export default SignUp;

