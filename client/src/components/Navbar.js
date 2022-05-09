import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { authLogout } from "../redux/actions/auth.actions";

export default function Header() {
  const dispatch = useDispatch();
  // const [active, setActive] = useState('');
  // const [state, setState] = useState({
  //   menu: false,
  //   isOpen: false,
  //   pageLinkClass: "nav-item nav-link",
  //   aboutLinkClass: "nav-item nav-link",
  //   postLinkClass: "nav-item nav-link",
  //   userLinkClass: "nav-item nav-link",
  //   menuClass: "",
  // });
  // console.log("state", active);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(authLogout());
  };
  const user = localStorage.getItem("keyName");
  const role = JSON.parse(localStorage.getItem("keyVal"));
  // const navLinkClass = (link) => {
  //   console.log("link", link);
  //   if (link === active) {
  //     return "nav-item nav-link active";
  //   } else {
  //     return "nav-item nav-link";
  //   }
  // };


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
            className={'nav-item nav-link'}
            to="/page"
            hidden={role.includes("page") ? false : true}
          >
            Page <span className="sr-only">(current)</span>
          </Link>
          <Link
            // className={navLinkClass("post")}
            className={'nav-item nav-link'}
            hidden={role.includes("post") ? false : true}
            // className={`nav-item nav-link ${active === 'post' ? 'text-danger' : ''}`}
            to="/post"
          // onClick={() => {
          //   setActive("post");
          // }}
          // onClick={() =>
          //   state.postLinkClass === "nav-item nav-link"
          //     ? "nav-item nav-link active"
          //     : "nav-item nav-link"
          // }
          >
            Post
          </Link>
          <Link
            className={"nav-item nav-link"}
            // className={state.userLinkClass}
            // className={`nav-item nav-link ${active === 'user' ? 'text-danger' : ''}`}
            to="/user"
            hidden={role.includes("user") ? false : true}
          // onClick={() =>
          //   state.userLinkClass === "nav-item nav-link"
          //     ? "nav-item nav-link active"
          //     : "nav-item nav-link"
          // }
          >
            User
          </Link>
          <Link
            className={'nav-item nav-link'}
            // className={state.aboutLinkClass}
            // className={`nav-item nav-link ${active === 'role' ? 'text-danger' : ''}`}
            to="/role"
            hidden={role.includes("role") ? false : true}
          // onClick={() =>
          //   state.aboutLinkClass === "nav-item nav-link"
          //     ? "nav-item nav-link active"
          //     : "nav-item nav-link"
          // }
          >
            Role
          </Link>
        </div>
        <div className="ml-auto">
          <Dropdown>
            <Dropdown.Toggle size="lg" variant="success" id="dropdown-basic">
              {user}
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
