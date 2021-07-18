import React, { useEffect, useState } from "react";
import ListUsers from "../../../components/User/Perfil/Users/ListUsers";
import axios from "../../../api/axios";

import "./Users.scss";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);

  useEffect(() => {
    async function fechData() {
      await axios
        .get("/user/get-users")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((err) => console.log(err.response));
    }
    fechData();
    setReloadUsers(false);
  }, [reloadUsers]);

  return (
    <div>
      <ListUsers users={users} setReloadUsers={setReloadUsers} />
    </div>
  );
}
