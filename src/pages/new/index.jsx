import React from "react";

import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import useMediaQuery from "@mui/material/useMediaQuery";
import ConfigAPIURL from "../../config/ConfigAPIURL";
import APIRequest from "../../utils/APIRequest";
import isEmpty from "../../utils/isEmpty";
import { useNavigate } from "react-router-dom";
// import Header from "../../components/Header";

const Form = (props) => {
  const [open, setOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
  }

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    console.log(values);

    addUserDetails(values);
  };

  const addUserDetails = (inpVal) => {
    let apiUrl = ConfigAPIURL.signUp;
    let method = "POST";
    if (props.data) {
      apiUrl = ConfigAPIURL.updateUser;
      method = "PUT";
      if (isEmpty(inpVal.newPassword)) {
        delete inpVal.newPassword;
      }
    }
    // await (user);
    APIRequest.request(method, apiUrl, JSON.stringify(inpVal)).then((res) => {
      if (!isEmpty(res)) {
        console.log(res);
        if (res.code === 100) {
          if (res.data.responseCode === 109) {
            // console.log("User created.");
            setOpen(true);
            setTimeout(() => {
              navigate("/users");
            }, 1000);
            // navigate("/login", { replace: true });
            // SnackbarUtils.success(
            //   "Your account created successfully!",
            //   "bottomCenter",
            //   3000
            // ).then((notification) => props.publishNotification(notification));
          }
          if (res.data.responseCode === 114) {
            setErrorOpen(true);
            console.log(errorOpen);
            // setTimeout(() => {
            //   navigate("/users");
            // }, 1000);

            // SnackbarUtils.warn(
            //   "You are already registered. Please log in.",
            //   "bottomCenter",
            //   3000
            // ).then((notification) => props.publishNotification(notification));
          }
        }
      }
    });
  };

  return (
    <Box m="20px">
      {/* <Header title="CREATE USER" subtitle="Create a New User Profile" /> */}

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={props.data ? props.data : initialValues}
        validationSchema={props.data ? checkoutEditSchema : checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
              }}
            >
              <TextField
                fullWidth
                variant="standard"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fname}
                name="fname"
                error={!!touched.fname && !!errors.fname}
                helperText={touched.fname && errors.fname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="standard"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lname}
                name="lname"
                error={!!touched.lname && !!errors.lname}
                helperText={touched.lname && errors.lname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="standard"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="standard"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mobileNo}
                name="mobileNo"
                error={!!touched.mobileNo && !!errors.mobileNo}
                helperText={touched.mobileNo && errors.mobileNo}
                sx={{ gridColumn: "span 2" }}
              />
              {props.data ? (
                <TextField
                  fullWidth
                  variant="standard"
                  type="password"
                  label="New Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.newPassword}
                  name="newPassword"
                  error={!!touched.newPassword && !!errors.newPassword}
                  helperText={touched.newPassword && errors.newPassword}
                  sx={{ gridColumn: "span 2" }}
                />
              ) : (
                <TextField
                  fullWidth
                  variant="standard"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 2" }}
                />
              )}
              <TextField
                fullWidth
                variant="standard"
                type="password"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password1}
                name="password1"
                error={!!touched.password1 && !!errors.password1}
                helperText={touched.password1 && errors.password1}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              {/* <Button type="submit" color="secondary" variant="contained"> */}
              <Button type="submit" className="button" variant="outlined">
                {props.data ? "Update User" : "Create New User"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorOpen == true ? errorOpen : open}
        autoHideDuration={3000}
        onClose={() =>
          errorOpen === true ? setErrorOpen(false) : setOpen(false)
        }
        TransitionComponent={transition}
        // message="I love snacks"
        key={transition ? transition.name : ""}
      >
        {errorOpen == true ? (
          <Alert severity="error" sx={{ width: "100%" }}>
            User Already Exists!
          </Alert>
        ) : (
          <Alert severity="success" sx={{ width: "100%" }}>
            User Added Successfully!
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const passRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;

const checkoutSchema = yup.object().shape({
  fname: yup.string().required("required"),
  lname: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  mobileNo: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: yup
    .string()
    .matches(
      passRegExp,
      "Password must only contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password required"),

  password1: yup
    .string()
    // .required("Confirm Password required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  // password: yup.string().required("Password required"),
  // password1: yup.string().required("Confirm Password required"),
  // address1: yup.string().required("required"),
  // address2: yup.string().required("required"),
});
const checkoutEditSchema = yup.object().shape({
  fname: yup.string().required("required"),
  lname: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  mobileNo: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),

  // .required("Password required"),
  newPassword: yup
    .string()
    .matches(
      passRegExp,
      "Password must only contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
    ),
  // .required("Password required"),

  password1: yup
    .string()
    // .required("Confirm Password required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  // password: yup.string().required("Password required"),
  // password1: yup.string().required("Confirm Password required"),
  // address1: yup.string().required("required"),
  // address2: yup.string().required("required"),
});
const initialValues = {
  fname: "",
  lname: "",
  email: "",
  mobileNo: "",
  password: "",
  newPassword: "",
  password1: "",
  // address1: "",
  // address2: "",
};

export default Form;
