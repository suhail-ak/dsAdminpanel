import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import APIRequest from "../../utils/APIRequest";
import isEmpty from "../../utils/isEmpty";
import ConfigAPIURL from "../../config/ConfigAPIURL";

const Widget = ({ type }, props) => {
  let data;
  const [userCount, setUserCount] = useState(0);
  const [testCount, setTestCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  //temporary
  const amount = 20;
  const AdminCount = 4;
  const UserCount = 56;
  const QuizCount = 5;
  const diff = Math.floor(Math.random() * 15);

  useEffect(() => {
    APIRequest.request("GET", ConfigAPIURL.getReport).then((res) => {
      if (!isEmpty(res)) {
        console.log(res);
        if (res.code === 100) {
          if (res.data.responseCode === 109) {
            setUserCount(res.data.dashboard.userCount);
            setQuizCount(res.data.dashboard.quizCount);
            setTestCount(res.data.dashboard.testCount);
          }
        }
      }
    });
  }, []);

  switch (type) {
    case "user":
      data = {
        title: "Users",
        isMoney: false,
        link: (
          <Link to="/users" style={{ textDecoration: "none" }}>
            View all users
          </Link>
        ),
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "quiz":
      data = {
        title: "Quiz",
        isMoney: false,
        link: (
          <Link to="/quiz/list" style={{ textDecoration: "none" }}>
            View all Quiz
          </Link>
        ),
        icon: (
          <QuizOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "test":
      data = {
        title: "Tests",
        isMoney: false,
        // link: (
        //   <Link to="/quiz/list" style={{ textDecoration: "none" }}>
        //     View all Quiz
        //   </Link>
        // ),
        icon: (
          <AdminPanelSettingsOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0,191,255, 0.1)",
              color: "royalblue",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.title === "Tests" && testCount}
          {data.title === "Users" && userCount}
          {data.title === "Quiz" && quizCount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {/* {data.title === "Users" && && ( */}
        <div className="percentage positive">
          {diff} %
          <KeyboardArrowUpIcon />
        </div>
        {/* )} */}

        {/* {data.title === "Quiz" && (
          <div className="percentage positive">
            <KeyboardArrowUpIcon />
          </div>
        )}

        {data.title === "Tests" && (
          <div className="percentage positive">
            <KeyboardArrowUpIcon />
          </div>
        )} */}

        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
