import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewCommentForm from './NewCommentForm.js';
import Review from "../components/Review.js";
import IngredientList from "../components/IngredientsList.js";
import Instructions from "../components/Instructions.js";

function RecipeDetails ({ onPostComment }) {
    const [recipe, setRecipe] = useState({
        reviews: []
    })
    const { id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:9292/recipes/${id}`)
        .then(res => res.json())
        .then(recipeData => console.log(recipeData))
    }, []) 

    const averageRating = recipe.reviews.map(review => review.rating).reduce((sum, value) => {return sum + value}, 0) / recipe.reviews.length

    const reviews = recipe.reviews.map(review => <Review key={review.id} review={review}/>)

    console.log(recipe)

    return (
        <div className="card-details">
            <> 
                <h1>{recipe.name}</h1>
                <img className="card-img" src={recipe.image_url}></img>
                <br></br>
                <h3>Hours to Prepare: {recipe.hours} | Average Rating: {'⭐'.repeat(Math.round(averageRating))}</h3>
                {/* <IngredientList ingredients={recipe.ingredients} />
                <Instructions instructions={recipe.instructions} /> */}
                <br></br>
                <div className="reviews-container">
                    <h3 className="reviews-header">Reviews</h3>
                    {recipe.reviews.length === 0 ? <p>"No reviews yet!"</p>
                    // need to fix
                    :
                    <>
                    {recipe.reviews.map(review => {
                        return (
                            <div className="reviews" key={review.id}>
                                <h4>{review.author_name} | Rating: {'⭐'.repeat(review.rating)}</h4>
                                <p>{review.comment}</p>
                            </div>
                        )
                    })}
                    </>
                    }
                </div>
                {reviews}
                <NewCommentForm onPostComment={onPostComment} />
            </>
        </div>
    )
}

export default RecipeDetails;