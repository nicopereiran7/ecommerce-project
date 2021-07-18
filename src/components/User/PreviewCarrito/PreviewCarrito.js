import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { getProduct } from "../../../utils/localStorage";

import "./PreviewCarrito.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function PreviewCarrito() {
  const classes = useStyles();

  return (
    <div className="preview-carrito">
      {getProduct().length !== 0 ? (
        <div className="productos">
          <div className="productos__header">
            <h2>Mi Carrito</h2>
          </div>
          <div className="productos__data">
            {getProduct()
              .reverse()
              .map((product, index) => (
                <Card className={classes.root} key={index}>
                  <CardHeader />
                  <CardMedia
                    className={classes.media}
                    image={product.image}
                    title={product.name}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="h2"
                    >
                      {`${"$"}${product.prize}`}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
          </div>
          <div className="productos__footer">
            <Link to="/mi-carrito">
              <Button color="primary">Ver mas Detalles</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="sin-productos">
          <h3>No hay productos agregados</h3>
          <p>presione carrito para agregar productos</p>
        </div>
      )}
    </div>
  );
}
