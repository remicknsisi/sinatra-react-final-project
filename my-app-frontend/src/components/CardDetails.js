import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import NewCommentForm from './NewCommentForm.js'

function CardDetails ({ dataForDetails, isRecipe, recipes, reviews, comment, setComment, onPostComment }) {
    const [isHidden, setIsHidden] = useState(true)
    const { id } = useParams()
    const itemOfFocus = dataForDetails.find(item => item.id == id)
    const reviewsOfFocus = reviews.filter(review => review.recipe_id == id)

    const averageRating = reviewsOfFocus.map(review => review.rating).reduce((sum, value) =>  
        {return sum + value}, 0) / reviewsOfFocus.length
    
    function handleEditRecipe(){
        fetch(`http://localhost:9292/recipes/${id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                //need to figure this out here and make one for editChefs
            })
        })
        .then(res => res.json())
        .then(updatedRecipe => console.log(updatedRecipe))
    }

    const chefRecipes = recipes.filter(recipe => recipe.chef_id === itemOfFocus.id)

    function handleShowAll(){
        setIsHidden(!isHidden)
    }

    const instructionsList = itemOfFocus.instructions.split('. ').map(step => {
        return(
            <li>{step}</li>
        )
    })
    console.log(instructionsList)

    return (
        <div className="card-details">
            {isRecipe ? 
            <> 
                <h1>{itemOfFocus.name}</h1>
                <img className="card-img" src={itemOfFocus.image_url}></img>
                <br></br>
                <h3>Hours to Prepare: {itemOfFocus.hours} | Average Rating: {'⭐'.repeat(Math.round(averageRating))}</h3>
                <h2>Ingredients:</h2>
                <p>{itemOfFocus.ingredients}</p>
                <h2>Instructions:</h2>
                <ol type="1" className="instructions">{instructionsList}
                    {/* {itemOfFocus.instructions} */}
                </ol>
                <button onClick={handleEditRecipe}>✏️ Edit Recipe</button>
                <br></br>
                <div className="reviews-container">
                    <h3 className="reviews-header">Reviews</h3>
                    {reviewsOfFocus === [] ? 
                    <>
                        <p>"No reviews yet!"</p>
                        {/* need to fix this */}
                    </>
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
                <p className="instructions">"bio"</p>
                {isHidden ? 
                <div>
                    <p>Show All Recipes and Ratings:</p>
                    <button onClick={() => handleShowAll()} >v</button> 
                </div>
                :
                <div>
                    <p>Hide All Recipes and Ratings:</p>
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
                <br></br>
                <button>✏️ Edit Chef</button>
            </>
            }
        </div>
    )
}

export default CardDetails;