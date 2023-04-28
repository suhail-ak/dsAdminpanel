// import React from "react";
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBInput,
//   MDBIcon,
// } from "mdb-react-ui-kit";
// // import "mdb-react-ui-kit/dist/css/mdb.min.css";
// // import "@fortawesome/fontawesome-free/css/all.min.css";
// import "./login.scss";
// import { colors } from "@mui/material";

// function App() {
//   return (
//     <MDBContainer fluid>
//       <MDBRow className="d-flex justify-content-center align-items-center h-100">
//         <MDBCol col="12">
//           <MDBCard
//             className=" my-5 mx-auto"
//             style={{
//               borderRadius: "1rem",
//               maxWidth: "400px",
//               color: "#6439ff",
//             }}
//           >
//             <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
//               <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
//               <p className="text-#6439ff-50 mb-5">
//                 Please enter your login and password!
//               </p>

//               <MDBInput
//                 wrapperClass="mb-4 mx-5 w-100"
//                 labelClass="text-#6439ff"
//                 label="Email address"
//                 id="formControlLg"
//                 type="email"
//                 size="lg"
//               />
//               <MDBInput
//                 wrapperClass="mb-4 mx-5 w-100"
//                 labelClass="text-#6439ff"
//                 label="Password"
//                 id="formControlLg"
//                 type="password"
//                 size="lg"
//               />

//               <p className="small mb-3 pb-lg-2">
//                 <a class="text-#6439ff-50" href="#!">
//                   Forgot password?
//                 </a>
//               </p>
//               <MDBBtn id="loginBtn" className="mx-2 px-5" size="lg">
//                 Login
//               </MDBBtn>

//               <div className="d-flex flex-row mt-3 mb-5">
//                 <MDBBtn
//                   tag="a"
//                   color="none"
//                   className="m-3"
//                   style={{ color: "#6439ff" }}
//                 >
//                   <MDBIcon fab icon="facebook-f" size="lg" />
//                 </MDBBtn>

//                 <MDBBtn
//                   tag="a"
//                   color="none"
//                   className="m-3"
//                   style={{ color: "#6439ff" }}
//                 >
//                   <MDBIcon fab icon="twitter" size="lg" />
//                 </MDBBtn>

//                 <MDBBtn
//                   tag="a"
//                   color="none"
//                   className="m-3"
//                   style={{ color: "#6439ff" }}
//                 >
//                   <MDBIcon fab icon="google" size="lg" />
//                 </MDBBtn>
//               </div>

//               <div>
//                 <p className="mb-0">
//                   Don't have an account?{" "}
//                   <a href="#!" class="text-#6439ff-50 fw-bold">
//                     Sign Up
//                   </a>
//                 </p>
//               </div>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// }

// export default App;
import React, { useState } from "react";
import { Button, Grid, OutlinedInput, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { Link, useNavigate, useLocation } from "react-router-dom";
import APIRequest from "../../utils/APIRequest";
import ConfigAPIURL from "../../config/ConfigAPIURL";
import isEmpty from "../../utils/isEmpty";
import FormValidation from "../../utils/FormValidation";
// import { connect, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Snackbar from "@mui/material/Snackbar";

const defaultForm = {
  email: "",
  password: "",
};

const Login = (props) => {
  const [form, setForm] = useState(defaultForm);
  let navigate = useNavigate();
  let location = useLocation();

  console.log("Location", location);

  //   const dispatch = useDispatch();

  const notify = () => toast("Wow so easy !");

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });
  const { vertical, horizontal, open } = state;
  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const sendToServer = () => {
    const fieldValidation = ["email", "password"];

    FormValidation.validation(fieldValidation, form).then((validation) => {
      if (validation === true) {
        login();
      }
    });
  };

  const login = () => {
    APIRequest.request("POST", ConfigAPIURL.login, JSON.stringify(form)).then(
      (res) => {
        if (!isEmpty(res)) {
          if (res.code === 100) {
            if (res.data.responseCode === 109) {
              navigate("/");
            }
            if (res.data.responseCode === 104) {
              setForm(defaultForm);
              setState({
                ...state,
                open: true,
                message: "Invalid email or password",
              });
            }
          }
        }
      }
    );
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={2}
        sx={{
          mt: 5,
          p: 3,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: "center",
          }}
        >
          <Grid item xs={10}>
            <TextField
              id="email"
              label="Email"
              required
              value={form.email}
              onChange={(e) => {
                setForm({
                  ...form,
                  email: e.target.value,
                });
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="password"
              type={"password"}
              // step={"1"}
              required
              label={"password"}
              // placeholder="Enter your password."
              value={form.password}
              onChange={(e) => {
                setForm({
                  ...form,
                  password: e.target.value,
                });
              }}
              fullWidth
            />
          </Grid>

          <Button
            variant="contained"
            style={{ marginTop: 20 }}
            onClick={sendToServer}
          >
            Login
          </Button>

          <div>
            <button onClick={notify} style={{ display: "none" }}>
              Notify!
            </button>
            <ToastContainer />
          </div>

          <Grid
            container
            sx={{ justifyContent: "center", mb: 2, mt: 1, pl: 1 }}
          >
            <Grid
              item
              xs={2}
              sm={3}
              sx={{
                borderBottom: 1,
                borderColor: "#ccc",
              }}
            ></Grid>
            <Grid
              item
              xs={7}
              sm={5}
              sx={{
                mt: 2,
                height: 9,
                color: "#767676",
              }}
            >
              Don't have an account
            </Grid>
            <Grid
              item
              xs={2}
              sm={3}
              sx={{
                borderBottom: 1,
                borderColor: "#ccc",
              }}
            ></Grid>
          </Grid>
          {/* <Grid
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            style={{ textAlign: "center" }}
          >
            <Link to={"/signup"}>Sign up</Link>
          </Grid> */}
        </Grid>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={state.message}
        key={vertical + horizontal}
      />
    </Container>
  );
};

export default Login;
