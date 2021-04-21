import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { userService } from "../network/authentication";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = ({ username, password} ) => {
    setIsLoading(true);

    userService.login(username, password).then(() => {
      console.log("Logged in");
    });

    setIsLoading(false);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values) => {
          loginUser(values)
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
