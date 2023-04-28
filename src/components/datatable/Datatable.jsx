import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import APIRequest from "../../utils/APIRequest";
import isEmpty from "../../utils/isEmpty";
import ConfigAPIURL from "../../config/ConfigAPIURL";

const Datatable = () => {
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    APIRequest.request(
      "POST",
      ConfigAPIURL.deleteUser,
      JSON.stringify({ userId: id })
    ).then((res) => {
      if (!isEmpty(res)) {
        console.log(res);
        if (res.code === 100) {
          if (res.data.responseCode === 109) {
            getAllUser();
          }
        }
      }
    });
  };

  useEffect(() => {
    getAllUser();
  }, []);
  const getAllUser = () => {
    APIRequest.request(
      "POST",
      ConfigAPIURL.getAllUser,
      JSON.stringify({})
    ).then((res) => {
      if (!isEmpty(res)) {
        console.log(res);
        if (res.code === 100) {
          if (res.data.responseCode === 109) {
            setData(res.data.rows);
          }
        }
      }
    });
  };
  // const chaneStatus = (id) => {
  //   setData(data.status="Deactive");
  // };

  // const StatusColumn  = [
  //   {
  //     field: "status",
  //     headerName: "Status",
  //     width: 200,
  //     renderCell: (params) => {
  //       return (
  //         <div className="cellAction">

  //           <div
  //             className="statusButton"
  //             // onClick={() => chaneStatus(params.row.id)}
  //           >
  //              {/* {params.row.id} */}
  //           </div>
  //         </div>
  //       );
  //     },
  //   },
  // ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to="/users/test"
              state={{ data: params.row }}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <span className="line">User List</span>
        <Button className="button" variant="outlined" href="users/new">
          Add New User
        </Button>
        {/* 
        <Link to="/users/new" className="link">
          Add New
        </Link> */}
      </div>
      <DataGrid
        className="datagrid"
        getRowId={(row) => row._id}
        rows={data}
        // columns={userColumns.concat(StatusColumn).concat(actionColumn)}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
