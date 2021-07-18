import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
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
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../../api/axios";

import "./SubCategory.scss";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
});

function SubCategory(props) {
  const { match } = props;
  const [subCategory, setSubCategory] = useState(null);
  const [products, setProducts] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    async function fechData() {
      await axios
        .get(`/sub-category/${match?.params?.slug}`)
        .then(async (response) => {
          setSubCategory(response.data);
          await axios
            .get(`/product/sub-category/${response.data._id}`)
            .then((response) => {
              setProducts(response.data);
            })
            .catch((err) => console.log(err.response));
        })
        .catch((err) => console.log(err.response));
    }
    fechData();
  }, [match]);

  return (
    <div className="sub-category">
      {!subCategory || !products ? (
        <CircularProgress color="inherit" />
      ) : (
        <>
          <div className="sub-category__header">
            <h1>{subCategory?.name}</h1>
          </div>
          <div className="sub-category__content">
            <Grid container spacing={3} direction="row">
              {products.map((product, index) => (
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
        </>
      )}
    </div>
  );
}

export default withRouter(SubCategory);
