import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/about">About Page</Link>
        </li>
        <li>
          <Link to="/admin">Admin Main Page</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
