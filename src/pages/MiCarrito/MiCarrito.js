import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Grid,
  Button,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  deleteStorage,
  getProduct,
  deleteProduct,
} from "../../utils/localStorage";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { getAccessToken } from "../../utils/auth";
import axios from "../../api/axios";

import "./MiCarrito.scss";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
});

export default function MiCarrito(props) {
  const { setReloadCarrito, user } = props;
  const [open, setOpen] = useState(false);
  const [notificationContent, setNotificationContent] = useState("");

  const [cart, setCart] = useState({
    user: user?.id,
    product: [],
    total: 0,
  });
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const pagar = async () => {
    if (!getAccessToken()) {
      setReloadCart(true);
      setReloadCarrito(true);
      deleteStorage();
    } else {
      setCart({ ...cart, user: user.id });
      cart.product = products;
      cart.total = totalCart;

      await axios
        .post("/cart/create", cart)
        .then((response) => {
          setNotificationContent(response.data.message);
          setOpen(true);
          setReloadCart(true);
          setReloadCarrito(true);
          deleteStorage();
        })
        .catch((err) => console.log(err.response));
    }
  };

  const removeProduct = useCallback((item) => {
    deleteProduct(item);
    setReloadCart(true);
    setReloadCarrito(true);
  }, []);

  useEffect(() => {
    var aux = 0;
    getProduct().map((product) => {
      aux = aux + product.prize;
    });
    setTotalCart(aux);
    setProducts(getProduct());
    setReloadCart(false);
  }, [reloadCart, setReloadCarrito]);

  return (
    <>
      <Helmet>
        <title>MINIMARKET | Mi Carrito</title>
      </Helmet>
      {products.length === 0 ? (
        <div className="sin-productos">
          <h1>No hay productos</h1>
          <div className="alert">
            <p>Agrega un producto presionando el icono</p>
            <AddShoppingCartIcon />
          </div>
        </div>
      ) : (
        <div className="mi-carrito">
          <div className="mi-carrito__products">
            <div className="pagar">
              <div className="left">
                <h2>
                  Total de Productos <span>{products.length}</span>
                </h2>
                <Button onClick={pagar}>Pagar</Button>
              </div>
              <div className="right">
                <h1>
                  Total: <span>{`${"$"}${totalCart}`}</span>
                </h1>
              </div>
            </div>
            <div className="cards">
              <Grid container spacing={3} direction="row">
                {products.map((product, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <Card className={classes.root}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="200"
                          image={product.image}
                          title={product.title}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {product.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {product.description}
                          </Typography>
                          <Typography gutterBottom variant="h5" component="h2">
                            {`${"$"}${product.prize}`}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <IconButton onClick={() => removeProduct(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {notificationContent}
        </Alert>
      </Snackbar>
    </>
  );
}
