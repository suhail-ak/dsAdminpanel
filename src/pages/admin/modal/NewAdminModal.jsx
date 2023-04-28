import "./newAdminModal.scss";

import { Button } from "@mui/material";
import Form from "../index";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import ConfigAPIURL from "../../../config/ConfigAPIURL";
import APIRequest from "../../../utils/APIRequest";
import isEmpty from "../../../utils/isEmpty";
import ModalForm from "./ModalForm";

const NewAdminModal = ({ inputs, title }) => {
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
    <div className="Container">
      {/* <Navbar /> */}
      {/* <div className="top">
          <h1>{title}</h1>
        </div> */}
      <div className="formContainer">
        <ModalForm />
      </div>
    </div>
    // </div>
  );
};

export default NewAdminModal;
