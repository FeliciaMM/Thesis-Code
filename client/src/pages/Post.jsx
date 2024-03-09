import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

function Post() {
    const { id } = useParams();


    useEffect(()=>{
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((promise)=>{
            
        });
    });

  return (
    <div></div>
  )
}

export default Post