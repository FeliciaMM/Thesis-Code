import React, {useContext, useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext';

function PetSitter() {
    const { id } = useParams();
    const [serviceObject, setServiceObject] = useState({});
    const {authState} = useContext(AuthContext);


    useEffect(()=>{
        axios.get(`http://localhost:3001/services/byId/${id}`).then((response)=>{
            setServiceObject(response.data);
        });
    },[id]);
   
  return (
    <div className='pageOfPosts'>
        <div className='upSide'>
            <div className='postTitle'>{serviceObject.title}</div>
            <div className='postText'>{serviceObject.text}</div>
            <div className='postUsername'>{ serviceObject.username}
</div>
        </div>
        
        </div>

  )
}

export default PetSitter