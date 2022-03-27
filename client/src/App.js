import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Post from "./pages/Post";
import PostView from "./pages/PostView";
import Article from "./pages/Articles";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/post" element={<Post />} />
          <Route exact path="/postview" element={<PostView />} />
          <Route exact path="/article" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
