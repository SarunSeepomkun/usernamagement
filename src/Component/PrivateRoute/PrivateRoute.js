import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

function PrivateRoute({ component: Component, ...rest }) {
  const { authToken } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return typeof authToken === "undefined" ||
          authToken === null ||
          authToken === "" ? (
          <Redirect to="/Login" />
        ) : (
          <Component {...props} />
        );
      }}
    ></Route>
  );
}

export default PrivateRoute;
