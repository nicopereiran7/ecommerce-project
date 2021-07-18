import React from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import MenuSider from "../../components/User/Perfil/MenuSider";
import { getAccessToken } from "../../utils/auth";

import "./Perfil.scss";

function Perfil(props) {
  const { routes, user } = props;

  const auth = getAccessToken();

  if (!auth) {
    return <Redirect to="/" />;
  }

  return (
    <Router>
      <div className="perfil">
        <div className="perfil__header">
          <h3>Mi Perfil</h3>
        </div>
        <div className="perfil__content">
          <MenuSider />
          <div className="routes">
            <LoadRoutes routes={routes} user={user} />
          </div>
        </div>
      </div>
    </Router>
  );
}

function LoadRoutes(props) {
  const { routes, user } = props;
  // if (!user?.isAdmin) {
  //   return (
  //     <Switch>
  //       {routes.map((route, index) => (
  //         <Route
  //         key={index}
  //         path={route.path}
  //         exact={route.exact}
  //         render={(props) => <route.component user={user} {...props}/>}
  //       />
  //       ))}
  //     </Switch>
  //   );
  // }

  return (
    <Switch>
      {routes.map((route, index) =>
        user?.isAdmin ? (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={(props) => <route.component user={user} {...props} />}
          />
        ) : (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={(props) =>
              !route.admin ? (
                <route.component user={user} {...props} />
              ) : (
                <Redirect to="/mi-perfil/" />
              )
            }
          />
        )
      )}
    </Switch>
  );
}

export default withRouter(Perfil);
