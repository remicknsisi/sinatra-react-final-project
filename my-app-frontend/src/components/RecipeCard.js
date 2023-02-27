import React from "react";
import { Link } from "react-router-dom"

function RecipeCard ({ recipe, onDeleteRecipe, setRecipes, recipes }) {

    const { name, image_url, hours, id, isFavorited, reviews, chef_id } = recipe
    const averageRating = reviews.map(review => review.rating).reduce((sum, value) =>  
        {return sum + value}, 0) / reviews.length

    function handleDeleteRecipe(){
        fetch(`http://localhost:9292/recipes/${id}`, {
          method: 'DELETE'})
        .then(res => res.json())
        .then(deletedRecipe => onDeleteRecipe(deletedRecipe))
    }

    function handleClick(){
      fetch(`http://localhost:9292/recipes/${id}`, {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                  isFavorited: !recipe.isFavorited 
                 })
               })
               .then(res => res.json())
               .then(updatedRecipe => {
                 const updatedRecipes = recipes.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe)
                 setRecipes(updatedRecipes)
              })
      }
//add edit function for another attribute(s)


    return (
        <div className="card">
            <h3>{name}</h3>
            <img className="card-img-food" src={image_url}></img>
            <br></br>
            <h4>Hours to Prepare: {hours} | Avg Rating: {!reviews ? null : '⭐'.repeat(averageRating)}</h4>
            <Link to={`/recipes/${id}`}>Read More</Link>
            <br></br>
            <br></br>
            {isFavorited ? <button onClick={() => handleClick(id)} className="fav-btn">❤️ Favorited</button> : <button onClick={() => handleClick(id)}>🤍 Favorite this Recipe</button>} 
            <button className="recipe-btn" onClick={handleDeleteRecipe}>❌ Delete Recipe</button>
        </div>
    )
}

export default RecipeCard;