import React, { useEffect, useState } from "react";
import ListCategories from "../../../components/User/Perfil/Categories/ListCategories";
import axios from "../../../api/axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
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
    <ListCategories
      categories={categories}
      setReloadCategories={setReloadCategories}
    />
  );
}
