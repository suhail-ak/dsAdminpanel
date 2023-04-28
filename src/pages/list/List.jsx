import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import DashNavbar from "../../components/navbar/DashNavbar";
import Datatable from "../../components/datatable/Datatable";
import ConfigAPIURL from "../../config/ConfigAPIURL";
import APIRequest from "../../utils/APIRequest";
import isEmpty from "../../utils/isEmpty";
import React from "react";
import { useNavigate } from "react-router-dom";

const List = () => {
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
        <Datatable />
      </div>
    </div>
  );
};

export default List;
