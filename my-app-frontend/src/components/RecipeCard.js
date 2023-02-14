import React, { useState } from "react";
import { Link } from "react-router-dom"

function RecipeCard ({ recipe, chefs, onDeleteRecipe, setRecipes, recipes, onFavoriteClick, reviews }) {

    const { name, image_url, hours, chef_id, id, isFavorited } = recipe
    const chef = chefs.filter(chef => chef.id === chef_id)
    const fullChefName = chef[0].first_name + ' ' + chef[0].last_name
    const reviewsOfFocus = reviews.filter(review => review.recipe_id == id)
    const averageRating = reviewsOfFocus.map(review => review.rating).reduce((sum, value) =>  
        {return sum + value}, 0) / reviewsOfFocus.length

    function handleDeleteRecipe(){
        fetch(`http://localhost:9292/recipes/${recipe.id}`, {
          method: 'DELETE'})
        .then(res => res.json())
        .then(deletedRecipe => onDeleteRecipe(deletedRecipe))}

    function handleClick(id){
        {recipe.isFavorited 
        ? 
            fetch(`http://localhost:9292/recipes/${id}`, {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                  'isFavorited': false 
                })
              })
              .then(res => res.json())
              .then(updatedRecipe => {
                const updatedRecipes = recipes.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe)
                setRecipes(updatedRecipes)
              })
            : 
            fetch(`http://localhost:9292/recipes/${id}`, {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                  'isFavorited': true 
                })
              })
              .then(res => res.json())
              .then(updatedRecipe => {
                const updatedRecipes = recipes.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe)
                setRecipes(updatedRecipes)
              })
            }
        }

    return (
        <div className="card">
            <h3>{name} by {fullChefName}</h3>
            <img className="card-img" src={image_url}></img>
            <br></br>
            <h4>Hours to Prepare: {hours} | Avg Rating: {'⭐'.repeat(averageRating)}</h4>
            <Link to={`/recipes/${id}`}>Read More</Link>
            <br></br>
            <br></br>
            {isFavorited ? <button onClick={() => handleClick(id)} className="fav-btn">❤️ Favorited</button> : <button onClick={() => handleClick(id)}>🤍 Favorite this Recipe</button>} 
            <button className="recipe-btn" onClick={handleDeleteRecipe}>❌ Delete Recipe</button>
        </div>
    )
}

export default RecipeCard;