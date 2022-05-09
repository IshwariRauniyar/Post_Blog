import React from "react";
// import { useSelector } from "react-redux";
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
import PostView from "./pages/PostView";
import PageView from "./pages/PageView";
// import { PrivateRoute, PublicRoute } from "./PrivateRoute";

const App = () => {
  // const auth = useSelector((state) => state.auth);
  // console.log("auth", auth);
  const user = localStorage.getItem("keyName");
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/header"
            // element={<PrivateRoute><Header /></PrivateRoute>}
            element={
              user ? (
                <Header />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/"
            // element={<PublicRoute> <Login /></PublicRoute>}
            element={
              user ? (
                <Navigate to={"/header"} />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/login"
            // element={<PublicRoute> <Login /></PublicRoute>}
            element={
              user ? (
                <Navigate to={"/header"} />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/post"
            // element={<PrivateRoute> <Post /></PrivateRoute>}
            element={
              user ? (
                <Post />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            exact
            path="/page"
            // element={<PrivateRoute> <Page /></PrivateRoute>}
            element={
              user ? (
                <Page />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            exact
            path="/user"
            // element={<PrivateRoute> <User /></PrivateRoute>}
            element={
              user ? (
                <User />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            exact
            path="/role"
            // element={<PrivateRoute> <Role /></PrivateRoute>}
            element={
              user ? (
                <Role />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route exact path="/page-view/:Slug" element={<PageView />} />
          <Route path="/post-view/:Slug" element={<PostView />} />
          <Route path="*" element={<>404 NOT FOUND</>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
