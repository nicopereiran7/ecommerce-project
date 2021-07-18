import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";

export default function DialogBasic(props) {
  const {
    openDialog,
    setOpenDialog,
    dialogTitle,
    dialogContent,
    dataDelete,
    functionDelete,
  } = props;
  const handleClose = () => {
    setOpenDialog(false);
  };

  const borrar = () => {
    functionDelete(dataDelete);
  };

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={borrar}>
          Eliminar
        </Button>
        <Button color="primary" onClick={handleClose}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
