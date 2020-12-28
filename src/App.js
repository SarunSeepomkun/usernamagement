import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";
import "./App.css";
import Login from "./Component/Login/Login";
// import Register from "./Component/Register/Register";
import UserList from "./Component/User/UserList/UserList";
import UserInfo from "./Component/User/UserInfo/UserInfo";
import CustomerList from "./Component/Customer/CustomerList/CustomerList";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import "./Style/Utility.css";

function App() {
  const [error, setError] = useState();
  const [showAlert, setshowAlert] = useState(false);
  const history = useHistory();

  function handleLogout() {
    try {
      localStorage.removeItem("authToken");
      history.push("/");
    } catch (error) {
      setError(`Error : cannot logout ${error}`);
      setshowAlert(true);
    }
  }

  return (
    <div>
      <Router>
        <div className="section-header">User management
          {localStorage.getItem("authToken") === null ? (
            ""
          ) : (
            <nav>
              <ul className="flex flex-row flex-start">
                <li className="mx-1">
                  <Link to="/UserList">UserList</Link>
                </li>
                <li className="mx-1">
                  <Link to="/CustomerList">Customer list</Link>
                </li>
                <li className="mx-1">
                  <button
                    id="btnLogout"
                    className="button"
                    onClick={handleLogout}
                  >
                    Sign-out
                  </button>
                </li>
              </ul>
            </nav>
          )}
          </div>
          <div className="section-content">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/Login" component={Login} />
              <PrivateRoute exact path="/UserList" component={UserList} />
              <PrivateRoute exact path="/UserInfo" component={UserInfo} />
              {/* <PrivateRoute path="/Register" component={Register} /> */}
              <PrivateRoute
                exact
                path="/CustomerList"
                component={CustomerList}
              />
            </Switch>
            <Collapse in={showAlert}>
              <Alert severity="error">{error}</Alert>
            </Collapse>
          </div>
      </Router>
    </div>
  );
}

export default App;
