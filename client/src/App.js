import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Post from "./pages/Post";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/post" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
