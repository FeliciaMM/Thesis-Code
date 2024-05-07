import React, {useContext, useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext';

function Post() {
    const { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const {authState} = useContext(AuthContext);
    let navigate = useNavigate;


    useEffect(()=>{
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response)=>{
            setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response)=>{
            setComments(response.data);
        });
    },[]);

    const addComment = ()=>{
      axios.post("http://localhost:3001/comments",{commentText:newComment ,PostId:id, 
  },
  {
      headers:{
          accessToken:localStorage.getItem("accessToken"),
      },
  }
  
  )
      .then((response)=>{
          if(response.data.error){
          console.log(response.data.error);
             
          }else{
          const commentToAdd={commentText:newComment, username: response.data.username, userId: response.data.userId}
          setComments([...comments, commentToAdd ]);
          setNewComment("");
          console.log(response.data.userId);
      }
      });
  };

    const deletePost = (id) => {
      axios
        .delete(`http://localhost:3001/posts/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
          navigate("/");
        });
    };


    const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id != id;
          })
        );
      });
  };


   
  return (
    <div className='pageOfPosts'>
        <div className='upSide'>
            <div className='postTitle'>{postObject.title}</div>
            <div className='postText'>{postObject.text}</div>
            <div className='postUsername'>{postObject.username} {authState.username === postObject.username && (
              <button
                onClick={() => {
                  deletePost(postObject.id);
                }}
              >
                {" "}
                Delete Post
              </button>
            )}
            </div>
        </div>
        <div className='downSide'>
            <div className='writeComment'> <input  id="commentInput" type="text" placeholder='Write a comment' value={newComment} onChange={(event)=>{setNewComment(event.target.value)}}/></div>
            <button id="commentButton" onClick={addComment}>Add Comment</button>
            <div className='Comments'>
                {comments.map((comment,key)=>{
                    return <div key={key} className='comment'>
                    {comment.commentText}
                    <label >Username: {comment.username}</label>
                    {authState.username === comment.username && (
                  <button
                    onClick={() => {
                      
                      deleteComment(comment.id);
                      
                    }}
                  >
                    delete comment
                  </button>
                )}
                    </div>
                })}
            </div>
        </div>
        </div>
  )
}

export default Post