import React from "react";
import RecipeCard from './RecipeCard.js'
import ChefCard from './ChefCard.js'
import Filter from './Filter.js'


function DisplayCards ({ inRecipes, collectionData, selectedType, setSelectedType }) {
    return (
        <div>
            {inRecipes ? 
            <>
                <Filter selectedType={selectedType} setSelectedType={setSelectedType}/>
                <div className="cards-container">
                    {collectionData.map(data => {
                    return (
                        <RecipeCard key={data.id} data={data}/>
                    )
                })}
                </div>
            </> :
                <div className="cards-container">
                {collectionData.map(data => {
                return (
                    <ChefCard key={data.id} data={data}/>
                )
                })}
                </div>
            }
            
        </div>
    )
}

export default DisplayCards;