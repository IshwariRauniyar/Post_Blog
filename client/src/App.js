import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
// import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "./assets/css/style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Post from "./pages/Post";
import PostView from "./pages/PostView";
import Article from "./pages/Articles";
import Table from "./pages/Table";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/post" element={<Post />} />
          <Route exact path="/postview" element={<PostView />} />
          <Route exact path="/article" element={<Article />} />
          <Route exact path="/table" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
