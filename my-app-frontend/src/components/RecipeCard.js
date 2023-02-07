import React from "react";
import { Link } from "react-router-dom"

function RecipeCard ({ recipe, chefs, onDeleteRecipe, setRecipes, recipes }) {

    const { name, instructions, ingredients, image_url, hours, chef_id, rating, id } = recipe
    // console.log(chefs)
    // const chef = chefs.filter(chef => chef.id === chef_id)

    function handleDeleteRecipe(){
        fetch(`http://localhost:9292/recipes/${recipe.id}`, {
          method: 'DELETE',
          headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(deletedRecipe => {
            const recipesToDisplay = recipes.filter(recipe => recipe !== deletedRecipe)
            setRecipes(recipesToDisplay)})
        }


    return (
        <div className="card">
            <h3>{name} by chef name here</h3>
            <img className="card-img" src={image_url}></img>
            <br></br>
            <p>Hours to Prepare: {hours}</p>
            Ingredients:<p>{ingredients}</p>
            Instructions:<p>{instructions}</p>
            <p>Rating: {rating}</p>
            <Link to={`/recipes/${id}`}>Read More</Link>
            <button onClick={handleDeleteRecipe}>Delete Recipe</button>
        </div>
    )
}

export default RecipeCard;