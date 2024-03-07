import React, {useEffect, useState} from 'react'

function App() {
  const [backendData, setBackendData] = useState([{}])


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch("/api");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setBackendData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();


  }, []);

  return (
    <div>
      {/* Afișează datele primite de la backend */}
      <ul>
        {backendData.map((post, index) => (
          <div className='post'>
          
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