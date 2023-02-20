import React from "react";
import RecipeCard from '../components/RecipeCard.js'
import ChefCard from '../components/ChefCard.js'
import Filter from '../components/Filter.js'
import Search from '../components/Search'


function DisplayCards ({ search, setSearch, inRecipes, collectionData, selectedType, onDeleteRecipe, setRecipes, onNewSelection, onDeleteChef }) {
    return (
        <div>
            {inRecipes ? 
            <>
                <Filter selectedType={selectedType} onNewSelection={onNewSelection}/>
                <div className="cards-container">
                    {collectionData.map(recipe => {
                    return (
                        <RecipeCard key={recipe.id} setRecipes={setRecipes} recipe={recipe} onDeleteRecipe={onDeleteRecipe} recipes={collectionData}/>
                    )
                })}
                </div>
            </> :
            <>
                <Search search={search} setSearch={setSearch}/>
                <div className="cards-container">
                {collectionData.map(chef => {
                return (
                    <ChefCard key={chef.id} onDeleteChef={onDeleteChef} chef={chef}/>
                )
                })}
                </div>
            </>
            }
            
        </div>
    )
}

export default DisplayCards;