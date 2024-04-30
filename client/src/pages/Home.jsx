import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    const [backendData, setBackendData] = useState([{}])
    let navigate = useNavigate();

  useEffect(() => {
    
    const fetchData = async () => {
      
        const response = await fetch("http://localhost:3001/posts",{mode:'cors'});
        console.log(response);
        const data = await response.json();
        setBackendData(data);
     
    };
    fetchData();


  }, []);


  return (
        <div>
        <ul>
        {backendData.map((post, index) => (
          <div className='post'  key={index} onClick={()=>{navigate(`/post/${post.id}`)}}>
          <div className='title'>{post.title}</div>
          <div className='body'>{post.text}</div>
          <div className='username'>{post.username}</div>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Home