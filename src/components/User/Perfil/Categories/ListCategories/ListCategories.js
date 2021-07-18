import React, { useState } from "react";
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  IconButton,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { Alert } from "@material-ui/lab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogBasic from "../../../../DialogBasic";
import ModalBasic from "../../../../ModalBasic";
import EditCategoryForm from "../EditCategoryForm";
import AddCategoryForm from "../AddCategoryForm";
import axios from "../../../../../api/axios";

import "./ListCategories.scss";

export default function ListCategories(props) {
  const { categories, setReloadCategories } = props;
  const [open, setOpen] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  //DIALOG
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [categoryDelete, setCategoryDelete] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchInput, setSearchInput] = useState(null);
  const [searchCategories, setSearchCategories] = useState(null);

  //model
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const newCategory = () => {
    setOpenModal(true);
    setTitleModal("Nueva Categoria");
    setContentModal(
      <AddCategoryForm
        setReloadCategories={setReloadCategories}
        setOpenModal={setOpenModal}
      />
    );
  };

  const editCategory = (category) => {
    setOpenModal(true);
    setTitleModal("Editar Categoria");
    setContentModal(
      <EditCategoryForm
        category={category}
        setReloadCategories={setReloadCategories}
        setOpenModal={setOpenModal}
      />
    );
  };

  const showDialog = (category) => {
    setOpenDialog(true);
    setDialogTitle("Eliminar Sub-Categoria");
    setCategoryDelete(category);
    setDialogContent(`¿Estas seguro que desar Eliminar ${category.name}?`);
  };

  const deleteCategory = (category) => {
    axios
      .delete(`/category/${category?._id}`)
      .then((response) => {
        if (response.status === 200) {
          setOpenDialog(false);
          setReloadCategories(true);
          setOpen(true);
          setNotificationContent("Categoria Eliminada");
        }
      })
      .catch((err) => console.log(err.response));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const searchCategory = (value) => {
    setSearchInput(value);
    const results = categories.filter((subCategory) =>
      subCategory.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchCategories(results);
  };

  return (
    <div className="list-categories">
      <div className="list-categories__header">
        <div className="left">
          <SearchBar
            onChange={(value) => searchCategory(value)}
            cancelOnEscape={true}
            placeholder="Buscar Categoria"
            onCancelSearch={() => setSearchInput("")}
          />
        </div>
        <div className="right">
          <Button
            color="primary"
            variant="outlined"
            startIcon={<AddOutlinedIcon />}
            onClick={newCategory}
          >
            Nueva Categoria
          </Button>
        </div>
      </div>
      <div className="list-categories__content">
        {!categories ? (
          <CircularProgress color="inherit" />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? searchInput
                    ? searchCategories.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : categories.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                  : categories
                ).map((category, index) => (
                  <TableRow key={index}>
                    <TableCell>{category?.name}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => editCategory(category)}>
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton onClick={() => showDialog(category)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      15,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={
                      searchInput ? searchCategories.length : categories.length
                    }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    labelRowsPerPage={
                      searchInput
                        ? "Resultado de Busqueda por Pagina"
                        : "Categorias Por Pagina"
                    }
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}

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
          dataDelete={categoryDelete}
          functionDelete={deleteCategory}
        />
        <ModalBasic
          openModal={openModal}
          setOpenModal={setOpenModal}
          titleModal={titleModal}
        >
          {contentModal}
        </ModalBasic>
      </div>
    </div>
  );
}
