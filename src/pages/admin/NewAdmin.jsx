import "./newAdmin.scss";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

import Sidebar from "../../components/sidebar/Sidebar";
import DashNavbar from "../../components/navbar/DashNavbar";
//import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import ConfigAPIURL from "../../config/ConfigAPIURL";
import APIRequest from "../../utils/APIRequest";
import isEmpty from "../../utils/isEmpty";
import Form from "./index";

const NewAdmin = ({ inputs, title }) => {
  const [inpVal, setINP] = useState({
    fname: "",
    lname: "",
    email: "",
    pass: "",
  });
  const setData = (e) => {
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
    console.log(inpVal);
  };
  const addUserDetails = () => {
    // await (user);
    APIRequest.request(
      "POST",
      ConfigAPIURL.signUp,
      JSON.stringify(inpVal)
    ).then((res) => {
      if (!isEmpty(res)) {
        console.log(res);
        if (res.code === 100) {
          if (res.data.responseCode === 109) {
            console.log("User created.");
            // navigate("/login", { replace: true });
            // SnackbarUtils.success(
            //   "Your account created successfully!",
            //   "bottomCenter",
            //   3000
            // ).then((notification) => props.publishNotification(notification));
          }
          if (res.data.responseCode === 114) {
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
    <div className="newAdmin">
      <Sidebar />
      <div className="newContainerAdmin">
        <DashNavbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <Form />
          {/* <div className="left">
            <img
              src={
                file ? URL.createObjectURL(file): "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div> */}
          {/* <div className="right">
            <form>
        

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} name={input.name} onChange={setData} required/>
                </div>
              ))}
              
             
            </form>
          </div> */}
          {/* <Button variant="contained" onClick={()=>addUserDetails()}>Add Admin</Button> */}

          {/* <Button>Hi</Button> */}
        </div>
      </div>
    </div>
  );
};

export default NewAdmin;
