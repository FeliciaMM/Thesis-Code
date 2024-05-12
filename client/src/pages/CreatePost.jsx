import "../pages/CSS/CreatePost.css"
import React, {useContext, useEffect} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function CreatePost() {
    let navigate = useNavigate();
    const { authState } = useContext(AuthContext); 

    const initialValues ={
        title:"",
        text:"",
    };

    useEffect(()=>{
        if(!localStorage.getItem('accessToken')){
            navigate("/login");
        }
    },[]);
    const validationSchema=Yup.object().shape({
        title: Yup.string().required(),
        text: Yup.string().required().max(5000),
    
    })

    const onSubmit=(data)=>{
        
        axios.post("http://localhost:3001/posts", data,{headers: {accessToken: localStorage.getItem('accessToken')}
    }).then((response)=>{
           navigate("/");
        });
       
    };

    



  return (
    <div className='createPostContainer'> 
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
            
            <label id='labelTitle'>Title: </label>
            <ErrorMessage name="title" component ="span"/>
            <Field 
            id="inputTitle" 
            name="title" 
            placeholder="Write a title"
            />
            <label id='labelText'>Post: </label>
            <ErrorMessage name="text" component ="span"/>
            <Field  as="textarea"
            id="inputText" 
            name="text" 
            placeholder="Write a post"
            />
            <button type="submit"> Submit Post</button>
        </Form>
        </Formik>
    </div>
  )
}

export default CreatePost