import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const List = (props) => {
  const [status, setStatus] = useState("Fail");
  // const rows = [
  //   {
  //     id: 12345,
  //     topic: "Bubble_Sort",
  //     date: "2022-12-31",
  //     TotalMark: 100,
  //     ObtainedMark: 85,
  //     status: "Pass",
  //   },
  //   {
  //     id: 67890,
  //     topic: "Binary Search",
  //     date: "2023-01-15",
  //     TotalMark: 100,
  //     ObtainedMark: 82,
  //     status: "Pass",
  //   },
  //   {
  //     id: 24680,
  //     topic: "Linked List",
  //     date: "2023-02-05",
  //     TotalMark: 100,
  //     ObtainedMark: 60,
  //     status: "Fail",
  //   },
  //   {
  //     id: 13579,
  //     topic: "Queue",
  //     date: "2023-03-01",
  //     TotalMark: 100,
  //     ObtainedMark: 45,
  //     status: "Fail",
  //   },
  // ];
  const userColumns = [
    // {
    //   field: "id",
    //   headerName: "Test ID",
    //   width: 70,
    //   headerClassName: "clmnHeader",
    // },
    {
      field: "category",
      headerName: "Topic",
      width: 150,
      headerClassName: "clmnHeader",
    },
    {
      field: "createdAt",
      headerName: "Date",
      width: 200,
      headerClassName: "clmnHeader",

      renderCell: (params) => {
        return new Date(params.row.createdAt * 1000).toDateString();
      },
    },

    {
      field: "totalMark",
      headerName: "Total Mark",
      headerClassName: "clmnHeader",
      width: 150,
    },
    {
      field: "marksObtained",
      headerName: "Obtained Mark",
      headerClassName: "clmnHeader",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "clmnHeader",
      width: 150,
      renderCell: (params) => {
        return (
          <div
            className={`status ${
              params.row.totalMark / params.row.marksObtained <= 2
                ? "Pass"
                : "Fail"
            }`}
          >
            {params.row.totalMark / params.row.marksObtained <= 2
              ? "Pass"
              : "Fail"}
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable1">
      <DataGrid
        className="datagrid"
        getRowId={(row) => row._id}
        rows={props.data}
        columns={userColumns}
        sx={{
          boxShadow: 2,
          textTransform: "capitalize",
          "& .MuiDataGrid-cell:hover": {
            color: " #6439ff",
            fontWeight: "900",
          },
        }}
      />

      {/* <DataGrid
    className="datagrid"
    rows={rows}
    columns={userColumns}
    pageSize={5}
    rowsPerPageOptions={[9]}
    // checkboxSelection
  /> */}
    </div>
    // <TableContainer component={Paper} className="table">
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell className="tableCell">Test ID</TableCell>
    //         {/* <TableCell className="tableCell">Name</TableCell> */}
    //         <TableCell className="tableCell">Topic</TableCell>
    //         <TableCell className="tableCell">date</TableCell>
    //         <TableCell className="tableCell">Total Mark</TableCell>
    //         <TableCell className="tableCell">Obtained Mark</TableCell>
    //         <TableCell className="tableCell">Status</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.map((row) => (
    //         <TableRow key={row.id}>
    //           <TableCell className="tableCell">{row.id}</TableCell>
    //           {/* <TableCell className="tableCell">
    //             <div className="cellWrapper">
    //               <img src={row.img} alt="" className="image" />
    //               {row.product}
    //             </div>
    //           </TableCell> */}
    //           <TableCell className="tableCell">{row.topic}</TableCell>
    //           <TableCell className="tableCell">{row.date}</TableCell>
    //           <TableCell className="tableCell">{row.TotalMark}</TableCell>
    //           <TableCell className="tableCell">{row.ObtainedMark}</TableCell>
    //           <TableCell className="tableCell">
    //             <span className={`status ${row.status}`}>{row.status}</span>
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
};

export default List;
