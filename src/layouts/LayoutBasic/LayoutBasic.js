import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import MenuTop from "../../components/MenuTop";
import useAuth from "../../hooks/useAuth";
import { getProduct } from "../../utils/localStorage";
import Footer from "../../components/Footer";
import { getAccessToken } from "../../utils/auth";
import { addProduct } from "../../utils/localStorage";

import "./LayoutBasic.scss";

export default function LayoutBasic(props) {
  const { routes } = props;
  const [carrito, setCarrito] = useState([]);
  const [reloadCarrito, setReloadCarrito] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    setCarrito(getProduct());
    setReloadCarrito(false);
  }, [reloadCarrito]);

  const select = (product) => {
    if (!getAccessToken()) {
      // setOpenDrawer(true);
      // setDrawerContent(<h1>User Invitado</h1>);
      addProduct(product);
      setReloadCarrito(true);
    } else {
      addProduct(product);
      setReloadCarrito(true);
    }
  };

  return (
    <div className="layout-basic">
      <MenuTop carrito={carrito} setReloadCarrito={setReloadCarrito} />
      <div className="content">
        <LoadRoutes
          routes={routes}
          user={user}
          carrito={carrito}
          setReloadCarrito={setReloadCarrito}
          select={select}
        />
      </div>
      <Footer />
    </div>
  );
}

function LoadRoutes(props) {
  const { routes, user, carrito, setReloadCarrito, select } = props;

  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          render={(props) => (
            <route.component
              routes={route.routes}
              user={user}
              carrito={carrito}
              setReloadCarrito={setReloadCarrito}
              select={select}
              {...props}
            />
          )}
        />
      ))}
    </Switch>
  );
}
