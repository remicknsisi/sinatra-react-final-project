import React from "react";
import { Link } from "react-router-dom";

function Recipe ({ recipe }) {
    const { name, hours, id, chef_id } = recipe

    return (
        <div className="recipes">
            <Link to={`/chefs/${chef_id}/recipes/${id}`}>{name}</Link>
            <br/>
            Hours to Prepare: {hours}
        </div>
    )
}

export default Recipe;