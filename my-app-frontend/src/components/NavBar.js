import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/recipes" className="nav-link">Recipes</NavLink>
        <NavLink to="/chefs" className="nav-link">Chefs</NavLink>
        <NavLink to="/chefs/new" className="nav-link">Add New Chef</NavLink>
    </div>
  );
}

export default NavBar;