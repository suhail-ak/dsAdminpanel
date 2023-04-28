import "./new.scss";
import { Button } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
import DashNavbar from "../../components/navbar/DashNavbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import ConfigAPIURL from "../../config/ConfigAPIURL";
import APIRequest from "../../utils/APIRequest";
import isEmpty from "../../utils/isEmpty";
import Form from "./index";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

const New = ({ inputs, title }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  let navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    initializeAuth();
  }, []);
  const initializeAuth = async () => {
    const response = await APIRequest.request(
      "GET",
      ConfigAPIURL.sessionValidation,
      ""
    );

    if (
      !isEmpty(response) &&
      response.code === 100 &&
      response.data.responseCode == 109
    ) {
      setIsLoading(false);
    } else {
      navigate("/login");
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  if (isLoading) {
    return <div>Loading</div>;
  }

  let userData = null;
  if (location.state) {
    const { data } = location.state;
    userData = data;
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <DashNavbar />
        <div className="top">
          <h1>{userData ? "User Edit Form" : title}</h1>
        </div>
        <div className="bottom">
          <Form data={userData} />

          <div className="right"></div>
        </div>
      </div>
    </div>
  );
};

export default New;
