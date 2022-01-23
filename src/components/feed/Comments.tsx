import { ApolloCache, DefaultContext, gql, MutationUpdaterFunction, useMutation } from "@apollo/client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import { createComment, createCommentVariables } from "../../__generated__/createComment";
import { seeFeed_seeFeed_comments } from "../../__generated__/seeFeed";
import Comment from "./Comment";

const CommentsContainer = styled.div`
  display: flex;
  
`;
const CommentCount = styled.span`
  opacity: 0.3;
  font-size: 10px;
  font-weight: 600;
  display: block;
  margin: 10px 0px;
`;

interface ICommentsProps {
  author: string;
  caption: string | null
  commentNumber: number
  comments: (seeFeed_seeFeed_comments | null)[] | null
  photoId: number
}
interface IFormType {
  payload:string
}

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($payload: String!, $photoId: Int!){
    createComment(payload:$payload, photoId:$photoId) {
      ok
      id
      error
    }
  }
`;

const Comments: React.FC<ICommentsProps> = ({author,comments,commentNumber,caption,photoId}) => {
  
  const {data:userData} = useUser();
  const {register,handleSubmit,setValue,getValues} = useForm<IFormType>()
  const [createCommentMutation,{loading}] = useMutation<createComment,createCommentVariables>(CREATE_COMMENT_MUTATION)
  const createCommentUpdate:MutationUpdaterFunction<createComment, createCommentVariables, DefaultContext, ApolloCache<any>> = (cache,result) => {
    const {payload} = getValues();
    setValue("payload","");
    // const id = result.data?.createComment.id
    if(result.data) {
      const {data:{createComment:{id,ok}}} = result;
      if(ok && userData?.me){
        // const ref = cache.readQuery({query:gqll`
        //   query QUERY{
        //     ROOT_QUERY{
        //       me
        //     }
        //   }
        // `
        // })
        const ref: {me:{__ref:string}} | null = cache.readFragment({
          id: 'ROOT_QUERY',
          fragment: gql`
            fragment MyTodos on Query {
              me
            }
          `,
        })
        console.log(ref)
        const now = Date.now() + ""
        const newComment = {
          __typename:"Comment",
          id,
          user:
          // userData?.me,
          {
            __ref:ref?.me.__ref
          },
          payload,
          isMine:true,
          createdAt:now,
          updatedAt:now,
        };
        const newCacheComment = cache.writeFragment({
          fragment:gql`
            fragment MyTodo on Comment {
              id
              user{
                __ref
              },
              payload,
              isMine,
              createdAt,
              updatedAt
            }
          `,
          data:newComment,
          
        });
        console.log(newCacheComment)
        if(newCacheComment) {
          cache.modify({
            id:`Photo:${photoId}`,
            fields:{
              comments(prev){
                return [...prev,newCacheComment];
              },
              commentNumber(prev){
                return prev+1;
              }
            }
          })
        }
      }
    }
  }
  const onValid: SubmitHandler<IFormType> = (data) => {
    const { payload } = data;
    if(loading) return;
    createCommentMutation({
      variables:{
        photoId,
        payload,
      },
      update:createCommentUpdate
      // (cache,result)=>{
      //   cache.write({
      //     query:gq`
            
      //     `,
      //     dataId:query,
      //     result:()=>cache.modify({
      //       id:`Photo:${photoId}`,
      //       fields:{
      //         comments(prev){
      //           prev.push({__ref:"Comment:3"})
      //         }
      //       }
      //     })
      //   })
        
      // }
    })
    
  }
  return (
    <div>
      <CommentsContainer>
        <Comment author={author} caption={caption}/>
      </CommentsContainer>
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
        {comments?.map(comment => (
          <Comment key={comment?.id} author={comment?.user.userName} caption={comment?.payload} id={comment?.isMine? comment?.id:null} photoId={photoId}/>
        ))}
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input ref={register({required:true})} name="payload" type="text" placeholder="Write a comment"/>
        </form>
      </div>
    </div>
  );
}
export default Comments;