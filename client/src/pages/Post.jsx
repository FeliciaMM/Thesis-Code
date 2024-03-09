import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

function Post() {
    const { id } = useParams();
    const [postObject, setPostObject] = useState({});

    useEffect(()=>{
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response)=>{
            setPostObject(response.data);
        });
    });

  return (
    <div className='pageOfPosts'>
        <div className='upSide'>
            <div className='title'>{postObject.title}</div>
            <div className='text'>{postObject.text}</div>
            <div className='username'>{postObject.username}</div>
        </div>
        <div className='downSide'></div>
        </div>
  )
}

export default Post