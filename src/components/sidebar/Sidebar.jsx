import "./sidebar.scss";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import APIRequest from "../../utils/APIRequest";
import isEmpty from "../../utils/isEmpty";
import ConfigAPIURL from "../../config/ConfigAPIURL";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  let navigate = useNavigate();

  const logout = () => {
    APIRequest.request("GET", ConfigAPIURL.logout).then((res) => {
      if (!isEmpty(res)) {
        if (res.code === 100) {
          if (res.data.responseCode === 109) {
            navigate("/login", { replace: true });
          }
        }
      }
    });
  };
  return (
    <div className="dash-sidebar">
      <div className="dash-top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">VisualDSA</span>
        </Link>
      </div>
      <div className="dash-hr"></div>

      <div className="dash-center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          {/* users */}
          <p className="title">User Management</p>
          <Link to="/users/new" style={{ textDecoration: "none" }}>
            <li>
              <PersonAddAltIcon className="icon" />
              <span>Add New Users</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <ManageAccountsIcon className="icon" />
              <span>Manage Users</span>
            </li>
          </Link>
          {/* Quiz */}
          <p className="title">Quiz</p>
          <Link to="/quiz" style={{ textDecoration: "none" }}>
            <li>
              <DescriptionIcon className="icon" />
              <span>Add Quiz</span>
            </li>
          </Link>
          <Link to="/quiz/list" style={{ textDecoration: "none" }}>
            <li>
              <NoteAltIcon className="icon" />
              <span>Manage Quizes</span>
            </li>
          </Link>
          {/* Admin
          <p className="title">Admin</p>
          <Link to="/admin/new" style={{ textDecoration: "none" }}>
            <li>
              <AdminPanelSettingsIcon className="icon" />
              <span>Add Administrator</span>
            </li>
          </Link>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <li>
              <ManageAccountsIcon className="icon" />
              <span>Manage Administrator</span>
            </li>
          </Link> */}
          {/* <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">Profile</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          */}
          <li style={{ cursor: "pointer" }} onClick={logout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>{" "}
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
