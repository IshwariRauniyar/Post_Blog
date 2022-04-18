import React from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/css/demo.css";
import "./assets/css/style.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Post from "./pages/Post";
import PostView from "./pages/PostView";
import Article from "./pages/Articles";
import Page from "./pages/Pages";
import Table from "./pages/Table";
import Register from "./pages/Register";

const App = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>welcome to home page</>} />
          <Route
            path="/login"
            element={
              // localStorage.getItem("token")
              auth.isAuthenticated == true ? (
                <Navigate to={"/article"} />
              ) : (
                <Login />
              )
            }
          />
          <Route exact path="/post" element={<Post />} />
          <Route exact path="/postview" element={<PostView />} />
          <Route
            path="/article"
            element={
              localStorage.getItem("token") ? (
                <Article />
              ) : (
                <Navigate to={"/login"} />
              )
            }
            // element={code == 200 ? <Article /> : <Navigate to={"/login"} />}
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/table" element={<Table />} />
          <Route exact path="/page" element={<Page />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
