import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragment";
import { seeFeed } from "../__generated__/seeFeed";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      id
    file
    likes
    commentNumber
    isLiked
      user {
        userName
        avatar
      }
      caption
      createdAt
      isMine
      comments{
        id
    user{
      id
      userName
      avatar
    }
    payload
    isMine
    createdAt
    updatedAt
      }
    }
  }
`;

function Home() {
  const {data} = useQuery<seeFeed>(FEED_QUERY,{
    variables:{
      offset:0
    },
  });
  //// apollo 서버에 seefeed 연결 하는거 해야하고, 화면 끝에 갔을 때 offset 바꿔서 fetchMore 로 받아옴.
  // const history = useHistory()
  return <div>
    <PageTitle title="Home | Instaclone" />
    {data?.seeFeed?.map((photo) => 
      photo && <Photo key={photo.id} {...photo}/>
    )}
  </div>
}

export default Home;