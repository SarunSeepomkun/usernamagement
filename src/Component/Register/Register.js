import React, { useRef, useState } from "react";
import firebase from "../../Database/firebase";
// import { useAuth } from "../../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import AlertDialog from '../Alert/AlertDialog';

function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const birthdayRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const CreateUser = async () => {
    try {
      setLoading(true);
      if (passwordRef.current.value === confirmpasswordRef.current.value) {
        await firebase.firestore().collection("users").add({
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          firstname: firstnameRef.current.value,
          lastname: lastnameRef.current.value,
          birthday: birthdayRef.current.value,
        });

        history.push("/UserList");
      } else {
        setError("Password do not match");
      }
    } catch (error) {
      setError(`Error : Cannot register ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
      Register Page Username :
      <input id="txtUsername" type="text" ref={usernameRef} required />
      Password :
      <input id="txtPassword" type="password" ref={passwordRef} required />
      Confirm Password :
      <input
        id="txtConfirmPassword"
        type="password"
        ref={confirmpasswordRef}
        required
      />
      Email :
      <input id="txtEmail" type="email" ref={emailRef} />
      First name :
      <input id="txtFirstname" type="text" ref={firstnameRef} />
      Last name :
      <input id="txtLastname" type="text" ref={lastnameRef} />
      Birthday :
      <input id="txtBirthday" type="text" ref={birthdayRef} />
      <input id="btnRegister" type="submit" disabled={loading} onClick={CreateUser} value="Register" />
      <div>
        Already have an account ? <Link to="/login">Log-in</Link>
      </div>
      </form>
      <AlertDialog type_message="error" message={error} />
    </div>
  );
}

export default Register;
