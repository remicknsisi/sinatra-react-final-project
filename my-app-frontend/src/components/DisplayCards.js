import React from "react";
import Card from './Card.js'
import Filter from './Filter.js'


function DisplayCards ({ recipes, selectedType, setSelectedType }) {
    return (
        <div>
            <Filter selectedType={selectedType} setSelectedType={setSelectedType}/>
            <div className="cards-container">
                {recipes.map(recipe => {
                    return (
                        <Card key={recipe.id} recipe={recipe}/>
                    )
                })}
            </div>
        </div>
    )
}

export default DisplayCards;