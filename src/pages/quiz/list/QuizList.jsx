import "./quizList.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import DashNavbar from "../../../components/navbar/DashNavbar";
import QuizTable from "./QuizTable";
import { useNavigate } from "react-router-dom";
import APIRequest from "../../../utils/APIRequest";
import isEmpty from "../../../utils/isEmpty";
import ConfigAPIURL from "../../../config/ConfigAPIURL";
import React from "react";

const QuizList = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  let navigate = useNavigate();

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

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <DashNavbar />
        <QuizTable />
      </div>
    </div>
  );
};

export default QuizList;
