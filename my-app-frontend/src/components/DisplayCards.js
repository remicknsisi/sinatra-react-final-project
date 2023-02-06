import React from "react";
import Card from './Card.js'

function DisplayCards ({ recipes }) {
    return (
        <div className="cards-container">
            {recipes.map(recipe => {
                return (
                    <Card key={recipe.id} recipe={recipe}/>
                )
            })}
        </div>
    )
}

export default DisplayCards;