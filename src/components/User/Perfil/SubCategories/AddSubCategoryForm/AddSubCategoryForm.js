import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import axios from "../../../../../api/axios";

import "./AddSubCategoryForm.scss";

export default function AddSubCategoryForm(props) {
  const { setReloadSubCategories, setOpenModal } = props;
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    name: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    async function fechData() {
      await axios
        .get(`/category/get-categories`)
        .then((response) => {
          setCategories(response.data);
        })
        .catch((err) => console.log(err.response));
    }
    fechData();
  }, []);

  const newSubCategory = (e) => {
    e.preventDefault();

    if (!data.name || !data.category) {
      setOpenNotification(true);
      setNotificationType("error");
      setNotificationContent("Todos los Campos son Obligatorios");
    } else {
      setIsLoading(true);
      axios
        .post("/sub-category/create", data)
        .then((response) => {
          if (response.status === 201) {
            setReloadSubCategories(true);
            setOpenModal(false);
            setNotificationType("success");
            setOpenNotification(true);
            setNotificationContent("Sub-Categoria Creada");
            setIsLoading(false);
          }
        })
        .catch((err) => {
          if (err.response) {
            setNotificationType("warning");
            setOpenNotification(true);
            setNotificationContent(err.response.data?.message);
            setIsLoading(false);
          }
        });
    }
  };

  return (
    <div className="add-sub-category-form">
      <form className="form" onSubmit={newSubCategory}>
        <TextField
          label="Nombre de la Sub-Categoria"
          inputProps={{ name: "Seleccione Categoria" }}
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <FormControl>
          <InputLabel shrink htmlFor="outlined-age-native-simple">
            Sekeccione Categoria
          </InputLabel>
          <Select
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          color="primary"
          variant="contained"
          startIcon={isLoading ? <CircularProgress /> : <AddIcon />}
        >
          Crear Nueva Sub-Categoria
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
