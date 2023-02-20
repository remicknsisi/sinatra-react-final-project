import React from "react";
import { Link } from "react-router-dom";

function Recipe ({ recipe }) {
    const { name, hours, id } = recipe

    return (
        <div className="recipe">
            <Link to={`/recipes/${id}`}>{name}</Link>
            <br/>
            Hours to Prepare: {hours}
        </div>
    )
}

export default Recipe;