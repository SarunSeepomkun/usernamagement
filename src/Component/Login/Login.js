import React, { useRef, useState, useContext } from "react";
import firebase from "../../Database/firebase";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import { UserContext } from "../../Context/UserContext";

function Login() {
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);
  const {authToken , setAuthToken} = useContext(UserContext);

  const Login_Click = async () => {
    setLoading(true);
    const db = firebase.firestore();
    const data = await db
      .collection("users")
      .where("username", "==", usernameRef.current.value)
      .where("password", "==", passwordRef.current.value)
      .get();

    if (data.docs.length === 1) {
      //login success

      setLoading(false);

      localStorage.setItem("authToken", data.docs[0].id);
      setAuthToken(data.docs[0].id);

      history.push("/UserList");
    } else {
      //login failed
      setError("Username does not exist or username and password incorrect");
      setLoading(false);
      setShowAlert(true);
    }
  };

  return (
    <div className="section-login">
      <form onSubmit={Login_Click} autoComplete="off">
        <div className="card">
          <h2 className="text-center m-1">Login Page{authToken}</h2>
          <div className="container grid grid-2">
            <label htmlFor="txtUsername">Username</label>
            <input
              id="txtUsername"
              type="email"
              ref={usernameRef}
              required
              className="textbox"
            />
            <label htmlFor="txtPassword">Password</label>
            <input
              id="txtPassword"
              type="password"
              ref={passwordRef}
              className="textbox"
            />
            <span></span>
            <input
              id="btnlogin"
              type="submit"
              className="button m-1"
              onClick={Login_Click}
              disabled={loading}
              value="Sign-in"
            />
          </div>
          <Collapse in={showAlert}>
            <Alert severity="error" onClose={() => setShowAlert(false)}>
              {error}
            </Alert>
          </Collapse>
          <label>
            * You can use sysadmin for Username and p@ssw0rd for Password
          </label>
        </div>
      </form>
    </div>
  );
}

export default Login;
