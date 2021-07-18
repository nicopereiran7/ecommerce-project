import React, { useState } from "react";
import { TextField, Button, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "../../../api/axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";

import "./Ingresar.scss";

export default function Ingresar() {
  const [select, setSelect] = useState(1);

  return (
    <div className="ingresar">
      <div className="title">
        <h1>Ingresar con una cuenta</h1>
      </div>
      {select === 1 ? (
        <LoginForm setSelect={setSelect} />
      ) : (
        <RegisterForm setSelect={setSelect} />
      )}
    </div>
  );
}

function LoginForm(props) {
  const { setSelect } = props;
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");
  const [alertContent, setAlertContent] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      setTypeAlert("error");
      setAlertContent("Ingresar Email y contraseña");
      setOpenAlert(true);
    } else {
      axios
        .post("/user/sign-in", user)
        .then((response) => {
          const { accessToken, refreshToken } = response.data;
          localStorage.setItem(ACCESS_TOKEN, accessToken);
          localStorage.setItem(REFRESH_TOKEN, refreshToken);
          setTypeAlert("success");
          setAlertContent("Login Correcto");
          setOpenAlert(true);
          window.location.href = "/";
        })
        .catch((err) => {
          console.log(err.response);
          setTypeAlert("error");
          setAlertContent(err.response.data.message);
          setOpenAlert(true);
        });
    }
  };

  return (
    <div className="login-form">
      <h2>Entrar</h2>
      <form className="form" onSubmit={login} onChange={onChange}>
        <TextField
          label="Ingrese Correo Electronico"
          name="email"
          value={user.email}
        />
        <TextField
          label="Ingrese Contraseña"
          name="password"
          type="password"
          value={user.password}
        />
        <Button variant="outlined" color="primary" type="submit">
          Ingresar
        </Button>
      </form>
      <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={typeAlert} variant="filled">
          {alertContent}
        </Alert>
      </Snackbar>
      <div className="sign-up">
        <p>
          Si no tienes cuenta Registrate {`${" "}`}
          <span onClick={() => setSelect(2)}>aqui</span>
        </p>
      </div>
    </div>
  );
}

function RegisterForm(props) {
  const { setSelect } = props;
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    direccion: "",
    password: "",
    repeatPassword: "",
  });

  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");
  const [alertContent, setAlertContent] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    const { name, lastname, direccion, email, password, repeatPassword } = user;
    if (
      !name ||
      !lastname ||
      !direccion ||
      !email ||
      !password ||
      !repeatPassword
    ) {
      setTypeAlert("error");
      setAlertContent("Todos los campos son obligatorios");
      setOpenAlert(true);
    } else {
      axios
        .post("/user/sign-up", user)
        .then((response) => {
          console.log(response);
          setTypeAlert("success");
          setAlertContent("Usuario creado Correctamente");
          setOpenAlert(true);
          resetForm();
        })
        .catch((err) => {
          console.log(err.response);
          setTypeAlert("error");
          setAlertContent(err.response.data.message);
          setOpenAlert(true);
        });
    }
  };

  const resetForm = () => {
    setUser({
      name: "",
      lastname: "",
      email: "",
      direccion: "",
      password: "",
      repeatPassword: "",
    });
  };

  return (
    <div className="login-form">
      <h2>Registrar Nuevo Usuario</h2>
      <form className="form" onSubmit={register} onChange={onChange}>
        <TextField label="Ingrese Nombre" name="name" value={user.name} />
        <TextField
          label="Ingrese Apellido"
          name="lastname"
          value={user.lastname}
        />
        <TextField
          label="Ingrese Correo Electronico"
          name="email"
          value={user.email}
        />
        <TextField label="Direccion" name="direccion" value={user.direccion} />
        <TextField
          label="Ingrese Contraseña"
          name="password"
          type="password"
          value={user.password}
        />
        <TextField
          label="Ingrese Contraseña Nuevamente"
          name="repeatPassword"
          type="password"
          value={user.repeatPassword}
        />
        <Button variant="outlined" color="primary" type="submit">
          Registrarse
        </Button>
      </form>
      <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={typeAlert} variant="filled">
          {alertContent}
        </Alert>
      </Snackbar>
      <div className="sign-up">
        <p>
          Iniciar Sesion {`${" "}`}
          <span onClick={() => setSelect(1)}>aqui</span>
        </p>
      </div>
    </div>
  );
}
