import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import NewCommentForm from './NewCommentForm.js'
import IngredientList from "./IngredientsList.js";
import Instructions from "./Instructions.js";

function CardDetails ({ dataForDetails, isRecipe, recipes, reviews, comment, setComment, onPostComment }) {
    const [isHidden, setIsHidden] = useState(true)
    const { id } = useParams()
    const itemOfFocus = dataForDetails.find(item => item.id == id)
    const reviewsOfFocus = reviews.filter(review => review.recipe_id == id)
    const averageRating = reviewsOfFocus.map(review => review.rating).reduce((sum, value) =>  
        {return sum + value}, 0) / reviewsOfFocus.length
    const chefRecipes = recipes.filter(recipe => recipe.chef_id === itemOfFocus.id)

    function handleShowAll(){
        setIsHidden(!isHidden)
    }

    return (
        <div className="card-details">
            {isRecipe ? 
            <> 
                <h1>{itemOfFocus.name}</h1>
                <img className="card-img" src={itemOfFocus.image_url}></img>
                <br></br>
                <h3>Hours to Prepare: {itemOfFocus.hours} | Average Rating: {'⭐'.repeat(Math.round(averageRating))}</h3>
                <IngredientList recipes={dataForDetails} />
                <Instructions recipes={dataForDetails} />
                <br></br>
                <div className="reviews-container">
                    <h3 className="reviews-header">Reviews</h3>
                    {reviewsOfFocus.length === 0 ? <p>"No reviews yet!"</p>
                    // need to fix
                    :
                    <>
                    {reviewsOfFocus.map(review => {
                        return (
                            <div className="reviews">
                                <h4>{review.author_name} | Rating: {'⭐'.repeat(review.rating)}</h4>
                                <p>{review.comment}</p>
                            </div>
                        )
                    })}
                    </>
                    }
                </div>
                <NewCommentForm onPostComment={onPostComment} comment={comment} setComment={setComment}/>
            </>
            :
            <>
                <h2>{itemOfFocus.first_name} {itemOfFocus.last_name}</h2>
                <img className="chef-card-img" src={itemOfFocus.image}></img>
                <br></br>
                <h3>Years Cooking: {itemOfFocus.years_cooking} | Age: {itemOfFocus.age}</h3>
                <h2>Biography:</h2>
                <p className="instructions">{itemOfFocus.bio}</p>
                {isHidden ? 
                <div>
                    <p>Show All Recipes by {itemOfFocus.first_name} {itemOfFocus.last_name}:</p>
                    <button onClick={() => handleShowAll()} >v</button> 
                </div>
                :
                <div>
                    <p>Hide All Recipes by {itemOfFocus.first_name} {itemOfFocus.last_name}:</p>
                    <button onClick={() => handleShowAll()} >v</button> 
                    {chefRecipes.map(chefRecipe => {
                        return(
                            <div>
                                <Link to={`/recipes/${chefRecipe.id}`}>{chefRecipe.name}</Link>
                                <p>Hours to Prepare: {chefRecipe.hours} | Rating: {'⭐'.repeat(averageRating)}</p>
                            </div>
                        )
                    })}
                </div>
                }
            </>
            }
        </div>
    )
}

export default CardDetails;