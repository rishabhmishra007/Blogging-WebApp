import React from "react";
import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddBlog from "./pages/AddBlog";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-blog" element={<AddBlog />}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </div>
  );
};

export default App;
