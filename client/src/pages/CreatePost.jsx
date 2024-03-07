import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

function CreatePost() {

    const initialValues ={
        title:"",
        text:"",
        username: "",
    };

    const validationSchema=Yup.object().shape({
        title: Yup.string().required(),
        text: Yup.string().required(),
        username: Yup.string().min(3).max(20).required()
    })

    const onSubmit=(data)=>{
        console.log(data);
    }
  return (
    <div className='createPostContainer'> 
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
            <label>Title: </label>
            <ErrorMessage name="title" component ="span"/>
            <Field  
            id="inputCreatePost" 
            name="title" 
            placeholder="Write a title"
            />
            <label>Post: </label>
            <ErrorMessage name="text" component ="span"/>
            <Field  
            id="inputCreatePost" 
            name="text" 
            placeholder="Write a post"
            />
            <label>Username: </label>
            <ErrorMessage name="username" component ="span"/>
            <Field  
            id="inputCreatePost" 
            name="username" 
            placeholder="Your username"
            />

            <button type="submit"> Submit Post</button>
        </Form>
        </Formik>
    </div>
  )
}

export default CreatePost