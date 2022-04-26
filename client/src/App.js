import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/css/demo.css";
import "./assets/css/style.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Navbar";
import Login from "./pages/Login";
import Post from "./pages/Posts";
import Page from "./pages/Pages";
import User from "./pages/Users";
import Role from "./pages/Roles";
import Cookies from "js-cookie";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/header"
            element={
              Cookies.get("token") ? (
                <Header />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/"
            element={
              Cookies.get("token") ? (
                <Navigate to={"/header"} />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/login"
            element={
              Cookies.get("token") ? (
                <Navigate to={"/header"} />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/post"
            element={
              Cookies.get("token") ? (
                <Post />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            exact
            path="/page"
            element={
              Cookies.get("token") ? (
                <Page />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            exact
            path="/user"
            element={
              Cookies.get("token") ? (
                <User />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            exact
            path="/role"
            element={
              Cookies.get("token") ? (
                <Role />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route path="*" element={<>404 NOT FOUND</>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
