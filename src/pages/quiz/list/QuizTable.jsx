import "./QuizTable.scss";
import { Button, selectClasses, Grid } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "./quizSource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfigAPIURL from "../../../config/ConfigAPIURL";
import APIRequest from "../../../utils/APIRequest";
import isEmpty from "../../../utils/isEmpty";

const QuizTable = () => {
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    APIRequest.request(
      "POST",
      ConfigAPIURL.deleteQuiz,
      JSON.stringify({ quizId: id })
    ).then((res) => {
      if (!isEmpty(res)) {
        console.log(res);
        if (res.code === 100) {
          if (res.data.responseCode === 109) {
            getAllQuiz();
          }
        }
      }
    });
  };

  useEffect(() => {
    getAllQuiz();
  }, []);
  const getAllQuiz = () => {
    APIRequest.request(
      "POST",
      ConfigAPIURL.getAllQuiz,
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
              to="/quiz"
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
        <span className="line">Quiz List</span>
        <Button className="button" variant="outlined" href="/quiz">
          Add New Quiz
        </Button>
        {/* Quiz List
        <Link to="/quiz" >
        <Button variant="contained" id="sub" onClick={() => addUserDetails()}>
          Add New Quiz
        </Button>
        </Link> */}
      </div>
      <DataGrid
        getRowId={(row) => row._id}
        className="datagrid"
        rows={data}
        // columns={userColumns.concat(StatusColumn).concat(actionColumn)}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default QuizTable;
