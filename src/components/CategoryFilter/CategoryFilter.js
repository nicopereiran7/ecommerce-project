import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import axios from "../../api/axios";

import "./CategoryFilter.scss";

export default function CategoryFilter(props) {
  const { categorias, setProductByCategory } = props;
  const [value, setValue] = useState("");

  const handleChange = async (e) => {
    setValue(e.target.value);
    if (e.target.value === "none") {
      setProductByCategory(null);
    } else {
      await axios
        .get(`/category/${e.target.value}/products`)
        .then((response) => {
          setProductByCategory(response.data);
        })
        .catch((err) => err.response);
    }
  };

  return (
    <div className="category-filter">
      <FormControl component="fieldset">
        <FormLabel component="legend">Categorias</FormLabel>
        <RadioGroup value={value} onChange={handleChange}>
          <FormControlLabel
            value="none"
            control={<Radio />}
            label="Sin Filtro"
          />
          {categorias.map((categoria, index) => (
            <FormControlLabel
              key={index}
              value={categoria._id}
              control={<Radio />}
              label={categoria.name}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
