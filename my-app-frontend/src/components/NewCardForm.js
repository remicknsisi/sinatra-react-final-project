import React, { useState } from "react";

function NewCardForm ({ onSubmit, onChefSubmit }) {

    const [newName, setNewName] = useState('')
    const [newInstructions, setNewInstructions] = useState('')
    const [newImage, setNewImage] = useState('')
    const [newHours, setNewHours] = useState(0)
    const [newIngredients, setNewIngredients] = useState('')
    const [newRating, setNewRating] = useState(0)
    const [newCuisineType, setNewCuisineType] = useState('')
    const [newChefId, setNewChefId] = useState(0)
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newAge, setNewAge] = useState(0)
    const [newChefImage, setNewChefImage] = useState('')


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
    function handleCuisineTypeChange(e){
        setNewCuisineType(e.target.value)
    }
    function handleChefChange(e){
        setNewChefId(e.target.value)
    }
    function handleFirstNameChange(e){
        setNewFirstName(e.target.value)
    }
    function handleLastNameChange(e){
        setNewLastName(e.target.value)
    }
    function handleAgeChange(e){
        setNewAge(e.target.value)
    }
    function handleChefImageChange(e){
        setNewChefImage(e.target.value)
    }

    function handleSubmitRecipe(e){
        e.preventDefault()

        const newRecipeCard = {
            name: newName,
            instructions: newInstructions,
            image_url: newImage,
            hours: newHours,
            ingredients: newIngredients,
            average_rating: newRating,
            chef_id: newChefId,
            cuisine_type: newCuisineType,
            isFavorited: false
        }

        fetch(`http://localhost:9292/recipes`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(
              newRecipeCard
            )
          })
          .then(res => res.json())
          .then(newRecipe => onSubmit(newRecipe))
    }

    function handleSubmitChef(e){
        e.preventDefault()

        const newChefCard = {
            first_name: newFirstName,
            last_name: newLastName,
            age: newAge,
            image: newChefImage
        }

        fetch(`http://localhost:9292/chefs`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(
              newChefCard
            )
          })
          .then(res => res.json())
          .then(newChef => onChefSubmit(newChef))
    }

    return (
    <>
        <div className="recipe-form">
            <h3 className="form-headers"> Enter a new recipe here: 🍝 </h3>
            <form onSubmit={handleSubmitRecipe}>
                <input type="text" onChange={handleNameChange} value={newName} placeholder="Recipe Name" />
                <input type="text" onChange={handleInstructionsChange} value={newInstructions} placeholder="Instructions" />
                <input type="text" onChange={handleImageChange} value={newImage} placeholder="Image URL" />
                <input type="number" onChange={handleHoursChange} value={newHours} placeholder="Hours to Prep" />
                <input type="text" onChange={handleIngredientsChange} value={newIngredients} placeholder="Ingredients (separated by commas)" />
                <input type="number" onChange={handleRatingChange} value={newRating} placeholder="Rating out of 5" />
                <input type="text" onChange={handleCuisineTypeChange} value={newCuisineType} placeholder="main, dessert, or sides?" />
                <input type="number" onChange={handleChefChange} value={newChefId} placeholder="Chef Id" />
                <button type="submit">Create Recipe</button>
                {/* make this last option a drop down */}
            </form>
        </div>
        <br></br>
        <div className="chef-form">
            <h3 className="form-headers"> Enter a new chef here: 👨‍🍳 </h3>
            <form onSubmit={handleSubmitChef}>
                    <input type="text" onChange={handleFirstNameChange} value={newFirstName} placeholder="First Name" />
                    <input type="text" onChange={handleLastNameChange} value={newLastName} placeholder="Last Name" />
                    <input type="text" onChange={handleChefImageChange} value={newChefImage} placeholder="Image URL" />
                    <input type="number" onChange={handleAgeChange} value={newAge} placeholder="Age of Chef" />
                    <button type="submit">Create Chef</button>
            </form>
        </div>
    </>
    )
}

export default NewCardForm;