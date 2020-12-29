import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";
import "./Style/App.css";
import Login from "./Component/Login/Login";
import MenuList from "./Component/MenuList/MenuList";
// import Register from "./Component/Register/Register";
import UserList from "./Component/User/UserList/UserList";
import UserInfo from "./Component/User/UserInfo/UserInfo";
import CustomerList from "./Component/Customer/CustomerList/CustomerList";
import { UserContext } from "./Context/UserContext.js";
import "./Style/Utility.css";

function App() {

  const [authToken, setAuthToken] = useState(null);
  //const value = useMemo(() => ({ authToken , setAuthToken }), [authToken, setAuthToken]);

  return (
    <div>
      <UserContext.Provider value={{authToken , setAuthToken}}>
        <Router>
          <div className="section-header">User management</div>
          <div className="section-menu">
            <MenuList />
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
          </div>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
