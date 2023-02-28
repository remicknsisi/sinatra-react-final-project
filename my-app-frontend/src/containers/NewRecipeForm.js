import React, { useState } from "react";
import { useParams } from "react-router-dom";

function NewRecipeForm ({ chefs, onSubmit }) {

    const [newName, setNewName] = useState('')
    const [newInstructions, setNewInstructions] = useState('')
    const [newImage, setNewImage] = useState('')
    const [newHours, setNewHours] = useState()
    const [newIngredients, setNewIngredients] = useState('')
    const [newCuisineType, setNewCuisineType] = useState('')

    const { chef_id } = useParams()
    const chef = chefs.find(chef => chef.id == chef_id)

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
    function handleCuisineTypeChange(e){
        setNewCuisineType(e.target.value)
    }

    function handleSubmitRecipe(e){
        e.preventDefault()

        const newRecipeCard = {
            name: newName,
            instructions: newInstructions,
            image_url: newImage,
            hours: newHours,
            ingredients: newIngredients,
            chef_id: chef_id,
            cuisine_type: newCuisineType,
            isFavorited: false
        }

        fetch(`http://localhost:9292/chefs/${chef_id}/recipes`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(
              newRecipeCard
            )
          })
          .then(res => res.json())
          .then(newRecipe => onSubmit(newRecipe))
    }


    return (
    <div className = "forms-container">
        <div className="recipe-form">
            <h3 className="form-headers"> Enter a new recipe here: 🍝 </h3>
            <form onSubmit={handleSubmitRecipe} className="recipe-form-container">
                <br></br>
                Name of Recipe: <input type="text" onChange={handleNameChange} value={newName} placeholder="Recipe Name" />
                <br></br>
                Instructions: <input type="text" onChange={handleInstructionsChange} value={newInstructions} placeholder="Instructions" />
                <br></br>
                Image URL: <input type="text" onChange={handleImageChange} value={newImage} placeholder="Image URL" />
                <br></br>
                Hours to Prepare: <input type="number" onChange={handleHoursChange} value={newHours} placeholder="Hours to Prep" />
                <br></br>
                Ingredients: <input type="text" onChange={handleIngredientsChange} value={newIngredients} placeholder="Ingredients (separated by commas)" />
                <br></br>
                Select Type: <select value={newCuisineType} onChange={handleCuisineTypeChange}>
                    <option value="dessert">Dessert</option>
                    <option value="sides">Side</option>
                    <option value="main">Main</option>
                </select>
                <br></br>
                By Chef: {chef.first_name} {chef.last_name}
                <br></br>
                <br></br>
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    </div>
    )
}

export default NewRecipeForm;