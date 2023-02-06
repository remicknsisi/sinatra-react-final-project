import React, { useState } from "react";

function NewCardForm ({ onSubmit }) {

    const [newName, setNewName] = useState('')
    const [newInstructions, setNewInstructions] = useState('')
    const [newImage, setNewImage] = useState('')
    const [newHours, setNewHours] = useState(0)
    const [newIngredients, setNewIngredients] = useState('')
    const [newRating, setNewRating] = useState(0)

    function handleNameChange(e){
        setNewName(e.target.value)
    }
    function handleInstructionsChange(e){
        setNewInstructions(e.target.value)
    }
    function handleImageChange(e){
        setNewImage(e.target.value)
    }
    function handleHoursChange(e){
        setNewHours(e.target.value)
    }
    function handleIngredientsChange(e){
        setNewIngredients(e.target.value)
    }
    function handleRatingChange(e){
        setNewRating(e.target.value)
    }

    function handleSubmitRecipe(e){
        e.preventDefault()

        const newCard = {
            name: newName,
            instructions: newInstructions,
            image_url: newImage,
            hours: newHours,
            ingredients: newIngredients,
            rating: newRating
        }

        onSubmit(newCard)
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmitRecipe}>
                <input type="text" onChange={handleNameChange} value={newName} placeholder="Recipe Name" />
                <input type="text" onChange={handleInstructionsChange} value={newInstructions} placeholder="Instructions" />
                <input type="text" onChange={handleImageChange} value={newImage} placeholder="Image URL" />
                <input type="number" onChange={handleHoursChange} value={newHours} placeholder="Hours to Prep" />
                <input type="text" onChange={handleIngredientsChange} value={newIngredients} placeholder="Ingredients (separated by commas)" />
                <input type="number" onChange={handleRatingChange} value={newRating} placeholder="Rating out of 5" />
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    )
}

export default NewCardForm;