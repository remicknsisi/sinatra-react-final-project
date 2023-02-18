import React, { useState } from "react";
import ListOfChefIds from "./ListOfChefIds.js";


function NewCardForm ({ onSubmit, onChefSubmit, chefs }) {

    const [newName, setNewName] = useState('')
    const [newInstructions, setNewInstructions] = useState('')
    const [newImage, setNewImage] = useState('')
    const [newHours, setNewHours] = useState()
    const [newIngredients, setNewIngredients] = useState('')
    const [newCuisineType, setNewCuisineType] = useState('')
    const [newChefId, setNewChefId] = useState()
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newAge, setNewAge] = useState()
    const [newChefImage, setNewChefImage] = useState('')
    const [newBio, setNewBio] = useState('')


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
    function handleBioChange(e){
        setNewBio(e.target.value)
    }

    function handleSubmitRecipe(e){
        e.preventDefault()

        const newRecipeCard = {
            name: newName,
            instructions: newInstructions,
            image_url: newImage,
            hours: newHours,
            ingredients: newIngredients,
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
            image: newChefImage,
            bio: newBio
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
    <div className = "forms-container">
        <div className="recipe-form">
            <h3 className="form-headers"> Enter a new recipe here: 🍝 </h3>
            <form onSubmit={handleSubmitRecipe} className="recipe-form-container">
                Note: * Indicates a required field.
                <br></br>
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
                *ID of Chef: <input type="number" onChange={handleChefChange} value={newChefId} placeholder="Refer to ID KEY"/>
                <p>If you are entering a recipe by a new chef, be sure to submit the chef in the Chef form first!</p>
                <br></br>
                <button type="submit">Create Recipe</button>
            </form>
        </div>
        <br></br>
        <div className="chef-form">
            <h3 className="form-headers"> Enter a new chef here: 👨‍🍳 </h3>
            <form onSubmit={handleSubmitChef} className="chef-form-container">
                    First Name: <input type="text" onChange={handleFirstNameChange} value={newFirstName} placeholder="First Name" />
                    <br></br>
                    Last Name: <input type="text" onChange={handleLastNameChange} value={newLastName} placeholder="Last Name" />
                    <br></br>
                    Image URL: <input type="text" onChange={handleChefImageChange} value={newChefImage} placeholder="Image URL" />
                    <br></br>
                    Age of Chef: <input type="number" onChange={handleAgeChange} value={newAge} placeholder="Age of Chef" />
                    <br></br>
                    Bio: <input type="text" onChange={handleBioChange} value={newBio} placeholder="Bio" />
                    <br></br>
                    <br></br>
                    <button type="submit">Create Chef</button>
            </form>
        </div>
        <ListOfChefIds chefs={chefs}/>
    </div>
    )
}

export default NewCardForm;