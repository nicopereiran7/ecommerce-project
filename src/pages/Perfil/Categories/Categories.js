import React, { useEffect, useState } from "react";
import ListCategories from "../../../components/User/Perfil/Categories/ListCategories";
import axios from "../../../api/axios";
import { Helmet } from "react-helmet";

export default function Categories() {
  const [categories, setCategories] = useState(null);
  const [reloadCategories, setReloadCategories] = useState(false);

  useEffect(() => {
    async function fechData() {
      await axios
        .get("/category/get-categories")
        .then((response) => {
          setCategories(response.data);
        })
        .catch((err) => console.log(err.response));
    }
    fechData();
    setReloadCategories(false);
  }, [reloadCategories]);

  return (
    <>
      <Helmet>
        <title>Mi Perfil | Categorias</title>
      </Helmet>
      <ListCategories
        categories={categories}
        setReloadCategories={setReloadCategories}
      />
    </>
  );
}
