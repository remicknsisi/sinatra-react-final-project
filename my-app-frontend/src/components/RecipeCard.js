import React from "react";
import { Link } from "react-router-dom"

function RecipeCard ({ data }) {

    const { name, instructions, ingredients, image_url, hours, chef_id, rating, id } = data

    return (
        <div className="card">
            <h3>{name}</h3>
            <img className="card-img" src={image_url}></img>
            <br></br>
            <p>Hours to Prepare: {hours}</p>
            Ingredients:<p>{ingredients}</p>
            Instructions:<p>{instructions}</p>
            <p>Rating: {rating}</p>
            <Link to={`/recipes/${id}`}>Read More</Link>
        </div>
    )
}

export default RecipeCard;