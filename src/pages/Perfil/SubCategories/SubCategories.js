import React, { useState, useEffect } from "react";
import ListSubCategories from "../../../components/User/Perfil/SubCategories/ListSubCategories";
import axios from "../../../api/axios";
import { Helmet } from "react-helmet";

export default function SubCategories() {
  const [subCategories, setSubCategories] = useState([]);
  const [reloadSubCategories, setReloadSubCategories] = useState(false);

  useEffect(() => {
    async function fechData() {
      await axios
        .get("/sub-category/get-subcategories")
        .then((response) => {
          setSubCategories(response.data);
        })
        .catch((err) => console.log(err.response));
    }
    fechData();
    setReloadSubCategories(false);
  }, [reloadSubCategories]);

  return (
    <>
      <Helmet>
        <title>Mi Perfil | Sub-Categorias</title>
      </Helmet>
      <ListSubCategories
        subCategories={subCategories}
        setReloadSubCategories={setReloadSubCategories}
      />
    </>
  );
}
