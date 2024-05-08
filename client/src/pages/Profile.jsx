import React, { useEffect, useState } from 'react';
import{useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  let{id} = useParams();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [listOfPosts, setlistOfPosts] = useState([]);

    useEffect(()=>{
      axios.get(`http://localhost:3001/authentification/basicinfo/${id}`).then((response) => {
        setUsername(response.data.username);
      });

      axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response)=>{
        setlistOfPosts(response.data);
      })
    },[id]);

  return (
    <div className='profilePageContainer'>
      <div className='basicInfo'>
        <h1>Username: {username}</h1>
      </div>
      <div className='listOfPosts'>
      <div>
      <ul>
        {listOfPosts.map((post, index) => (
          <div className='post' key={index} onClick={() => { navigate(`/post/${post.id}`) }}>
            <div className='title'>{post.title}</div>
            <div className='body'>{post.text}</div>
            <div className='username'>{post.username}</div>
          </div>
        ))}
      </ul>
    </div>
      </div>
    </div>
  )
}
