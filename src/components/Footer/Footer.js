import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import RoomIcon from "@material-ui/icons/Room";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";

import "./Footer.scss";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__left">
        <div className="info">
          <div className="logo">
            <RoomIcon />
          </div>
          <div className="data">
            <h4>Vergara 1980</h4>
            <p>Temuco</p>
          </div>
        </div>
        <div className="info">
          <div className="logo">
            <PhoneIcon />
          </div>
          <div className="data">
            <h4>+569 56847452</h4>
          </div>
        </div>
        <div className="info">
          <div className="logo">
            <MailIcon />
          </div>
          <div className="data">
            <h4>minimarket@gmail.com</h4>
          </div>
        </div>
      </div>
      <div className="footer__right">
        <div className="info">
          <h3>Informacion sobre nosotros</h3>
          <p>
            Nuestro negocio familiar empezo hace 3 años, contamos con aplia gama
            de productos para su vidad diaria
          </p>
        </div>
        <div className="redes">
          <FacebookIcon />
          <InstagramIcon />
        </div>
      </div>
    </div>
  );
}
