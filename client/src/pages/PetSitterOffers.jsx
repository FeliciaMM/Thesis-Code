import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function PetSitterOffers() {
    const { authState } = useContext(AuthContext); 
  
    const [backendData, setBackendData] = useState([]);
  
    let navigate = useNavigate();
  
    useEffect(() => {
      if (!localStorage.getItem('accessToken')) {
        navigate("/login");
      } else {
        const fetchData = async () => {
          const response = await fetch("http://localhost:3001/services", { mode: 'cors' });
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
          {backendData.map((serviceObject, index) => (
            <div className='post' key={index} >
              <div className='title'>{serviceObject.title}</div>
              <Link to={`/petsitter/${serviceObject.id}`} className='body'>{serviceObject.text}</Link>
              <div className='username'>{serviceObject.username}</div>
            </div>
          ))}
        </ul>
      </div>
    )
  }
  

export default PetSitterOffers