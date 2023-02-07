import React from "react";
import { useParams } from "react-router-dom";

function CardDetails ({ dataForDetails, isRecipe }) {
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
                <p>All Recipes and Ratings:</p>
                <button>✏️ Edit Chef</button>
            </>
            }
        </div>
    )
}

export default CardDetails;