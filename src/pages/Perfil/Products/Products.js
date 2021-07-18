import React, { useEffect, useState } from "react";
import ListProducts from "../../../components/User/Perfil/Products/ListProducts";
import axios from "../../../api/axios";
import { Helmet } from "react-helmet";

import "./Products.scss";

export default function Products() {
  const [products, setProducts] = useState(null);
  const [reloadProducts, setReloadProducts] = useState(false);

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
    setReloadProducts(false);
  }, [reloadProducts]);

  return (
    <>
      <Helmet>
        <title>Mi Perfil | Productos</title>
      </Helmet>
      <ListProducts products={products} setReloadProducts={setReloadProducts} />
    </>
  );
}
