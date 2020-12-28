import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {

  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem("authToken") !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/Login" />
        )
      }}
    ></Route>
  );
}

export default PrivateRoute;
