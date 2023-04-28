import Sidebar from "../../components/sidebar/Sidebar";
import DashNavbar from "../../components/navbar/DashNavbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import APIRequest from "../../utils/APIRequest";
import isEmpty from "../../utils/isEmpty";
import ConfigAPIURL from "../../config/ConfigAPIURL";
import { useNavigate } from "react-router-dom";
import React from "react";

const Home = () => {
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
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <DashNavbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="quiz" />
          <Widget type="test" />

          {/* <Widget type="earning" />
          <Widget type="balance" /> */}
        </div>
        <div className="charts">
          {/* <Featured /> */}
          <Chart title="Last 6 Months Users " aspect={15 / 3} />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
