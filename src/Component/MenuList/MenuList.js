import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./MenuList.css";
import { UserContext } from "../../Context/UserContext";

const MenuList = () => {
  const { authToken, setAuthToken } = useContext(UserContext);
  const history = useHistory();
  function handleLogout() {
    try {
      localStorage.removeItem("authToken");
      setAuthToken(null);
      history.push("/Login");
    } catch (error) {
      console.log("Error : " + error);
    }
  }

  return (
    <div>
      {typeof authToken === "undefined" ||
      authToken === null ||
      authToken === "" ? (
        ""
      ) : (
        <nav>
          <ul>
            <li className="mx-1">
              <Link to="/UserList" className="link">
                UserList
              </Link>
            </li>
            <li className="mx-1">
              <Link to="/CustomerList" className="link">
                Customer list
              </Link>
            </li>
            <li className="mx-1 link link-signout">
                <button
                  id="btnLogout"
                  className="button btn-signout"
                  onClick={handleLogout}
                >
                  Sign-out
                </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default MenuList;
