import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function CreatePetSitter() {
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);

    const initialValues = {
        title: "",
        text: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        text: Yup.string().required().max(5000),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/services", data, {
            headers: { accessToken: localStorage.getItem('accessToken') }
        }).then((response) => {
            navigate("/");
        }).catch(error => {
            console.error("Error creating pet sitter offer:", error);
        });
    };

    return (
        <div className='createPostContainer'>
            <div><h1>Create a PetSitter Offer</h1></div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label htmlFor="title">Title:</label>
                    <ErrorMessage name="title" component="span" />
                    <Field type="text" id="title" name="title" placeholder="Write a title" />

                    <label htmlFor="text">Description:</label>
                    <ErrorMessage name="text" component="span" />
                    <Field as="textarea" id="text" name="text" placeholder="Write a Description" />

                    <button type="submit">Submit Post</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreatePetSitter;
