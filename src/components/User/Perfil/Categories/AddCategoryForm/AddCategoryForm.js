import React, { useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import axios from "../../../../../api/axios";

import "./AddCategoryForm.scss";

export default function AddCategoryForm(props) {
  const { setReloadCategories, setOpenModal } = props;
  const [data, setData] = useState({
    name: "",
  });
  const [validate, setValidate] = useState({
    name: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  const [notificationType, setNotificationType] = useState("");

  const newCategory = (e) => {
    e.preventDefault();

    if (!data.name) {
      setValidate({ name: true });
      setNotificationType("warning");
      setNotificationContent("Todos Los campos son obligatorios");
      setOpenNotification(true);
    } else {
      setIsLoading(true);
      axios
        .post("/category/create", data)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            setReloadCategories(true);
            setNotificationType("success");
            setNotificationContent(response.data.message);
            setOpenNotification(true);
            setOpenModal(false);
          }
        })
        .catch((err) => {
          setNotificationType("warning");
          setNotificationContent(err.response.data.message);
          setOpenNotification(true);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="add-category-form">
      <form className="form" onSubmit={newCategory}>
        <TextField
          error={validate.name}
          label="Nombre de la Categoria"
          inputProps={{ name: "Seleccione Categoria" }}
          value={data.name}
          onChange={(e) => setData({ name: e.target.value })}
        />
        <Button
          type="submit"
          fullWidth
          color="primary"
          variant="contained"
          startIcon={isLoading ? <CircularProgress /> : <AddIcon />}
        >
          Crear Nueva Categoria
        </Button>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openNotification}
        autoHideDuration={4000}
        onClose={() => setOpenNotification(false)}
      >
        <Alert
          onClose={() => setOpenNotification(false)}
          severity={notificationType}
          variant="filled"
        >
          {notificationContent}
        </Alert>
      </Snackbar>
    </div>
  );
}
