import React from "react";
import { Button, Checkbox, TextField } from "@material-ui/core";
import { Field, FieldAttributes, Form, Formik, useField } from "formik";
import * as yup from "yup";
import "./App.css";

const validationSchema = yup.object({
  firstName: yup.string().required().max(15),
  lastName: yup.string().required().max(15),
  username: yup.string().required().max(15),
  password: yup.string().required().max(15),
  email: yup.string().required().email(),
  agreeToTerms: yup.bool().oneOf([true], "Field must be checked"),
});

const MyTextField: React.FC<{ label: string } & FieldAttributes<{}>> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      className="form-item"
      {...field}
      label={label}
      helperText={errorText}
      error={!!errorText}
      variant="outlined"
      fullWidth={true}
    />
  );
};

const App: React.FC = () => {
  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          username: "",
          password: "",
          email: "",
          agreeToTerms: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          console.log(data);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form className="form-container">
            <div className="form-item">
              <MyTextField name="firstName" label="First Name" />
              <MyTextField name="lastName" label="Last Name" />
            </div>
            <div className="form-item">
              <MyTextField name="username" label="Username" />
            </div>
            <div className="form-item">
              <MyTextField name="email" type="email" label="Email" />
            </div>
            <div className="form-item">
              <MyTextField name="password" label="Password (at most 15)" />
            </div>
            <div className="form-item">
              <Field name="agreeToTerms" type="checkbox" as={Checkbox} />
              <label>Tick the box if you agree the Terms and Conditions</label>
            </div>
            <div className="form-item">
              <Button type="submit" disabled={isSubmitting} fullWidth={true}>
                Submit
              </Button>
            </div>

            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default App;
