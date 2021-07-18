import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "../../api/axios";
import { Grid } from "@material-ui/core";
import Product from "../../components/Product";

import "./Category.scss";

function Category(props) {
  const { match } = props;
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`/category/${match?.params?.slug}`)
      .then(async (response) => {
        setCategory(response.data);
        await axios
          .get(`/category/${response.data._id}/products`)
          .then((response) => {
            setData(response.data);
          })
          .catch((err) => console.log(err.response));
      })
      .catch((err) => console.log(err.response));
  }, [match]);

  return (
    <div className="category">
      <div className="category__header">
        <h1>{category.name}</h1>
      </div>
      <div className="category__cards">
        <Grid container spacing={3} direction="row">
          {data.map((product, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default withRouter(Category);
