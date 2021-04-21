import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { userService } from "../network/authentication";

import {useMutation} from 'react-query';

const Login = () => {

  const mutation = useMutation((user) => userService.login(user))

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values) => {
          mutation.mutate(values);
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
