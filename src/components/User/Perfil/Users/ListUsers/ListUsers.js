import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  IconButton,
  Switch,
  Snackbar,
} from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import { Alert } from "@material-ui/lab";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogBasic from "../../../../DialogBasic";
import axios from "../../../../../api/axios";

import "./ListUsers.scss";

function ListUsers(props) {
  const { users, setReloadUsers } = props;
  const [open, setOpen] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  //DIALOG
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [userDelete, setUserDelete] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchInput, setSearchInput] = useState(null);
  const [searchUsers, setSearchUsers] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const editAdmin = async (e, user) => {
    const userEdit = { isAdmin: e.target.checked };
    await axios
      .put(`/user/${user._id}/edit-admin`, userEdit)
      .then((response) => {
        console.log(response);
        setNotificationContent(response.data.message);
        setOpen(true);
      })
      .catch((err) => err.response);
    setReloadUsers(true);
  };

  const showDialog = (user) => {
    setOpenDialog(true);
    setDialogTitle("Eliminar Usuario");
    setUserDelete(user);
    setDialogContent(
      `¿Estas seguro que desar Eliminar a ${user.name} ${user.lastname}?`
    );
  };

  const deleteUser = (user) => {
    axios
      .delete(`/user/${user?._id}`)
      .then((response) => {
        if (response.status === 200) {
          setOpenDialog(false);
          setReloadUsers(true);
          setOpen(true);
          setNotificationContent("Usuario Eliminado");
        }
      })
      .catch((err) => console.log(err.response));
    setReloadUsers(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const searchUser = (value) => {
    setSearchInput(value);
    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.lastname.toLowerCase().includes(value.toLowerCase()) ||
        user.direccion.toLowerCase().includes(value.toLowerCase())
    );
    setSearchUsers(results);
  };

  return (
    <div className="list-users">
      <div className="list-users__header">
        <div className="left">
          <SearchBar
            onChange={(value) => searchUser(value)}
            cancelOnEscape={true}
            placeholder="Buscar Usuario"
            onCancelSearch={() => setSearchInput("")}
          />
        </div>
        <div className="right"></div>
      </div>
      <div className="list-users__content">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Direccion</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? searchInput
                  ? searchUsers.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : users.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                : users
              ).map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{`${user.name} ${user.lastname}`}</TableCell>
                  <TableCell>{user.direccion}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isAdmin ? "Es Admin" : "No es Admin"}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={user.isAdmin}
                      onChange={(e) => editAdmin(e, user)}
                    />
                    <IconButton onClick={() => showDialog(user)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 20, 30, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={searchInput ? searchUsers.length : users.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  labelRowsPerPage={
                    searchInput
                      ? "Resultado de Busqueda por Pagina"
                      : "Usuarios Por Pagina"
                  }
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="info" variant="filled">
            {notificationContent}
          </Alert>
        </Snackbar>

        <DialogBasic
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          dialogTitle={dialogTitle}
          dialogContent={dialogContent}
          dataDelete={userDelete}
          functionDelete={deleteUser}
        />
      </div>
    </div>
  );
}

export default React.memo(ListUsers);
