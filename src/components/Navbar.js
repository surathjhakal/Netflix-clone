import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [show, handleShow] = useState(false);

  const history = useHistory();
  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);

  return (
    <div className={`navbar_custom ${show && "navbar_black"}`}>
      <div className="navbar_contents">
        <img
          onClick={() => history.push("/")}
          alt="image"
          className="navbar_logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
        />
        <img
          onClick={() => history.push("/profile")}
          alt="image"
          className="navbar_avatar"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png"
        />
      </div>
    </div>
  );
};

export default Navbar;
