import React from "react";

function IngredientList ({ ingredients }) {

    const ingredientsList = ingredients.split(', ').map(ingredient => {
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