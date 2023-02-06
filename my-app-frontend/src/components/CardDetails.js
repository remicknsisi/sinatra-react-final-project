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
                <h3>{itemOfFocus.name}</h3>
                <img className="card-img" src={itemOfFocus.image_url}></img>
                <br></br>
                <p>Hours to Prepare: {itemOfFocus.hours}</p>
                Ingredients:<p>{itemOfFocus.ingredients}</p>
                Instructions:<p>{itemOfFocus.instructions}</p>
                <p>Rating: {itemOfFocus.rating}</p>
                <button onClick={handleEditRecipe}>Edit Recipe</button>
            </>
            :
            <>
                <h3>{itemOfFocus.first_name} {itemOfFocus.last_name}</h3>
                <img className="card-img" src={itemOfFocus.image_url}></img>
                <br></br>
                <p>Age: {itemOfFocus.age}</p>
                <p>All Recipes and Ratings:</p>
                <button>Edit Chef</button>
            </>
            }
        </div>
    )
}

export default CardDetails;