import React, { useEffect, useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Grid,
  FormControl,
  Select,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import DehazeIcon from "@material-ui/icons/Dehaze";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import DrawerBasic from "../../components/DrawerBasic";
import CategoryFilter from "../../components/CategoryFilter";
import axios from "../../api/axios";

import "./Comprar.scss";

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

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
});

export default function Comprar(props) {
  const { select } = props;
  const [categorias, setCategorias] = useState([]);
  const [verCategorias, setVerCategorias] = useState(false);
  const [products, setProducts] = useState(null);
  const [filter, setFilter] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const classes = useStyles();

  //drawer
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  const [productsByCategory, setProductByCategory] = useState(null);

  useEffect(() => {
    axios
      .get("/category/get-categories")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((err) => console.log(err.response));
  }, []);

  useEffect(() => {
    async function fechData() {
      await axios
        .get("/product/get-products")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((err) => console.log(err.response));
    }
    fechData();
  }, []);

  const handleCategorias = () => {
    setVerCategorias(!verCategorias);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);

    if (filter === "high") {
      products.sort((x, y) => (x.name < y.name ? 1 : -1));
    } else {
      products.sort((x, y) => (x.name > y.name ? 1 : -1));
    }
  };

  const categoryFilter = () => {
    setDrawerContent(
      <CategoryFilter
        categorias={categorias}
        setProductByCategory={setProductByCategory}
      />
    );
    setOpenDrawer(true);
  };

  const searchProduct = (value) => {
    setInputSearch(value);
    var results = [];
    if (productsByCategory) {
      results = productsByCategory.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      results = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
    }
    setSearchProducts(results);
  };

  return (
    <>
      <Helmet>
        <title>MINIMARKET | Comprar</title>
      </Helmet>
      <div className="comprar">
        <div className="comprar__banner">
          <div className="spam">
            <div className="left">
              {verCategorias ? (
                <Button
                  onClick={handleCategorias}
                  startIcon={<ExpandMoreIcon />}
                >
                  Nuestras Categorias
                </Button>
              ) : (
                <Button onClick={handleCategorias} startIcon={<DehazeIcon />}>
                  Ver Catergorias
                </Button>
              )}
            </div>
            <div className="right">
              <h4>Abierto de 08:00 - 21:00</h4>
            </div>
          </div>
          {verCategorias && (
            <div className="categories">
              {categorias.map((category, index) => (
                <Category key={index} category={category} />
              ))}
            </div>
          )}
        </div>
        <div className="comprar__content">
          <div className="filters">
            <div className="filters__left">
              <Button startIcon={<ViewComfyIcon />} onClick={categoryFilter}>
                Filtrar Por Categoria
              </Button>
            </div>
            <div className="filters__centro">
              <SearchBar
                cancelOnEscape={true}
                placeholder="Buscar Producto"
                onChange={(value) => searchProduct(value)}
              />
            </div>
            <div className="filters__right">
              <FormControl>
                <InputLabel shrink htmlFor="outlined-age-native-simple">
                  Ordenar Por
                </InputLabel>
                <Select
                  MenuProps={MenuProps}
                  displayEmpty
                  value={filter}
                  onChange={handleFilter}
                >
                  <MenuItem value="high">Ordenar A - Z</MenuItem>
                  <MenuItem value="low">Ordenar Z - A</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="list-products">
            {!products ? (
              <CircularProgress color="inherit" />
            ) : (
              <Grid container spacing={3} direction="row">
                {(inputSearch
                  ? searchProducts
                  : productsByCategory
                  ? productsByCategory
                  : products
                ).map((product, index) => (
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
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {product.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {product.description}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {`${"$"}${product.prize}`}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Link>
                      <CardActions>
                        <IconButton onClick={() => select(product)}>
                          <AddShoppingCartIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        </div>
        <DrawerBasic openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
          {drawerContent}
        </DrawerBasic>
      </div>
    </>
  );
}

function Category(props) {
  const { category } = props;
  const [subCategorias, setSubCategorias] = useState([]);
  const [anchorEl, setAnchoEl] = useState(null);

  useEffect(() => {
    async function fechData() {
      await axios
        .get(`/category/${category.slug}/sub-categories`)
        .then((response) => {
          setSubCategorias(response.data);
        })
        .catch((err) => console.log(err.response));
    }
    fechData();
  }, [category]);

  const handleClick = (e) => {
    setAnchoEl(e.currentTarget);
  };
  const close = () => {
    setAnchoEl(null);
  };

  return (
    <div className="category">
      <Button onClick={handleClick}>{category.name}</Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={close}
      >
        {subCategorias.map((subcategoria, index) => (
          <Link key={index} to={`/sub-categoria/${subcategoria.slug}`}>
            <MenuItem onClick={close}>{subcategoria.name}</MenuItem>
          </Link>
        ))}
        <Link to={`/categoria/${category.slug}`}>
          <MenuItem onClick={close}>Ver Todo</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
