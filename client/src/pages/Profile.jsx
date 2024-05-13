import React, { useEffect, useState, useContext } from 'react';
import{useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

export default function Profile() {
  let{id} = useParams();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [listOfPosts, setlistOfPosts] = useState([]);
  const {authState} = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(null);

    useEffect(()=>{
      axios.get(`http://localhost:3001/authentification/basicinfo/${id}`).then((response) => {
        setUsername(response.data.username);
        setProfilePicture(response.data.profile_picture);
      });

      axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response)=>{
        setlistOfPosts(response.data);
      })
    },[id]);
    

  return (
    <div className='profilePageContainer'>
      <div className='basicInfo'>
        <h1>Username: {username}</h1>
        <div className='profilePictureChange'> {authState.username === username && (
              <button>
                {" "}
                Change Picture
                
              </button>
            )}
            </div>
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
