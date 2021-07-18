import React, { useEffect, useState } from "react";
import { Badge } from "@material-ui/core";
import { Link as LinkRouter, withRouter } from "react-router-dom";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import DrawerBasic from "../DrawerBasic";
import Ingresar from "../User/Ingresar";
import useAuth from "../../hooks/useAuth";
import PreviewCarrito from "../User/PreviewCarrito";

import "./MenuTop.scss";

function MenuTop(props) {
  const { carrito, location } = props;
  const { user } = useAuth();
  const [path, setPath] = useState("");

  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  const login = () => {
    setOpenDrawer(true);
    setDrawerContent(<Ingresar />);
  };

  const previewCarrito = () => {
    setOpenDrawer(true);
    setDrawerContent(<PreviewCarrito />);
  };

  return (
    <div className="menu-top">
      <div className="menu-top__top">
        <h4>Vergara 1980</h4>
        <h4>+569 56847452</h4>
      </div>
      <div className="menu-top__button">
        <div className="left">
          <LinkRouter to="/">
            <h2>MINIMARKET</h2>
          </LinkRouter>
        </div>
        <div className="center">
          <LinkRouter to="/" className={path === "/" ? "active" : ""}>
            Home
          </LinkRouter>
          <LinkRouter
            to="/comprar"
            className={path === "/comprar" ? "active" : ""}
          >
            Comprar
          </LinkRouter>
          <LinkRouter
            to="/mi-carrito"
            className={path === "/mi-carrito" ? "active" : ""}
          >
            Mi Carrito
          </LinkRouter>
          <LinkRouter
            to="/quienes-somos"
            className={path === "/quienes-somos" ? "active" : ""}
          >
            Quienes Somos
          </LinkRouter>
        </div>
        <div className="right">
          {user ? (
            <LinkRouter to="/mi-perfil">
              <PermIdentityIcon />
            </LinkRouter>
          ) : (
            <PersonIcon onClick={login} />
          )}

          {carrito ? (
            <Badge badgeContent={carrito.length} color="error">
              <AddShoppingCartIcon onClick={previewCarrito} />
            </Badge>
          ) : (
            <AddShoppingCartIcon onClick={previewCarrito} />
          )}
        </div>
        <DrawerBasic openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
          {drawerContent}
        </DrawerBasic>
      </div>
    </div>
  );
}

export default withRouter(MenuTop);
