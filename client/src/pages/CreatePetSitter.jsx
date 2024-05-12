import React, {useContext, useEffect} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function CreatePetSitter() {
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
        
        axios.post("http://localhost:3001/services/createpetsitters", data,{headers: {accessToken: localStorage.getItem('accessToken')}
    }).then((response)=>{
           navigate("/");
        });
       
    };

    



  return (
    
    <div className='createPostContainer'> 
    <div> <h1>Create a PetSitter Offer</h1></div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
            
            <label id='labelTitlePetSitter'>Title: </label>
            <ErrorMessage name="title" component ="span"/>
            <Field 
            id="inputTitlePetSitter" 
            name="title" 
            placeholder="Write a title"
            />
            <label id='labelTextPetSitter'>Post: </label>
            <ErrorMessage name="text" component ="span"/>
            <Field  as="textarea"
            id="inputTextPetSitter" 
            name="text" 
            placeholder="Write a post"
            />
            <button type="submit"> Submit Post</button>
        </Form>
        </Formik>
    </div>
  )
}

export default CreatePetSitter