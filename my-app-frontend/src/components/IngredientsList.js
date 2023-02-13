import React from "react";
import { useParams } from "react-router-dom";


function IngredientList ({ recipes }) {
    const { id } = useParams()
    const itemOfFocus = recipes.find(recipe => recipe.id == id)

    const ingredientsList = itemOfFocus.ingredients.split(', ').map(ingredient => {
        return(
            <li>{ingredient}</li>
        )
    })

    return (
        <div>
            <h2 className="ingredients-container">Ingredients:</h2>
            <ul className="ingredients">{ingredientsList}</ul>
        </div>
    )
}

export default IngredientList;