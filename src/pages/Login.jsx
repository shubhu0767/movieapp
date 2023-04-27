import "../styles/signup.css";
import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

// Creating schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

function Login() {
  const [user, loading, error] = useAuthState(auth);
  // console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (user) {
      console.log("Login file", user);
      navigate("/");
    }
  }, [user, loading]);

  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          // Alert the input values of the form that we filled
          // console.log(values);
          logInWithEmailAndPassword(values.email, values.password);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
            <div className="form">
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <span>Login</span>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter Email Id / Mobile Number"
                  className="form-control inp_text"
                  id="email"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.email && touched.email && errors.email}
                </p>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                {/* Click on submit button to submit the form */}
                <button type="submit">Login</button>
                <div className="text-right mt-2">
                  <Link to="/ResetPassword">forgot password</Link>
                </div>
              </form>
              <div className="divider">OR</div>
              <div className=" mt-5">
                <button
                  className="mt-5 font-serif font-black bg-white flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    signInWithGoogle();
                  }}
                >
                  {" "}
                  <FcGoogle className="mr-5 text-3xl" /> 
                  <label  className="cursor-pointer text-black font-extrabold"> Login with Google</label>
                </button>
              </div>
              <div className="mt-3">
                <label htmlFor="">Not Register Yet Click Here to <Link to="/signup" className="text-red-600">Register</Link></label>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Login;
