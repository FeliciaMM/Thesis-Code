import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

function CreatePost() {

    const initialValues ={
        title:"",
        text:"",
        username: "",
    };

    const validationSchema=Yup.object().shape({
        title: Yup.string().required(),
        text: Yup.string().required().max(5000),
        username: Yup.string().min(3).max(20).required()
    })

    const onSubmit=(data)=>{
        axios.post("http://localhost:3001/posts", data).then((response)=>{
           
        });
       
    }
  return (
    <div className='createPostContainer'> 
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
            <label id='labelUsername'>Username: </label>
            <ErrorMessage name="username" component ="span"/>
            <Field  
            id="inputUsername" 
            name="username" 
            placeholder="Your username"
            />
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