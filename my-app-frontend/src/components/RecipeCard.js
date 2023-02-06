import React from "react";
import { Link } from "react-router-dom"

function RecipeCard ({ data, chefs }) {

    const { name, instructions, ingredients, image_url, hours, chef_id, rating, id } = data
    // console.log(chefs)
    // const chef = chefs.filter(chef => chef.id === chef_id)

    return (
        <div className="card">
            <h3>{name} by chef name here</h3>
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