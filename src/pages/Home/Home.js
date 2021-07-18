import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StorefrontIcon from "@material-ui/icons/Storefront";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import FastfoodRoundedIcon from "@material-ui/icons/FastfoodRounded";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import axios from "../../api/axios";
import { CircularProgress } from "@material-ui/core";

import "./Home.scss";

export default function Home() {
  const [products, setProducts] = useState(null);

  const settings = {
    dots: true,
    centerMode: true,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    async function fechData() {
      await axios
        .get("/product/last")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((err) => console.log(err.response));
    }
    fechData();
  }, []);

  return (
    <div className="home">
      <Helmet>
        <title>MINIMARKET | Home</title>
      </Helmet>
      <div className="home__content">
        <div className="home__content-top"></div>
        <div className="home__content-button">
          <div className="slide">
            {!products ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <h2>
                  Ultimos <span>Productos</span>
                </h2>
                <Slider {...settings}>
                  {products.map((product, index) => (
                    <div className="product" key={index}>
                      <Link to={`/producto/${product.slug}`}>
                        <img src={product.image} alt="" />
                      </Link>
                    </div>
                  ))}
                </Slider>
              </>
            )}
          </div>
          <div className="entrar">
            <div className="left">
              <div className="info">
                <AttachMoneyIcon fontSize="large" />
                <p>Mejores Precios</p>
              </div>
              <div className="info">
                <CheckCircleIcon fontSize="large" />
                <p>Mejores Descuentos</p>
              </div>
            </div>
            <div className="center">
              <Link to="/comprar">
                <button className="btn">
                  Empieza a Comprar <span>Ahora</span>
                </button>
              </Link>
            </div>
            <div className="right">
              <div className="info">
                <p>
                  Despacho a <span>domicilio</span>
                </p>
                <StorefrontIcon fontSize="large" />
              </div>
              <div className="info">
                <p>Rapido</p>
                <FastfoodRoundedIcon fontSize="large" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
