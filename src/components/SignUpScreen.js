import React, { useRef } from "react";
import { auth } from "../firebase";
import "./SignUpScreen.css";

const SignUpScreen = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
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
      });
  };
  return (
    <div className="signup_screen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="signup_screen_grey">New to Netflix? </span>
          <span className="signup_screen_link" onClick={register}>
            Sign Up now
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SignUpScreen;
