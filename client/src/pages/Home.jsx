import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Home() {
  const { authState } = useContext(AuthContext); 

  const [backendData, setBackendData] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        const response = await fetch("http://localhost:3001/posts", { mode: 'cors' });
        console.log(response);
        const data = await response.json();
        setBackendData(data);
      };
      fetchData();
    }
  }, [authState, navigate]); 

  return (
    <div>
      <ul>
        {backendData.map((post, index) => (
          <div className='post' key={index} onClick={() => { navigate(`/post/${post.id}`) }}>
            <div className='title'>{post.title}</div>
            <div className='body'>{post.text}</div>
            <div className='username'>{post.username}</div>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Home;
