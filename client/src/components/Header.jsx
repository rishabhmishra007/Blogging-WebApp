import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex p-7">
      <h3 className="flex-1 text-xl font-bold cursor-pointer">
        <Link to={"/"}>MERN Blog App</Link>
      </h3>

      <ul className="flex list-none gap-[20px]">
        <Link to={"/"}>
          <li className="text-lg font-bold cursor-pointer">Home</li>
        </Link>
        <Link to={"/add-blog"}>
          {" "}
          <li className="text-lg font-bold cursor-pointer">Add Blog</li>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
