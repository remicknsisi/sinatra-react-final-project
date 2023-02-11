import React from "react";
import RecipeCard from './RecipeCard.js'
import ChefCard from './ChefCard.js'
import Filter from './Filter.js'
import Search from './Search'


function DisplayCards ({ search, setSearch, inRecipes, collectionData, onFavoriteClick, selectedType, setSelectedType, onDeleteRecipe, setRecipes, chefs, onNewSelection, onDeleteChef }) {
    return (
        <div>
            {inRecipes ? 
            <>
                <Filter selectedType={selectedType} setSelectedType={setSelectedType} onNewSelection={onNewSelection}/>
                <div className="cards-container">
                    {collectionData.map(recipe => {
                    return (
                        <RecipeCard key={recipe.id} onFavoriteClick={onFavoriteClick} chefs={chefs} setRecipes={setRecipes} recipe={recipe} onDeleteRecipe={onDeleteRecipe} recipes={collectionData}/>
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