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
import EditSubCategoryForm from "../EditSubCategoryForm";
import AddSubCategoryForm from "../AddSubCategoryForm";
import axios from "../../../../../api/axios";

import "./ListSubCategories.scss";

export default function ListSubCategories(props) {
  const { subCategories, setReloadSubCategories } = props;
  const [open, setOpen] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  //DIALOG
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [subCategoryDelete, setSubCategoryDelete] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchInput, setSearchInput] = useState(null);
  const [searchSubCategories, setSearchSubCategories] = useState(null);

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

  const newSubCategory = () => {
    setOpenModal(true);
    setTitleModal("Nueva Sub-Categoria");
    setContentModal(
      <AddSubCategoryForm
        setReloadSubCategories={setReloadSubCategories}
        setOpenModal={setOpenModal}
      />
    );
  };

  const editSubCategory = (subCategory) => {
    setOpenModal(true);
    setTitleModal("Editar Sub-Categoria");
    setContentModal(
      <EditSubCategoryForm
        subCategory={subCategory}
        setReloadSubCategories={setReloadSubCategories}
        setOpenModal={setOpenModal}
      />
    );
  };

  const showDialog = (subCategory) => {
    setOpenDialog(true);
    setDialogTitle("Eliminar Sub-Categoria");
    setSubCategoryDelete(subCategory);
    setDialogContent(`¿Estas seguro que desar Eliminar ${subCategory.name}?`);
  };

  const deleteSubCategory = async (subCategory) => {
    await axios
      .delete(`/sub-category/${subCategory?._id}`)
      .then((response) => {
        setOpenDialog(false);
        setNotificationContent(response.data.message);
        setOpen(true);
        setReloadSubCategories(true);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const searchSubCategory = (value) => {
    setSearchInput(value);
    const results = subCategories.filter((subCategory) =>
      subCategory.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchSubCategories(results);
  };

  return (
    <div className="list-sub-categories">
      <div className="list-sub-categories__header">
        <div className="left">
          <SearchBar
            onChange={(value) => searchSubCategory(value)}
            cancelOnEscape={true}
            placeholder="Buscar Sub-Categoria"
            onCancelSearch={() => setSearchInput("")}
          />
        </div>
        <div className="right">
          <Button
            color="primary"
            variant="outlined"
            startIcon={<AddOutlinedIcon />}
            onClick={newSubCategory}
          >
            Nueva Sub-Categoria
          </Button>
        </div>
      </div>
      <div className="list-sub-categories__content">
        {!subCategories ? (
          <CircularProgress color="inherit" />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? searchInput
                    ? searchSubCategories.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : subCategories.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                  : subCategories
                ).map((subCategory, index) => (
                  <TableRow key={index}>
                    <TableCell>{subCategory?.name}</TableCell>
                    <TableCell>{subCategory?.category?.name}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => editSubCategory(subCategory)}>
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton onClick={() => showDialog(subCategory)}>
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
                      searchInput
                        ? searchSubCategories.length
                        : subCategories.length
                    }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    labelRowsPerPage={
                      searchInput
                        ? "Resultado de Busqueda por Pagina"
                        : "Sub-Categorias Por Pagina"
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
          dataDelete={subCategoryDelete}
          functionDelete={deleteSubCategory}
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
