import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button } from "@material-ui/core";
import "./App.css";

const App = () => (
  <div>
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};

        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));

          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            type="email"
            name="email"
            as={TextField}
            helperText={ErrorMessage}
          />

          <ErrorMessage name="email" component="div" />

          <Field type="password" name="password" as={TextField} />

          <ErrorMessage name="password" component="div" />

          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default App;
