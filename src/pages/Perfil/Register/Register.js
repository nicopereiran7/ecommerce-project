import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  IconButton,
  Collapse,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import axios from "../../../api/axios";
import moment from "moment";

import "./Register.scss";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Register(props) {
  const { user } = props;
  const classes = useStyles();
  const [cartsUser, setCartsUser] = useState([]);

  useEffect(() => {
    async function fechData() {
      await axios
        .get(`/user/${user?.id}/carts`)
        .then((response) => {
          setCartsUser(response.data);
        })
        .catch((err) => console.log(err.response));
    }
    fechData();
  }, []);

  const head = [{ name: "Fecha" }, { name: "Total $" }];

  return (
    <div className="register">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Total de Carritos
              </Typography>
              <Typography variant="h5" component="h2">
                {cartsUser.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          {cartsUser ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableCell />
                  {head.map((item, index) => (
                    <TableCell key={index} align="right">
                      {item.name}
                    </TableCell>
                  ))}
                </TableHead>
                <TableBody>
                  {cartsUser.map((cart, index) => (
                    <Row key={index} cart={cart} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h2>Aun no ha realizado compras</h2>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

function Row(props) {
  const { cart } = props;
  const [open, setOpen] = useState(false);

  const formatDate = (date) => {
    return moment(date).format("DD-MM-YY hh:mm:ss");
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{formatDate(cart.date)}</TableCell>
        <TableCell align="right">{`${"$"}${cart.total}`}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Productos
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Precio $</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.product.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {product.name}
                      </TableCell>
                      <TableCell align="right">{product.prize}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
