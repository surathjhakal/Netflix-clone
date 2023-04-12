import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import "./SignUpScreen.css";

const SignUpScreen = () => {
  const [showSignup, setShowSignup] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    if (emailRef.current.value == "" || passwordRef.current.value == "") {
      alert("Enter all details");
      return;
    }
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((data) => {
        console.log(data);
        // alert("hello user you registered yourself now just sign in");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const signIn = (e) => {
    if (emailRef.current.value == "" || passwordRef.current.value == "") {
      alert("Enter all details");
      return;
    }
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((data) => {
        console.log(data);
        // alert("Hello user you are signed in now! Hurray");
      })
      .catch((err) => {
        // alert("wrong password bro");
        console.log(err);
        if (err.code == "auth/user-not-found") {
          alert("No user with that email, please sign up");
        } else if (err.code == "auth/wrong-password") {
          alert("Entered wrong password");
        }
      });
  };
  return (
    <div className="signup_screen">
      <form>
        <h1>{showSignup ? "Sign Up" : "Sign In"}</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        {showSignup ? (
          <button type="submit" onClick={register}>
            Sign Up
          </button>
        ) : (
          <button type="submit" onClick={signIn}>
            Sign In
          </button>
        )}
        <h4>
          <span className="signup_screen_grey">
            {showSignup ? "Have Account?" : "New to Netflix?"}{" "}
          </span>
          <span
            className="signup_screen_link"
            onClick={() => setShowSignup(!showSignup)}
          >
            {showSignup ? "Sign In now" : "Sign Up now"}
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignUpScreen;
