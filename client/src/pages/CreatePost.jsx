import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'

function CreatePost() {

    const initialValues ={
        title:"",
        text:"",
        username: "",
    };

    const onSubmit=(data)=>{
        console.log(data);
    }
  return (
    <div className='createPostContainer'> 
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
            <label>Title: </label>
            <Field  
            id="inputCreatePost" 
            name="title" 
            placeholder="Write a title"
            />
            <label>Post: </label>
            <Field  
            id="inputCreatePost" 
            name="text" 
            placeholder="Write a post"
            />
            <label>Username: </label>
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