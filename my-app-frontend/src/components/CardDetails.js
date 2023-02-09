import React, { useState } from "react";
import { useParams } from "react-router-dom";

function CardDetails ({ dataForDetails, isRecipe, recipes }) {
    const [isHidden, setIsHidden] = useState(true)
    const { id } = useParams()
    const itemOfFocus = dataForDetails.find(item => item.id == id)

    function handleEditRecipe(){
        fetch(`http://localhost:9292/recipes/${id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                //need to figure this out here and make one for editChefs
            })
        })
        .then(res => res.json())
        .then(updatedRecipe => console.log(updatedRecipe))
    }

    const chefRecipes = recipes.filter(recipe => recipe.chef_id === itemOfFocus.id)

    function handleShowAll(){
        setIsHidden(!isHidden)
    }

    return (
        <div className="card-details">
            {isRecipe ? 
            <> 
                <h1>{itemOfFocus.name}</h1>
                <img className="card-img" src={itemOfFocus.image_url}></img>
                <br></br>
                <h3>Hours to Prepare: {itemOfFocus.hours} | Rating: {'⭐'.repeat(itemOfFocus.rating)}</h3>
                <h2>Ingredients:</h2>
                <p>{itemOfFocus.ingredients}</p>
                <h2>Instructions:</h2>
                <p className="instructions">{itemOfFocus.instructions}</p>
                <button onClick={handleEditRecipe}>✏️ Edit Recipe</button>
            </>
            :
            <>
                <h2>{itemOfFocus.first_name} {itemOfFocus.last_name}</h2>
                <img className="card-img" src={itemOfFocus.image}></img>
                <br></br>
                <p>Age: {itemOfFocus.age}</p>
                {isHidden ? 
                <div>
                    <p>Show All Recipes and Ratings:</p>
                    <button onClick={() => handleShowAll()} >v</button> 
                </div>
                :
                <div>
                    <p>Hide All Recipes and Ratings:</p>
                    <button onClick={() => handleShowAll()} >v</button> 
                    {chefRecipes.map(chefRecipe => {
                        return(
                            <div>
                                <h4>{chefRecipe.name}</h4>
                                <p>Hours to Prepare: {chefRecipe.hours} | Rating: {'⭐'.repeat(chefRecipe.rating)}</p>
                            </div>
                        )
                    })}
                </div>
                }
                <br></br>
                <button>✏️ Edit Chef</button>
            </>
            }
        </div>
    )
}

export default CardDetails;