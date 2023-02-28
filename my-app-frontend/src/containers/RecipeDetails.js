import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewCommentForm from './NewCommentForm.js';
import Review from "../components/Review.js";

function RecipeDetails () {
    const [recipe, setRecipe] = useState({
        reviews: []
    })

    const { chef_id, id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:9292/chefs/${chef_id}/recipes/${id}`)
        .then(res => res.json())
        .then(recipeData => setRecipe(recipeData))
    }, []) 

    const comments = recipe.reviews.map(review => review)

    const averageRating = recipe.reviews.map(review => review.rating).reduce((sum, value) => {return sum + value}, 0) / recipe.reviews.length

    const reviews = recipe.reviews.map(review => <Review onDeleteReview={handleDeleteReview} key={review.id} review={review}/>)

    function handleDeleteReview(deletedReview){
        const reviewsToDisplay = recipe.reviews.filter(review => review.id !== deletedReview.id)
        const recipeWithUpdatedReviews = {...recipe, reviews: reviewsToDisplay}
        setRecipe(recipeWithUpdatedReviews)
    }
    function handlePostComment(newComment){
        const reviewsToDisplay = [...comments, newComment]
        const recipeWithUpdatedReviews = {...recipe, reviews: reviewsToDisplay}
        setRecipe(recipeWithUpdatedReviews)
    }

    return (
        <div className="card-details">
            <> 
                <h1>{recipe.name}</h1>
                <img className="card-img-food" src={recipe.image_url}></img>
                <br></br>
                <h3>Hours to Prepare: {recipe.hours} | Average Rating: {'⭐'.repeat(Math.round(averageRating))}</h3>
                <h2 className="ingredients-container">Ingredients:</h2>
                    <ul className="ingredients">
                        {!recipe.ingredients ? null : recipe.ingredients.split(', ').map(ingredient => {
                            return (<li key={ingredient}>{ingredient}</li>)
                        })}
                    </ul>
                <br></br>
                <h2 >Instructions:</h2>
                    <ol type="1" className="instructions">
                        {!recipe.instructions ? null : recipe.instructions.split('. ').map(step => {
                            return(<li key={step}>{step}</li>)
                        })}
                    </ol>
                <br></br>
                <div className="reviews-container">
                    <h3 className="reviews-header">Reviews</h3>
                    <>
                    {reviews}
                    </>
                </div>
                <NewCommentForm onPostComment={handlePostComment}/>
            </>
        </div>
    )
}


export default RecipeDetails;