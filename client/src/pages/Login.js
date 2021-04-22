import React from "react";
import { Formik, Field, Form } from "formik";
import { userService } from "../network/authentication";

import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const test = (username, password) => {
    userService.login(username, password).then(() => {
      history.push('/projects')
    });
  } 

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values) => {
          test(values)
        }}
      >
        <Form>
          <label htmlFor="username">Username</label>
          <Field id="username" name="username" placeholder="Jane" />

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
