import React from "react";
import { Modal, Fade, Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

import "./ModalBasic.scss";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ModalBasic(props) {
  const { openModal, setOpenModal, titleModal, children } = props;
  const classes = useStyles();

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        <div className={classes.paper}>
          <div className="title">
            <h2 id="transition-modal-title">{titleModal}</h2>
            <CloseIcon onClick={() => setOpenModal(false)} />
          </div>
          {children}
        </div>
      </Fade>
    </Modal>
  );
}
