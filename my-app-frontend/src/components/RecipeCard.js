import React, { useState } from "react";
import { Link } from "react-router-dom"

function RecipeCard ({ recipe, chefs, onDeleteRecipe, setRecipes, recipes }) {

    const { name, instructions, ingredients, image_url, hours, chef_id, rating, id, isFavorited } = recipe
    // console.log(chefs, chef_id)
    // const chef = chefs.filter(chef => chef.id === chef_id)
    // console.log(chef)

    function handleDeleteRecipe(){
        fetch(`http://localhost:9292/recipes/${recipe.id}`, {
          method: 'DELETE'})
        .then(res => res.json())
        .then(deletedRecipe => onDeleteRecipe(deletedRecipe))}

    function handleClick(id){
        recipe.isFavorited ? 
            fetch(`http://localhost:9292/recipes/${id}`, {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                  isFavorited: false 
                })
              })
              .then(res => res.json)
            : 
            fetch(`http://localhost:9292/recipes/${id}`, {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                  isFavorited: true 
                })
              })
              .then(res => res.json)
          
        }

    return (
        <div className="card">
            <h3>{name} by chef name here</h3>
            <img className="card-img" src={image_url}></img>
            <br></br>
            <h4>Hours to Prepare: {hours} | Rating: {'⭐'.repeat(rating)}</h4>
            <Link to={`/recipes/${id}`}>Read More</Link>
            <br></br>
            <br></br>
            {isFavorited ? <button onClick={() => handleClick(id)} className="fav-btn">❤️ Favorited</button> : <button onClick={() => handleClick(id)}>🤍 Favorite this Recipe</button>} 
            {/* {isFavorited ? <button onClick={() => onFavorite(id)} className="fav-btn">❤️ Favorited</button> : <button onClick={() => onFavorite(id)}>🤍 Favorite this Recipe</button>}  */}
            <button className="recipe-btn" onClick={handleDeleteRecipe}>❌ Delete Recipe</button>
        </div>
    )
}

export default RecipeCard;