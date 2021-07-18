import React from "react";
import { Drawer } from "@material-ui/core";

export default function DrawerBasic(props) {
  const { children, openDrawer, setOpenDrawer } = props;
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(false);
  };
  return (
    <Drawer
      anchor="right"
      open={openDrawer}
      onClose={toggleDrawer("right", false)}
    >
      {children}
    </Drawer>
  );
}
