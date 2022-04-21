import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { authLogout } from "../redux/actions/auth.actions";

function Header() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    menu: false,
    isOpen: false,
    pageLinkClass: "nav-item nav-link",
    aboutLinkClass: "nav-item nav-link",
    postLinkClass: "nav-item nav-link",
    userLinkClass: "nav-item nav-link",
    menuClass: "",
  });

  const toggleMenu = () => {
    setState({
      ...state,
      menu: !state.menu,
    });
  };

  const show = state.menu ? "show" : "";

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(authLogout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/header">
        TestCMS
      </Link>
      <button className="navbar-toggler" type="button" onClick={toggleMenu}>
        <span className="navbar-toggler-icon" />
      </button>
      <div className={"collapse navbar-collapse " + show}>
        <div className="navbar-nav">
          <Link
            className={state.pageLinkClass}
            to="/page"
            onClick={() =>
              state.pageLinkClass === "nav-item nav-link"
                ? "nav-item nav-link active"
                : "nav-item nav-link"
            }
          >
            Page <span className="sr-only">(current)</span>
          </Link>
          <Link
            className={state.postLinkClass}
            to="/post"
            onClick={() =>
              state.postLinkClass === "nav-item nav-link"
                ? "nav-item nav-link active"
                : "nav-item nav-link"
            }
          >
            Post
          </Link>
          <Link
            className={state.userLinkClass}
            to="/user"
            onClick={() =>
              state.userLinkClass === "nav-item nav-link"
                ? "nav-item nav-link active"
                : "nav-item nav-link"
            }
          >
            User
          </Link>
          <Link
            className={state.aboutLinkClass}
            to="/role"
            onClick={() =>
              state.aboutLinkClass === "nav-item nav-link"
                ? "nav-item nav-link active"
                : "nav-item nav-link"
            }
          >
            Role
          </Link>
          <div className="navbar-nav ml-auto">
            <button
              className="btn btn-outline-danger"
              type="submit"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
