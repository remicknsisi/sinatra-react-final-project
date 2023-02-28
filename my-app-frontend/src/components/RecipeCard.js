import React from "react";
import { Link } from "react-router-dom"

function RecipeCard ({ setChefs, recipe, chefs, onDeleteRecipe, onClickFavorite }) {

    const { name, image_url, hours, id, isFavorited, reviews, chef_id } = recipe
    // const averageRating = reviews.map(review => review.rating).reduce((sum, value) =>  
    //     {return sum + value}, 0) / reviews.length

    function handleDeleteRecipe(){
        fetch(`http://localhost:9292/recipes/${recipe.id}`, {
          method: 'DELETE'})
        .then(res => res.json())
        .then(deletedRecipe => {
          onDeleteRecipe(deletedRecipe)
        }
        )
    }

    function handleClick(){
      fetch(`http://localhost:9292/chefs/${recipe.chef_id}/recipes/${recipe.id}`, {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                  isFavorited: !recipe.isFavorited 
                 })
               })
               .then(res => res.json())
               .then(updatedRecipe => onClickFavorite(updatedRecipe)
              )
      }
//add edit function for another attribute(s)

    return (
        <div className="card">
            <h3>{name}</h3>
            <img className="card-img-food" src={image_url}></img>
            <br></br>
            {/* <h4>Hours to Prepare: {hours} | Avg Rating: {'⭐'.repeat(averageRating)}</h4> */}
            {/* <h4>Hours to Prepare: {hours} | Avg Rating: {
            !reviews 
            ? 
            null 
            : 
            '⭐'.repeat(reviews.map(review => review.rating).reduce((sum, value) =>  
            {return sum + value}, 0) / reviews.length)
            }</h4> */}
            <Link to={`/chefs/${chef_id}/recipes/${id}`}>Read More</Link>
            <br></br>
            <br></br>
            {isFavorited ? <button onClick={() => handleClick(recipe)} className="fav-btn">❤️ Favorited</button> : <button onClick={() => handleClick(recipe)}>🤍 Favorite this Recipe</button>} 
            <button className="recipe-btn" onClick={handleDeleteRecipe}>❌ Delete Recipe</button>
        </div>
    )
}

export default RecipeCard;