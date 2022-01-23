import React from "react";
import styled from "styled-components";
import { FatText } from "../shared";
import sanitizeHtml from 'sanitize-html';
import { Link, useHistory } from "react-router-dom";
import routes from "../../routes";
import { ApolloCache, DefaultContext, gql, MutationUpdaterFunction, split, useMutation } from "@apollo/client";
import { DeleteComment, DeleteCommentVariables } from "../../__generated__/DeleteComment";


const CommentContainer = styled.div`
  margin-top: 10px;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
  mark {
    background-color: inherit;
    color: ${props => props.theme.accent};
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }
`;
const HighLight = styled(FatText)`
  background-color: inherit;
  color: ${props => props.theme.accent};
  cursor: pointer;
  &:hover{
    text-decoration: underline;
  }
`;
const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($id: Int!) {
  deleteComment(id: $id) {
    ok
    error
  }
}
`;

interface ICommentsProps {
  author?: string;
  caption?: string | null;
  id?:number | null;
  photoId?:number;
}

const Comment: React.FC<ICommentsProps>= ({author,caption,id,photoId}) => {
  const history = useHistory()
  // const onClick = ()=>history.push(routes.signUp)
  const comment = caption?.split(" ")?.map((word,index) => /#[\w]+/g.test(word) ? <HighLight key={index}><Link to={`/hashtags/${word}`}> {word + " "} </Link></HighLight> : word + " " );
  // caption?.split(" ")?.map((hash,index)=>{
  // if(hash.startsWith("#")) {return <HighLight key={index}><Link to={`/hashtag/${hash}`}>{hash+ " "}</Link></HighLight>} else return hash+" "}) || [];
  const [deleteCommentMutation, {loading}] = useMutation<DeleteComment,DeleteCommentVariables>(DELETE_COMMENT_MUTATION);
  const updateFn:MutationUpdaterFunction<DeleteComment, DeleteCommentVariables, DefaultContext, ApolloCache<any>> = (cache,result,{variables}) => {
    const ok = result.data?.deleteComment.ok
    if(ok && id){
      cache.evict({
        id:`Comment:${id}`
      });
      cache.modify({
        id:`Photo:${photoId}`,
        fields:{
          commentNumber(prev){
            return prev-1
          },
          comments(prev:Array<{[__ref:string]:string}>){
            const newArray:Array<{[__ref:string]:string}> = prev.filter(ref => ref.__ref !== `Comment:${id}`)
            return newArray;
          }
        }
      })
    }
  }
  const onDeleteClick = () => {
    console.log(`delete ${id}`);
    //deleteMutation
    if(id)
    deleteCommentMutation({
      variables:{
        id:id
      },
      update:updateFn
    })
    //delete component
    //delete cache, change number
  }
  return (
    <CommentContainer>
      <Link to={`/users/${author}`}>
        <FatText>
          {author}
        </FatText>
      </Link>
      <CommentCaption>
        {/* {caption} */}
        {comment}
      </CommentCaption>
      {id?<button onClick={onDeleteClick}>delete</button>:null}
    </CommentContainer>
  )
}
export default Comment;