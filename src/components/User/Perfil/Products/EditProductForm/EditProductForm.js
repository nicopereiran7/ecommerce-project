import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import DnsIcon from "@material-ui/icons/Dns";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AddIcon from "@material-ui/icons/Add";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import StraightenIcon from "@material-ui/icons/Straighten";
import NoImage from "../../../../../assets/img/no-image.png";
import axios from "../../../../../api/axios";

import "./EditProductForm.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function EditProductForm(props) {
  const { product, setReloadProducts, setOpenModal } = props;
  const [data, setData] = useState({
    name: product.name,
    description: product.description,
    prize: product.prize,
    peso: product.peso,
    type: product.type,
    stock: product.stock,
    descuento: product.descuento,
    subCategory: product.subCategory._id,
    image: product.image,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

  const [openNotification, setOpenNotification] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    async function fechSubCategories() {
      await axios
        .get("sub-category/get-subcategories")
        .then((response) => {
          setSubCategories(response.data);
        })
        .catch((err) => console.log(err.response));
    }
    fechSubCategories();
  }, []);

  const updateProduct = (e) => {
    e.preventDefault();
    const { name, description, subCategory, prize, peso, type, stock, image } =
      data;
    if (
      !name ||
      !description ||
      !subCategory ||
      !prize ||
      !type ||
      !peso ||
      !stock ||
      !image
    ) {
      console.log(data);
      setNotificationContent("Todos los campos son obligatorios");
      setNotificationType("warning");
      setOpenNotification(true);
    } else {
      setIsLoading(true);
      axios
        .put(`/product/${product._id}`, data)
        .then((response) => {
          if (response.status === 200) {
            setNotificationContent(response.data.message);
            setNotificationType("success");
            setOpenNotification(true);
            setReloadProducts(true);
            setOpenModal(false);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setNotificationContent(err.response.data.message);
          setNotificationType("error");
          setOpenNotification(true);
        });
    }
  };

  return (
    <div className="edit-product-form">
      <form className="form" onSubmit={updateProduct}>
        <TextField
          label="Nombre del Producto"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DnsIcon />
              </InputAdornment>
            ),
          }}
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <TextField
          label="Descripcion del Producto"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DnsIcon />
              </InputAdornment>
            ),
          }}
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />

        <div className="item">
          <div className="left">
            <TextField
              type="number"
              label="Precio del Producto"
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
              }}
              value={data.prize}
              onChange={(e) => setData({ ...data, prize: e.target.value })}
            />
          </div>
          <div className="center">
            <TextField
              label="Peso del Producto"
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <StraightenIcon />
                  </InputAdornment>
                ),
              }}
              value={data.peso}
              onChange={(e) => setData({ ...data, peso: e.target.value })}
            />
          </div>
          <div className="right">
            <TextField
              select
              label="Tipo"
              helperText="Peso"
              value={data.type}
              onChange={(e) => setData({ ...data, type: e.target.value })}
              SelectProps={{ native: true }}
            >
              <option value="Kg">Kg</option>
              <option value="gr">gr</option>
              <option value="Lt">Lt</option>
            </TextField>
          </div>
        </div>
        <div>
          <TextField
            type="number"
            label="Stock del Producto"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <ArrowUpwardIcon />
                </InputAdornment>
              ),
            }}
            value={data.stock}
            onChange={(e) => setData({ ...data, stock: e.target.value })}
          />
          <TextField
            type="number"
            label="Descuento del Producto"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <AddCircleIcon />
                </InputAdornment>
              ),
            }}
            value={data.descuento}
            onChange={(e) => setData({ ...data, descuento: e.target.value })}
          />
        </div>
        <FormControl>
          <InputLabel shrink htmlFor="outlined-age-native-simple">
            Seleccione Sub-Categoria
          </InputLabel>
          <Select
            MenuProps={MenuProps}
            displayEmpty
            value={data.subCategory}
            onChange={(e) => setData({ ...data, subCategory: e.target.value })}
          >
            {subCategories.map((subCategories, index) => (
              <MenuItem key={index} value={subCategories._id}>
                {subCategories.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="image">
          <img src={data.image ? data.image : NoImage} alt="" />
          <TextField
            label="Url del Producto"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DnsIcon />
                </InputAdornment>
              ),
              placeholder: "URL",
            }}
            value={data.image}
            onChange={(e) => setData({ ...data, image: e.target.value })}
          />
        </div>
        <Button
          type="submit"
          fullWidth
          color="primary"
          variant="contained"
          startIcon={isLoading ? <CircularProgress /> : <AddIcon />}
        >
          Actualizar Producto
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
