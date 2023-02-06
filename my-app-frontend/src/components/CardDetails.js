import React from "react";
import { useParams } from "react-router-dom";

function CardDetails ({ recipes }) {
    const { id } = useParams()
    const recipeDetails = recipes.find(recipe => recipe.id == id)
    console.log(recipeDetails)

    return (
        <div className="card-details">
            Details here
            <p>{recipeDetails.name}</p>
            <p>{recipeDetails.instructions}</p>
            <p>{recipeDetails.hours}</p>
            <p>{recipeDetails.ingredients}</p>
            <p>{recipeDetails.rating}</p>
            include chef
        </div>
    )
}

export default CardDetails;