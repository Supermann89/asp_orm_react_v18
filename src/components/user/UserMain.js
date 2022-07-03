import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import NotFound from "../common/NotFound";

const UserMain = () => {
  return (
    <>
      <h1>UserMain</h1>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </>
  );
};

export default UserMain;
