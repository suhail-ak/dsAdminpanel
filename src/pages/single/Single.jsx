import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import DashNavbar from "../../components/navbar/DashNavbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { userRows } from "../../datatablesource";
import { Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import APIRequest from "../../utils/APIRequest";
import isEmpty from "../../utils/isEmpty";
import ConfigAPIURL from "../../config/ConfigAPIURL";
import { useEffect, useState } from "react";

const Single = (props) => {
  // const [userData, setUserData] = React.useState(props.data)
  const location = useLocation();
  const { data } = location.state;
  // let quizData = null;
  // if (location.state) {
  //   quizData = data;
  // }
  const [tests, setTests] = useState([]);

  useEffect(() => {
    getUserTests();
  }, []);
  const getUserTests = () => {
    APIRequest.request(
      "POST",
      ConfigAPIURL.getUserTest,
      JSON.stringify({ userId: data._id })
    ).then((res) => {
      if (!isEmpty(res)) {
        console.log(res);
        if (res.code === 100) {
          if (res.data.responseCode === 109) {
            setTests(res.data.result);
          }
        }
      }
    });
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <DashNavbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Profile</h1>
            <div className="item">
              {/* <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt=""
                className="itemImg"
              /> */}
              <div className="details">
                <h1 className="itemTitle">
                  {data.fname} {data.lname}
                </h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Contact:</span>
                  <span className="itemValue">{data.mobileNo}</span>
                </div>
                {/* <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    Pune
                  </span>
                </div> */}
                {/* <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">India</span>
                </div> */}

                <div className="editButton">
                  {/* <Box display="flex" justifyContent="start" mt="20px"> */}
                  {/* <Button type="submit" color="secondary" variant="contained">
                Edit User
              </Button> */}
                  <Button className="button" variant="outlined">
                    <Link className="link" to={"/users/new"} state={{ data }}>
                      Edit User
                    </Link>
                  </Button>
                  {/* <Button className="btn_Deactivate" variant="outlined">
                    deactivate User
                  </Button> */}
                  {/* </Box> */}
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Record ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title" style={{ color: "#6439ff" }}>
            Test Records
          </h1>
          <List data={tests} />
        </div>
      </div>
    </div>
  );
};

export default Single;
