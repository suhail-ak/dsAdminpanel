// import "./quiz.scss";
import Box from "@mui/material/Box";
import { Button, selectClasses, Grid } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
import DashNavbar from "../../components/navbar/DashNavbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState } from "react";
import ConfigAPIURL from "../../config/ConfigAPIURL";
import APIRequest from "../../utils/APIRequest";
import isEmpty from "../../utils/isEmpty";
import Table from "./Table";
import { useLocation, useNavigate } from "react-router-dom";

const NewQuiz = () => {
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

  let quizData = null;
  if (location.state) {
    const { data } = location.state;
    quizData = data;
  }
  console.log("QuizData: ", quizData);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <DashNavbar />
        <Table data={quizData} />
      </div>
    </div>
  );
};

export default NewQuiz;
