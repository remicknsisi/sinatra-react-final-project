import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/collection" className="nav-link">Collection</NavLink>
        <NavLink to="/form" className="nav-link">Add New</NavLink>
    </div>
  );
}

export default NavBar;