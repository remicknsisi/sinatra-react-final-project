import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Recipe from "../components/Recipe.js"

function ChefDetails () {
    const [chef, setChef] = useState({
        recipes: []
    })
    const [isHidden, setIsHidden] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:9292/chefs/${id}`)
        .then(res => res.json())
        .then(chefData => setChef(chefData))
    }, []) 

    const recipes = chef.recipes.map(recipe => <Recipe key={recipe.id} recipe={recipe}/>)

    function handleShowAll(){
        setIsHidden(!isHidden)
    }

    return (
        <div className="card-details">
                <h2>{chef.first_name} {chef.last_name}</h2>
                <img className="chef-card-img" src={chef.image}></img>
                <br></br>
                <h3>Years Cooking: {chef.years_cooking} | Age: {chef.age}</h3>
                <h2>Biography:</h2>
                <p className="instructions">{chef.bio}</p>
                {isHidden ? 
                <div>
                    <p>Show All Recipes by {chef.first_name} {chef.last_name}:</p>
                    <button onClick={() => handleShowAll()} >v</button> 
                </div>
                :
                <div>
                    <p>Hide All Recipes by {chef.first_name} {chef.last_name}:</p>
                    <button onClick={() => handleShowAll()} >v</button> 
                    {recipes}
                </div>}
        </div>
    )
}

export default ChefDetails;