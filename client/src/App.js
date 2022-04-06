import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/css/demo.css";
import "./assets/css/style.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Post from "./pages/Post";
import PostView from "./pages/PostView";
import Article from "./pages/Articles";
import Table from "./pages/Table";
import Register from "./pages/Register";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route
            exact
            path="/login"
            element={
              localStorage.getItem("token") ? (
                <Navigate to={"/article"} />
              ) : (
                <Login />
              )
            }
          /> */}
          <Route path="/login" element={<Login />} />
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
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/table" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
