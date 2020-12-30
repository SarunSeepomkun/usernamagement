import React, { useState, useEffect } from "react";
// import { Link , useHistory } from 'react-router-dom';
// import { useAuth } from '../../Context/AuthContext';
import firebase from "../../../Database/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
import UserInfo from "../UserInfo/UserInfo";
import { format } from 'date-fns'

const useStyles = makeStyles({
  table: {
    Width: 350,
  },
});

function UserList() {
  // const history = useHistory();
  const [UserList, setUserList] = useState([]);
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setuserInfo] = useState(null);
  const [deleteDialog, setdeleteDialog] = useState(null);

  const fetchUserList = async () => {
    const db = firebase.firestore();
    const data = await db.collection("users").get();
    setUserList(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleCreate = () => {
    setuserInfo(null);
    handleOpen();
  };

  const handleUpdate = (data) => {
    setuserInfo(data);
    handleOpen();
  };

  const handleDelete = async () => {
    try {
      if (
        typeof userInfo !== "undefined" &&
        userInfo !== null &&
        userInfo !== ""
      ) {
        await firebase
          .firestore()
          .collection("users")
          .doc(userInfo.id)
          .delete();
        deleteDialogClose();
        fetchUserList();
      }
    } catch (error) {}
  };

  const deleteDialogOpen = (data) => {
    setuserInfo(data);
    setdeleteDialog(true);
  };

  const deleteDialogClose = () => {
    setdeleteDialog(false);
    setuserInfo(null);
  };

  return (
    <div className="container">
      UserList Page Hello
      <button id="btnadduser" className="button" onClick={handleCreate}>
        Add new User
      </button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="user-list-table">
          <TableHead>
            <TableRow>
              <TableCell align="center">username</TableCell>
              <TableCell align="center">Firstname</TableCell>
              <TableCell align="center">Lastname</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Birthday</TableCell>
              <TableCell align="center">Created date</TableCell>
              <TableCell align="center">Updated date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {UserList.map((row, index) => (
              <TableRow key={row.username}>
                <TableCell align="right">{row.username}</TableCell>
                <TableCell align="right">{row.firstname}</TableCell>
                <TableCell align="right">{row.lastname}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="center">
                  {(typeof row.birthday === 'undefined' || row.birthday === null || row.birthday === "") ? "" : row.birthday }
                </TableCell>
                <TableCell align="center">
                  {(typeof row.created_date === 'undefined' ||row.created_date === null || row.created_date === "") ? "" : format(row.created_date.toDate(),'dd/MM/yyyy HH:mm:ss') }
                </TableCell>
                <TableCell align="center">
                  {(typeof row.updated_date === 'undefined' ||row.updated_date === null || row.updated_date === "") ? "" : format(row.updated_date.toDate(),'dd/MM/yyyy HH:mm:ss') }
                </TableCell>
                <TableCell align="center">
                  <button
                    id={index}
                    className="button mx-1"
                    value={row.id}
                    onClick={() => handleUpdate(row)}
                  >
                    Edit
                  </button>
                  <button
                    id={index}
                    className="button"
                    value={row.id}
                    onClick={() => deleteDialogOpen(row)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={openModal} onClose={handleClose}>
        <UserInfo
          userInfo={userInfo}
          setuserInfo={setuserInfo}
          handleClose={handleClose}
          fetchUserList={fetchUserList}
        />
      </Modal>
      <Dialog open={deleteDialog} onClose={deleteDialogClose}>
        <DialogContent>
          <DialogContentText>
            Do you want to delete {userInfo === null ? "" : userInfo.username} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleDelete} className="button">
            Delete
          </button>
          <button onClick={deleteDialogClose} className="button">
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserList;
