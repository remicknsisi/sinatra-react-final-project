import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewCommentForm from './NewCommentForm.js';
import Review from "../components/Review.js";
import IngredientList from "../components/IngredientsList.js";
import Instructions from "../components/Instructions.js";

function RecipeDetails () {
    const [recipe, setRecipe] = useState({
        reviews: []
    })
    // const [allReviews, setAllReviews] = useState([])
    const { id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:9292/recipes/${id}`)
        .then(res => res.json())
        .then(recipeData => setRecipe(recipeData))
    }, []) 

    // useEffect(() => {
    //     fetch(`http://localhost:9292/reviews`)
    //     .then(res => res.json())
    //     .then(reviewData => setAllReviews(reviewData))
    // }, []) 

    function handleDeleteReview(deletedReview){
        const reviewsToDisplay = recipe.reviews.filter(review => review.id !== deletedReview.id)
        const recipeWithUpdatedReviews = {...recipe, reviews: reviewsToDisplay}
        
        setRecipe(recipeWithUpdatedReviews)
    }

    const averageRating = recipe.reviews.map(review => review.rating).reduce((sum, value) => {return sum + value}, 0) / recipe.reviews.length

    const reviews = recipe.reviews.map(review => <Review onDeleteReview={handleDeleteReview} key={review.id} review={review}/>)
    //the reviews i am rendering are dependent on the recipe.reviews state, not the allReviews state.

    function handlePostComment(newComment){
        // setAllReviews([...allReviews, newComment])
      }

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
                    {reviews}
                    </>
                    }
                </div>
                <NewCommentForm onPostComment={handlePostComment}/>
            </>
        </div>
    )
}

export default RecipeDetails;