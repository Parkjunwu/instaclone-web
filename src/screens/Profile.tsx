// import { gql, useQuery } from "@apollo/client";
// import { useLocation, useParams } from "react-router-dom";
// import styled from "styled-components";
// import { PHOTO_FRAGMENT } from "../fragment";
// import { seeProfile, seeProfileVariables } from "../__generated__/seeProfile";



// const Container = styled.div`
//   display: flex;
//   /* align-items: center; */
//   justify-content: center;
//   flex-direction: column;
//   max-width: 615px;
//   width:100%;
//   margin: 0px auto;
// `

// const ProfileContainer = styled.div`
//   height: 230px;
//   /* background-color: yellow; */
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-template-rows: 1fr 1fr 1fr;
//   grid-gap: 8px;
//   div:nth-child(1) {
//     grid-column: 1 / 2;
//     grid-row: 1 / 4;
//   }
//   div:nth-child(3) {
//     display: flex;
//   }
// `;

// const UserImageContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   /* background-color: saddlebrown; */
// `;

// // const UserImage = styled.div<{bg:string|undefined|null}>`
// //   background-image: url(${props => props.bg});
// // `;
// const UserImage = styled.div<{bg:string|undefined|null}>`
//   background-image: url(${props => props.bg});
//   width: 180px;
//   height: 180px;
//   border-radius: 50%;
//   background-color: wheat;
//   background-size : cover;
//   object-fit:fill;
// `;

// const TitleText = styled.div`
//   font-size: 23px;
//   font-weight: 600;
//   margin-top: auto;
// `;
// const FollowerText = styled.div`
//   font-size: 13px;
//   flex: 1;
//   margin: auto 0px;
// `;
// const BioText = styled.div`
//   font-size: 20px;
//   font-weight: 700;
//   margin-bottom: auto;
// `;

// const PhotoContainer = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr;
//   /* grid-gap: 5px; */
//   /* background-color: yellow; */
// `;
// const SinglePhotoContainer = styled.div`
  
//   /* background-color: red; */
//   width: 100%;
//   padding-bottom: 100%;
//   position: relative;
//   /* float: left; */
//   /* display: flex; */
//   /* align-items: center;
//   justify-content: center; */
//   &:hover {
//     div {
//       opacity: 0.4;
//     }
//     span {
//       opacity: 1;
//     }
//   }
// `;
// const SinglePhoto = styled.div<{bg:string|undefined|null}>`
//   background-image: url(${props => props.bg});
//   /* background-color: blue; */
//   width: 100%;
//   padding-bottom: 100%;
//   position: absolute;
//   /* left: 0;  이래해도 된다고?
//   top: 0; */
//   background-size : cover;
//   object-fit:fill;
// `;
// const HiddenLikesComments = styled.span`
//   font-size: 17px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 100%;
//   opacity: 0;
//   position: absolute;
//   /* top: 0; */
//   /* left: 0; */
//   /* right: 0;
//   bottom: 0; */
// `;

// const SEE_PROFILE_QUERY = gql`
//   query seeProfile($userName: String!) {
//     seeProfile(userName: $userName) {
//       id
//       firstName
//       lastName
//       bio
//       avatar
//       totalFollowing
//       totalFollowers
//       isFollowing
//       photos {
//         ...PhotoFragment
//       }
//       isMe
//     }
//   }
//   ${PHOTO_FRAGMENT}
// `

// const Profile = () => {
//   const {userName} = useParams<{userName:string}>();
//   const {data} = useQuery<seeProfile,seeProfileVariables>(SEE_PROFILE_QUERY,{
//     variables:{
//       userName,
//     }
//   });
//   console.log(data)
//   return <Container>
//     <ProfileContainer>
//       <UserImageContainer>
//         {data?.seeProfile?.avatar?<UserImage bg={data.seeProfile.avatar}/>:null}
//       </UserImageContainer>
//       <TitleText>{userName}</TitleText>
//       <div>
//         <FollowerText>{data?.seeProfile?.totalFollowers} Followers</FollowerText>
//         <FollowerText>{data?.seeProfile?.totalFollowing} Following</FollowerText>
//       </div>
//       <BioText>{data?.seeProfile?.bio}</BioText>
//     </ProfileContainer>
//     <PhotoContainer>
//       {data?.seeProfile?.photos ? data.seeProfile.photos.map((photo,index) => <SinglePhotoContainer key={photo?.id}><SinglePhoto bg={photo?.file}/><HiddenLikesComments>👍🏻{photo?.likes} 💬{photo?.commentNumber}</HiddenLikesComments></SinglePhotoContainer>) : null}
//     </PhotoContainer>
//   </Container>;
// }
// export default Profile;

import { ApolloCache, BaseMutationOptions, DefaultContext, gql, MutationUpdaterFunction, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HTMLAttributes } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button, { BtnButton } from "../components/auth/Button";
import PageTitle from "../components/PageTitle";
import { FatText } from "../components/shared";
import { PHOTO_FRAGMENT } from "../fragment";
import useUser from "../hooks/useUser";
import { followUser, followUserVariables } from "../__generated__/followUser";
import { seeProfile, seeProfileVariables } from "../__generated__/seeProfile";
import { unfollowUser, unfollowUserVariables } from "../__generated__/unfollowUser";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($userName: String!) {
    seeProfile(userName: $userName) {
      firstName
      lastName
      userName
      # userName 아마 codegen 에 안들어가 있을거임
      bio
      avatar
      photos {
        id
        file
        likes
        commentNumber
        isLiked
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
 `;

// ${PHOTO_FRAGMENT}
const FOLLOW_USER_MUTATION = gql`
  mutation FollowUser($userName: String!) {
    followUser(userName: $userName) {
      ok
      id
      error
    }
  }
`;
const UNFOLLOW_USER_MUTATION = gql`
  mutation UnfollowUser($userName: String!) {
    unfollowUser(userName: $userName) {
      ok
      id
      error
    }
  }
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 930px; */
  width: 615px;
  margin: 20px auto 0px auto;
`;

const Header = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  /* margin-right: 150px; */
  margin-right: 100px;
  background-color: #2c2c2c;
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display:flex;
  /* align-items: baseline; */
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;
const Grid = styled.div`
  display: grid;
  /* grid-auto-rows: 290px; */
  grid-auto-rows: 195px;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 50px;
  /* background-color: red; */
`;
const Photo = styled.div<{bg:string}>`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
`;
const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;
const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    // ...
    as?: "span"
}
const ProfileBtn = styled(Button).attrs<HeadingProps>({
  as: "span",
 })`
  margin-left: 10px;
  margin-top:0px;
  :hover {
    cursor: pointer;
  }
`;

function Profile() {
  const { userName } = useParams<{userName:string}>();
  const { data, loading } = useQuery<seeProfile,seeProfileVariables>(SEE_PROFILE_QUERY, {
    variables: {
      userName,
   },
  });
  const client = useApolloClient();
  const {data:userData} = useUser();
  const followUpdateFn:MutationUpdaterFunction<followUser, followUserVariables, DefaultContext, ApolloCache<any>> = (cache,result) => {
    if(result.data?.followUser.ok){
      cache.modify({
        id:`User:${userName}`,
        fields:{
          totalFollowers(prev){
            return prev + 1;
          },
          isFollowing(prev){
            return true;
          }
        }
      });
      cache.modify({
        id:`User:${userData?.me?.userName}`,
        fields:{
          totalFollowing(prev){
            return prev + 1;
          },
        }
      })
    }
  }
  
  const unfollowCompletedFn:((data: unfollowUser) => void) = (data) => {
    if(data.unfollowUser.ok){
      const {cache} = client;
      cache.modify({
        id:`User:${userName}`,
        fields:{
          totalFollowers(prev){
            return prev - 1;
          },
          isFollowing(prev){
            return false;
          }
        }
      });
      cache.modify({
        id:`User:${userData?.me?.userName}`,
        fields:{
          totalFollowing(prev){
            return prev - 1;
          },
        }
      })
    }
  }
  const [followUserMutataion,{data:followData}] = useMutation<followUser,followUserVariables>(FOLLOW_USER_MUTATION,{
    variables:{
      userName
    },
    update:followUpdateFn
  });
  const [unfollowUserMutataion,{data:unfollowData}] = useMutation<unfollowUser,unfollowUserVariables>(UNFOLLOW_USER_MUTATION,{
    variables:{
      userName
    },
    onCompleted:unfollowCompletedFn
  });
  const getButton = ({isMe,isFollowing}:{isMe:boolean,isFollowing:boolean}) => {
    // const {isMe,isFollowing} = profile
    if (isMe) {
      return (<ProfileBtn>Edit Profile</ProfileBtn>);
    }
    if (isFollowing){
      return (<ProfileBtn onClick={()=>unfollowUserMutataion()}>"UnFollow"</ProfileBtn>);
    } else {
      return (<ProfileBtn onClick={()=>followUserMutataion()}>"Follow"</ProfileBtn>);
    }
        
  }
   return (
     <Container>
       <PageTitle title={loading?"Loading...":`${userName}'s Profile`} />
       <Header>
         <Avatar src={data?.seeProfile?.avatar?data.seeProfile.avatar:undefined} />
         <Column>
           <Row>
             <Username>{userName}</Username>
             {/* {data?.seeProfile?.isMe?<BtnButton>Edit Profile</BtnButton>:<BtnButton>{data?.seeProfile?.isFollowing?"UnFollow":"Follow"}</BtnButton>} */}
             {data?.seeProfile? getButton(data.seeProfile) : null}
           </Row>
           <Row>
             <List>
               <Item>
                 <span>
                   <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                 </span>
               </Item>
               <Item>
                 <span>
                   <Value>{data?.seeProfile?.totalFollowing}</Value> following
                 </span>
               </Item>
             </List>
           </Row>
           <Row>
             <Name>
               {data?.seeProfile?.firstName}
               {"  "}
               {data?.seeProfile?.lastName}
             </Name>
           </Row>
           <Row>{data?.seeProfile?.bio}</Row>
         </Column>
       </Header>
       <Grid>
         {data?.seeProfile?.photos? data.seeProfile.photos.map((photo) => {
           if(photo) { return(
           <Photo bg={photo.file} key={photo.id}>
             <Icons>
               <Icon>
                 <FontAwesomeIcon icon={faHeart} />
                 {photo.likes}
               </Icon>
               <Icon>
                 <FontAwesomeIcon icon={faComment} />
                 {photo.commentNumber}
               </Icon>
             </Icons>
           </Photo>
           )} else return null;
         }):null}
       </Grid>
     </Container>
   );
 }

 export default Profile;