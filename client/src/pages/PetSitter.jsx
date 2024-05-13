import React, {useContext, useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext';

function PetSitter() {
    const { id } = useParams();
    const [petSitterObject, setPetSitterObject] = useState({});
    const {authState} = useContext(AuthContext);


    useEffect(()=>{
        axios.get(`http://localhost:3001/petsitteroffers/byId/${id}`).then((response)=>{
            setPetSitterObject(response.data);
        });
    },[id]);
   
  return (
    <div className='pageOfPosts'>
        <div className='upSide'>
            <div className='postTitle'>{petSitterObject.title}</div>
            <div className='postText'>{petSitterObject.text}</div>
            <div className='postUsername'>{ petSitterObject.username}
</div>
        </div>
        
        </div>

  )
}

export default PetSitter;