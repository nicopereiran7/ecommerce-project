import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import { LocalMallOutlined, LocalOfferOutlined } from "@material-ui/icons/";
import useAuth from "../../../../hooks/useAuth";

import "./MenuSider.scss";

function MenuSider(props) {
  const { location } = props;
  const [path, setPath] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <div className="menu-sider">
      <List>
        <ListItem
          button
          component={Link}
          to={"/mi-perfil"}
          selected={path === "/mi-perfil"}
        >
          <PersonOutlineOutlinedIcon />
          <ListItemText primary="Mi Perfil" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={"/mi-perfil/registros"}
          selected={path === "/mi-perfil/registros"}
        >
          <ShoppingCartOutlinedIcon />
          <ListItemText primary="Mis Compras" />
        </ListItem>
        {user?.isAdmin && (
          <>
            <ListItem
              button
              component={Link}
              to={"/mi-perfil/usuarios"}
              selected={path === "/mi-perfil/usuarios"}
            >
              <PeopleAltOutlinedIcon />
              <ListItemText primary="Usuarios" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to={"/mi-perfil/productos"}
              selected={path === "/mi-perfil/productos"}
            >
              <LocalMallOutlined />
              <ListItemText primary="Productos" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to={"/mi-perfil/categorias"}
              selected={path === "/mi-perfil/categorias"}
            >
              <LocalOfferOutlined />
              <ListItemText primary="Categorias" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to={"/mi-perfil/sub-categorias"}
              selected={path === "/mi-perfil/sub-categorias"}
            >
              <LocalOfferOutlined />
              <ListItemText primary="Sub Categorias" />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );
}

export default withRouter(MenuSider);
