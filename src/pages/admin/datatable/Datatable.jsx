import * as React from "react";
import "./datatable.scss";
// import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";

import Backdrop from "@mui/material/Backdrop";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "./adminTableHeader";
import { Link } from "react-router-dom";
import { useState } from "react";
// import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NewAdminModal from "../modal/NewAdminModal";
import { productInputs, userInputs } from "../../../formSource";

const Datatable = () => {
  const [modalShow, setModalShow] = React.useState(false);

  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 1,
    p: 2,
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            {/* <div className="viewButton"> */}
            <Button
              className="viewButton"
              variant="primary"
              onClick={() => setModalShow(true)}
            >
              Edit
            </Button>

            {/* </div> */}

            {/* <div className="deleteButton"> */}

            <Button
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>

            {/* </div> */}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <span className="line">Admin List</span>
        <Button className="add-button" variant="outlined" href="/admin/new">
          Add New Admin
        </Button>
        {/* User List
        <Link to="/users/new" className="link">
          Add New Admin
        </Link> */}
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        // columns={userColumns.concat(StatusColumn).concat(actionColumn)}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />

      <div className="modal-container">
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  );
};

export default Datatable;

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      // size="lg"
      // aria-labelledby="contained-modal-title-vcenter"
      centered
      // dialogClassName="edit"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewAdminModal />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
