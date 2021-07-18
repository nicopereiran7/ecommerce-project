import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import FastForwardIcon from "@material-ui/icons/FastForward";
import { Helmet } from "react-helmet";
import axios from "../../api/axios";

import "./Product.scss";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
});

function Product(props) {
  const { match, select } = props;
  const [product, setProduct] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function fechData() {
      await axios
        .get(`/product/${match?.params?.slug}`)
        .then(async (response) => {
          setProduct(response.data);
          await axios
            .get(`/product/sub-category/${response.data.subCategory._id}`)
            .then((response) => {
              setRelacionados(response.data);
            })
            .catch((err) => console.log(err.response));
        })
        .catch((err) => console.log(err.response));
    }
    fechData();
  }, [match]);

  return (
    <>
      <Helmet>
        <title>{product ? `Producto | ${product?.name}` : "Producto"}</title>
      </Helmet>
      <div className="product">
        <div className="product__content">
          <div className="image">
            {!product ? (
              <CircularProgress color="inherit" />
            ) : (
              <img src={product.image} alt="" />
            )}
          </div>

          {!product ? (
            <CircularProgress color="inherit" />
          ) : (
            <div className="info">
              <div className="info__content">
                <h4>{`Stock ${product.stock}`}</h4>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <h3>{`${product.peso}${product.type}`}</h3>
                <div className="prize">
                  <h1>{`${"$"}${product.prize}`}</h1>
                </div>
              </div>
              <div className="info__cart">
                <Button
                  startIcon={<AddShoppingCartIcon />}
                  variant="outlined"
                  onClick={() => select(product)}
                >
                  Añadir al Carrito
                </Button>
              </div>
              <div className="info__despacho">
                <FastForwardIcon fontSize="large" />
                <LocalShippingIcon fontSize="large" />
              </div>
            </div>
          )}
        </div>
        <div className="product__relacionados">
          <div className="title">
            <h2>
              Productos <span>Relacionados</span>
            </h2>
          </div>
          <Grid container spacing={3} direction="row">
            {relacionados.map((product, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Card className={classes.root}>
                  <Link to={`/producto/${product.slug}`}>
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
                  </Link>
                  <CardActions>
                    <IconButton>
                      <AddShoppingCartIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}

export default withRouter(Product);
