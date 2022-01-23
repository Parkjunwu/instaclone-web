import styled from "styled-components";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBookmark, faComment, faHeart as SolidHeart, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FatText } from "../shared";
import Avatar from "../Avatar";
import { seeFeed, seeFeed_seeFeed } from "../../__generated__/seeFeed";
import React, { useState } from "react";
import { ApolloCache, DefaultContext, gql, MutationUpdaterFunction, useMutation } from "@apollo/client";
import { toggleLike, toggleLikeVariables } from "../../__generated__/toggleLike";
import Comments from "./Comments";
import { Link } from "react-router-dom";

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${props=>props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
  border-radius: 3px;
  margin: 0px auto;
`;
const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;
const Username = styled(FatText)`
  margin-left: 15px;
`;
const PhotoFile = styled.img`
  width: 100%;
  border: 1px solid ${props=>props.theme.borderColor};
`;
const PhotoData = styled.div`
  padding: 15px;
`;
const PhotoActions = styled.div`
 
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;
const PhotoAction = styled.div`
  margin-right: 10px;
  cursor:pointer;
`;
const Likes = styled(FatText)`
  margin-top: 10px;
  display: block;
`;


// interface IPhotoProps {
//   id:number;
//   user:seeFeed_seeFeed_user;
//   file:string;
//   isLike:boolean;
//   likes:number;
// }

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike ($id:Int!) {
    toggleLike (id:$id){
      ok
      error
    }
  }
`;

const Photo:React.FC<seeFeed_seeFeed> = ({id,user,file,likes,isLiked,comments,commentNumber,caption}) => {
  // let likes=0;
  // let isLiked=false;
  // const [likes,setLikes] = useState(0)
  // const [isLiked,setIsLiked] = useState(false)
  const updateToggleLike: MutationUpdaterFunction<toggleLike,toggleLikeVariables, DefaultContext, ApolloCache<any>>= (cache,result) => {
    const ok = result.data?.toggleLike?.ok;
    if(ok) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id:photoId,
        fields:{
          isLiked(prev) {
            return !prev
          },
          likes(prev) {
            return isLiked ? prev-1 : prev+1
          }
        }
      })
      // const cachedData:{likes:number,isLiked:boolean}|null = cache.readFragment({
      //   id:`Photo:${id}`,
      //   fragment:gql`
      //     fragment MyPhotos on Photo {
      //       likes
      //       isLiked
      //     }
      //   `,
      // })
      // const cachedLikes = cachedData?.likes;
      // const cachedIsLiked = cachedData?.isLiked;
      // // if ("ㅑㄴ"){
      // //   likes = cachedLikes;
      // //   isLiked = cachedIsLiked;
      // // }
      // console.log(likes,isLiked)
      // cache.writeFragment({
      //   id:`Photo:${id}`,
      //   fragment:gql`
      //     fragment MyPhoto on Photo {
      //       isLiked
      //       likes
      //     }
      //   `,
      //   data: {
      //     isLiked:!cachedIsLiked,
      //     likes: cachedLikes!==undefined?cachedIsLiked?cachedLikes-1:cachedLikes+1:0
      //   }
      // });
    }
    
  }

  const [toggleLikeMutation,{loading}] = useMutation<toggleLike,toggleLikeVariables>(TOGGLE_LIKE_MUTATION,{
    variables:{
      id
    },
    update:updateToggleLike
  });
  // const [nowIsLike,setNowIsLike] = useState(isLiked);
  // const [nowLikes,setNowLikes] = useState(likes);
  const onClick = () => {
    toggleLikeMutation();
    // setNowIsLike(prev => !prev)
    // setNowLikes(prev => nowIsLike?prev-1:prev+1)
  }
  return (<PhotoContainer>
      <PhotoHeader>
        <Link to={`/users/${user.userName}`}>
          <Avatar url={user.avatar} lg={true}/>
        </Link>
        <Link to={`/users/${user.userName}`}>
          <Username>{user.userName}</Username>
        </Link>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={onClick}>
                <FontAwesomeIcon style={{color:isLiked?"tomato":"inherit"}} icon={isLiked? SolidHeart: faHeart} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <PhotoAction>
              <FontAwesomeIcon icon={faBookmark} />
            </PhotoAction>
          </div>
        </PhotoActions>
        <Likes>{likes === 1?"1 like":`${likes} likes`}</Likes>
        <Comments author={user.userName} comments={comments} commentNumber={commentNumber} caption={caption} photoId={id}/>
      </PhotoData>
    </PhotoContainer>);
};

export default Photo;