import React, { useEffect, useState } from "react";
import { TextField, Button, NativeSelect } from "@material-ui/core";
import axios from "../../../../../api/axios";

import "./EditSubCategoryForm.scss";

export default function EditSubCategoryForm({
  subCategory,
  setReloadSubCategories,
  setOpenModal,
}) {
  const [data, setData] = useState({
    name: subCategory.name,
    category: subCategory.category._id,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fechData() {
      await axios.get("/category/get-categories").then((response) => {
        setCategories(response.data);
      });
    }
    fechData();
  }, []);

  const edit = async (e) => {
    e.preventDefault();

    await axios
      .put(`/sub-category/${subCategory._id}/edit`, data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setReloadSubCategories(true);
          setOpenModal(false);
        }
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div className="edit-sub-category-form">
      <form className="form" onSubmit={edit}>
        <TextField
          label="Nombre de Sub-Categoria"
          defaultValue={data.name}
          onChange={(e) => setData({ name: e.target.value })}
        />
        <NativeSelect
          inputProps={{ "aria-label": "Seleccione Categoria" }}
          value={data.category}
          onChange={(e) => setData({ ...data, category: e.target.value })}
        >
          {categories.map((category, index) => (
            <option key={index} value={category._id}>
              {category.name}
            </option>
          ))}
        </NativeSelect>
        <Button type="submit" color="primary">
          Editar Sub-Categoria
        </Button>
      </form>
    </div>
  );
}
