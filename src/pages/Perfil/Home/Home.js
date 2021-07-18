import React from "react";
import { Avatar, Divider, IconButton } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout } from "../../../utils/auth";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet";

import "./Home.scss";

export default function Home() {
  const { user } = useAuth();

  const logOut = () => {
    logout();
    window.location.reload();
  };

  return (
    <>
      <Helmet>
        <title>Mi Perfil | Home</title>
      </Helmet>
      <div className="perfil">
        <div className="perfil__header">
          <h1>Mi Perfil</h1>
          <IconButton onClick={logOut}>
            <ExitToAppIcon />
          </IconButton>
        </div>
        <Divider />
        <div className="perfil__data">
          <div className="perfil__data-avatar">
            <Avatar variant="rounded">
              <PersonIcon />
            </Avatar>
          </div>
          <div className="perfil__data-info">
            <h2>{`${user?.name} ${user?.lastname}`}</h2>
            <p>{user?.email}</p>
            <p>{user?.direccion}</p>
          </div>
        </div>
      </div>
    </>
  );
}
