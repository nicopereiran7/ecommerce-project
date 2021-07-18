import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import axios from "../../../../../api/axios";

import "./EditCategoryForm.scss";

export default function EditCategoryForm(props) {
  const { category, setReloadCategories, setOpenModal } = props;
  const [data, setData] = useState({
    name: category.name,
  });

  const updateCategory = async (e) => {
    e.preventDefault();

    await axios
      .post(`/category/${category?.slug}/edit`, data)
      .then((response) => {
        console.log(response);
        setReloadCategories(true);
        setOpenModal(false);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div className="edit-category-form" onSubmit={updateCategory}>
      <form className="form">
        <TextField
          label="Nombre de la Categoria"
          defaultValue={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <Button type="submit" color="primary">
          Actualizar Categoria
        </Button>
      </form>
    </div>
  );
}
