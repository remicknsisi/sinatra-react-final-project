import React from "react";
import RecipeCard from './RecipeCard.js'
import ChefCard from './ChefCard.js'
import Filter from './Filter.js'


function DisplayCards ({ inRecipes, collectionData, selectedType, setSelectedType, onDeleteRecipe, setRecipes }) {
    return (
        <div>
            {inRecipes ? 
            <>
                <Filter selectedType={selectedType} setSelectedType={setSelectedType}/>
                <div className="cards-container">
                    {collectionData.map(recipe => {
                    return (
                        <RecipeCard key={recipe.id} setRecipes={setRecipes} recipe={recipe} onDeleteRecipe={onDeleteRecipe} recipes={collectionData}/>
                    )
                })}
                </div>
            </> :
                <div className="cards-container">
                {collectionData.map(chef => {
                return (
                    <ChefCard key={chef.id} chef={chef}/>
                )
                })}
                </div>
            }
            
        </div>
    )
}

export default DisplayCards;