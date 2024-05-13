import "../pages/CSS/Registration.css"
import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Registration() {
  let navigate= useNavigate();
  const initialValues = {
    username: "",
    password: "",
    email:"",
    role:"user",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
    email: Yup.string().min(4).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/authentification", data).then(() => {
      console.log(data);
    });
    navigate("/login")
  };

  return (
    <div>
      <h1>Create an Account</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputCreateUsername"
            name="username"
            placeholder="(Ex. John123...)"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            
            type="password"
            id="inputCreatePassword"
            name="password"
            placeholder="Your Password..."
          />

          
          <label>Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field
            id="inputCreateEmail"
            name="email"
            placeholder="(Ex. John@email.com)"
          />
        
        <label>Role: </label>
          <Field as="select" name="role" id="inputCreateRole">
            <option value="user">User</option>
            <option value="PetWalker">Pet Walker</option>
            <option value="PetGroomer">Pet Groomer</option>
            <option value="PetSitter">Pet Sitter</option>
            <option value="Vet">Vet</option>
            <option value="Specialist">Specialist</option>
          </Field>

            
          <button type="submit"> Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;