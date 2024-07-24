import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";
import logoLogin from "../../assets/logo technopartner.png";

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    dispatch(login(values));
  };

  return (
    <div id="mobile_screen">
      <div className="form-container">
        <img src={logoLogin} alt="Logo" className="logoLogin" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field type="email" name="username" placeholder="Email" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error-message"
                />
              </div>
              <div>
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <button type="submit" disabled={loading || isSubmitting}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
