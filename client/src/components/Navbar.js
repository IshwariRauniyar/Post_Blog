import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { authLogout } from "../redux/actions/auth.actions";

export default function Header() {
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
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <nav className="navbar navbar-expand-lg flex navbar-light bg-light">
        <Link className="navbar-brand" to="/header">
          TestCMS
        </Link>
        {/* <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon" />
        </button> */}
        {/* <div className={"collapse navbar-collapse " + show}> */}
        <div className="navbar-nav flex justify-center">
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
        </div>
        <div className="ml-auto">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {user.UserName}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>
                <ExitToAppIcon />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {/* </div> */}
      </nav>

      {/* <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/header">TestCMS</Navbar.Brand>
          <Nav>
            <Nav.Link
              className={state.pageLinkClass}
              href="/page"
              onClick={() =>
                state.pageLinkClass === "nav-item nav-link"
                  ? "nav-item nav-link active"
                  : "nav-item nav-link"
              }
            >
              Page
            </Nav.Link>
            <Nav.Link href="/post">Post</Nav.Link>
            <Nav.Link
              className={state.userLinkClass}
              href="/user"
              onClick={() =>
                state.userLinkClass === "nav-item nav-link"
                  ? "nav-item nav-link active"
                  : "nav-item nav-link"
              }
            >
              User
            </Nav.Link>
            <Nav.Link href="/role">Role</Nav.Link>
          </Nav>
          <div className="ml-auto">
            <NavDropdown title={user?.UserName}>
              <NavDropdown.Item
                onClick={handleLogout}
                className="mdi mdi-logout"
              >
                <ExitToAppIcon /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Container>
      </Navbar> */}
    </>
  );
}
