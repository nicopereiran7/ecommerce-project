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
import EditProductForm from "../EditProductForm";
import AddProductForm from "../AddProductForm";
import axios from "../../../../../api/axios";

import "./ListProducts.scss";

export default function ListProducts(props) {
  const { products, setReloadProducts } = props;
  const [open, setOpen] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  //DIALOG
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [productDelete, setProductDelete] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchInput, setSearchInput] = useState(null);
  const [searchProducts, setSearchProducts] = useState(null);

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

  const newProduct = () => {
    setOpenModal(true);
    setTitleModal("Nuevo Producto");
    setContentModal(
      <AddProductForm
        setReloadProducts={setReloadProducts}
        setOpenModal={setOpenModal}
      />
    );
  };

  const editProduct = (product) => {
    setOpenModal(true);
    setTitleModal("Editar Producto");
    setContentModal(
      <EditProductForm
        product={product}
        setReloadProducts={setReloadProducts}
        setOpenModal={setOpenModal}
      />
    );
  };

  const showDialog = (product) => {
    setOpenDialog(true);
    setDialogTitle("Eliminar Producto");
    setProductDelete(product);
    setDialogContent(`¿Estas seguro que desar Eliminar ${product.name}?`);
  };

  const deleteProduct = (product) => {
    axios
      .delete(`/product/${product?._id}`)
      .then((response) => {
        if (response.status === 200) {
          setOpenDialog(false);
          setReloadProducts(true);
          setOpen(true);
          setNotificationContent(response.data.message);
        }
      })
      .catch((err) => {
        setOpen(true);
        setNotificationContent(err.response.data.message);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const searchProduct = (value) => {
    setSearchInput(value);
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.subCategory.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchProducts(results);
  };

  return (
    <div className="list-products">
      <div className="list-products__header">
        <div className="left">
          <SearchBar
            onChange={(value) => searchProduct(value)}
            cancelOnEscape={true}
            placeholder="Buscar Productos"
            onCancelSearch={() => setSearchInput("")}
          />
        </div>
        <div className="right">
          <Button
            color="primary"
            variant="outlined"
            startIcon={<AddOutlinedIcon />}
            onClick={newProduct}
          >
            Nuevo Producto
          </Button>
        </div>
      </div>
      <div className="list-products__data">
        {!products ? (
          <CircularProgress color="inherit" />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Sub-Categoria</TableCell>
                  <TableCell>Peso</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Descuento</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? searchInput
                    ? searchProducts.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : products.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                  : products
                ).map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product?.name}</TableCell>
                    <TableCell>{product?.subCategory.name}</TableCell>
                    <TableCell>{`${product?.peso}${product?.type}`}</TableCell>
                    <TableCell>{product?.prize}</TableCell>
                    <TableCell>{product?.descuento}</TableCell>
                    <TableCell>{product?.stock}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => editProduct(product)}>
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton onClick={() => showDialog(product)}>
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
                      searchInput ? searchProducts.length : products.length
                    }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    labelRowsPerPage={"Productos Por Pagina"}
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
          dataDelete={productDelete}
          functionDelete={deleteProduct}
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
