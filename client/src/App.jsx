import React, {useEffect, useState} from 'react'
import './App.css';

function App() {
  const [backendData, setBackendData] = useState([{}])


  useEffect(() => {
    
    const fetchData = async () => {
      
        const response = await fetch("http://localhost:3001/api",{mode:'cors'});
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
          <div className='post' key={index}>
          <div className='title'>{post.title}</div>
          <div className='body'>{post.text}</div>
          <div className='username'>{post.username}</div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;