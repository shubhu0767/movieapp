import "../styles/signup.css";
import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

// Creating schema
const schema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full Name is a required field")
    .min(5, "At least 5 Character is required"),
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(6, "Password must be at least 8 characters"),
});

function Signup() {
  const [user, loading, error] = useAuthState(auth);
  // console.log(data);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      console.log("loading");
    }

    if (user) {
      // console.log(user);
      navigate("/");
    }
  }, [user, loading]);

  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ fullName: "", email: "", password: "" }}
        onSubmit={(values) => {
          // Alert the input values of the form that we filled
          console.log(values);
          registerWithEmailAndPassword(
            values.fullName,
            values.email,
            values.password
          );
          alert(JSON.stringify(values));
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
          // console.log(touched)
          <div className="login">
            <div className="form">
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <span>Register</span>
                <div className="">
                  {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                  <input
                    type="text"
                    name="fullName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    placeholder="Enter Your Full Name"
                    className="form-control inp_text"
                    id="fullName"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="error">
                    {errors.fullName && touched.fullName && errors.fullName}
                  </p>
                </div>
                <div className="">
                  {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Enter email id / username"
                    className="form-control inp_text"
                    id="email"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="error">
                    {errors.email && touched.email && errors.email}
                  </p>
                </div>

                <div className="">
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
                </div>
                <div className="flex text-sm mb-5">
                  <input type="checkbox" name="" id="" required />
                  <label className=" ml-3 ">Accept Terms and conditions</label>
                </div>
                {/* Click on submit button to submit the form */}
                <button type="submit">Register</button>
              </form>
              <div className="divider">OR</div>
              <div className=" mt-5">
                <button
                  className="mt-5 cursor-pointer font-serif font-black bg-white flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    signInWithGoogle();
                  }}
                >
                  <FcGoogle className="mr-5 text-3xl" />
                  <label className="cursor-pointer text-black font-extrabold">Register with Google</label>
                </button>
              </div>
              <div className="mt-3">
                <label htmlFor="">Already have an Account? <Link to="/login" className="text-red-600">login here</Link></label>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Signup;
