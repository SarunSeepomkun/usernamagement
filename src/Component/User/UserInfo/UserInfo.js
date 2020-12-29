import React, { useRef, useState, useEffect } from "react";
import firebase from "../../../Database/firebase";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function UserInfo({ handleClose, userInfo, setuserInfo, fetchUserList }) {
  const [Add_or_Update, setAdd_or_Update] = useState("Add user");
  // const [userInfo, setUserInfo] = useState(null);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const birthdayRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState("info");

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSave = () => {
    if (
      typeof userInfo === "undefined" ||
      userInfo === null ||
      userInfo === ""
    ) {
      CreateUser();
    } else {
      UpdateUser();
    }
  };

  const CreateUser = async () => {
    try {
      setLoading(true);
      if (
        usernameRef.current.value !== "" &&
        passwordRef.current.value !== "" &&
        passwordRef.current.value === confirmpasswordRef.current.value
      ) {
        await firebase.firestore().collection("users").add({
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          firstname: firstnameRef.current.value,
          lastname: lastnameRef.current.value,
          birthday: selectedDate
        });

        setuserInfo(null);
        fetchUserList();
        handleClose();
      } else {
        setError("Username is null or Password do not match");
        setSeverity("warning");
        setShowAlert(true);
      }
    } catch (error) {
      setError(`Error : Cannot register ${error}`);
      setSeverity("error");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const UpdateUser = async () => {
    try {
      setLoading(true);
      if (
        usernameRef.current.value !== "" &&
        passwordRef.current.value !== "" &&
        passwordRef.current.value === confirmpasswordRef.current.value
      ) {

        await firebase.firestore().collection("users").doc(userInfo.id).set({
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          firstname: firstnameRef.current.value,
          lastname: lastnameRef.current.value,
          birthday: selectedDate
        });

        setuserInfo(null);
        fetchUserList();
        handleClose();
      } else {
        setError("Username is null or Password do not match");
        setSeverity("warning");
        setShowAlert(true);
      }
    } catch (error) {
      setError(`Error : Cannot register ${error}`);
      setSeverity("error");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const GetUser = async () => {
    try {
      const db = firebase.firestore();
      const data = await db.collection("users").doc(userInfo.id).get();
      //setUserInfo(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      usernameRef.current.value = data.data().username;
      passwordRef.current.value = data.data().passwordRef;
      confirmpasswordRef.current.value = data.data().passwordRef;
      emailRef.current.value = data.data().email;
      firstnameRef.current.value = data.data().firstname;
      lastnameRef.current.value = data.data().lastname;
      // birthdayRef.current.value = data.data().birthday;
      setSelectedDate(data.data().birthday);
    } catch (error) {
      setError(`Error : Cannot get user from db ${error}`);
      setSeverity("error");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const Add_or_Update = () => {
      if (
        typeof userInfo !== "undefined" &&
        userInfo !== null &&
        userInfo !== ""
      ) {
        setAdd_or_Update("Update");
        GetUser();
      } else {
        setAdd_or_Update("Add new");
      }
    };
    Add_or_Update();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="section-userinfo card">
      <h3 className="text-center m-1">User Information</h3>
      <Collapse in={showAlert}>
        <Alert severity={severity} onClose={() => setShowAlert(false)}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
        <div className="grid m-1">
          <label htmlFor="txtUsername">Username</label>
          <input
            id="txtUsername"
            className="textbox"
            type="text"
            ref={usernameRef}
            required
          />
          <label htmlFor="txtPassword">Password</label>
          <input
            id="txtPassword"
            className="textbox"
            type="password"
            ref={passwordRef}
            required
          />
          <label htmlFor="txtConfirmPassword">Confirm Password</label>
          <input
            id="txtConfirmPassword"
            className="textbox"
            type="password"
            ref={confirmpasswordRef}
            required
          />
          <label htmlFor="txtEmail">Email</label>
          <input
            id="txtEmail"
            className="textbox"
            type="email"
            ref={emailRef}
          />
          <label htmlFor="txtFirstname">Firstname</label>
          <input
            id="txtFirstname"
            className="textbox"
            type="text"
            ref={firstnameRef}
          />
          <label htmlFor="txtLastname">Lastname</label>
          <input
            id="txtLastname"
            className="textbox"
            type="text"
            ref={lastnameRef}
          />
          <label htmlFor="txtBirthday">Birthday</label>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="txtBirthday"
              ref={birthdayRef}
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className="flex m-1">
          <button
            id="btnRegister"
            className="button m-1"
            type="submit"
            disabled={loading}
            onClick={handleSave}
          >
            {Add_or_Update}
          </button>
          <button
            id="btnCancel"
            disabled={loading}
            className="button m-1"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserInfo;
