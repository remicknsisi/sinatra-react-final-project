import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Recipe from "../components/Recipe.js"
import EditChefForm from "../components/EditChefForm"


function ChefDetails ({onEditChefSubmit}) {
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
                <p className="bio">{chef.bio}</p>
                {isHidden ? 
                <div className="recipes-container">
                    <p>Show All Recipes by {chef.first_name} {chef.last_name}:</p>
                    <button onClick={() => handleShowAll()} >v</button> 
                </div>
                :
                <div className="recipes-container">
                    <p>Hide All Recipes by {chef.first_name} {chef.last_name}:</p>
                    <button onClick={() => handleShowAll()} >v</button> 
                    {recipes}
                </div>}
                <Link to={`/chefs/${chef.id}/recipes/new`}>Add New Recipe for this Chef</Link>
                <br></br>
                <br></br>
                Have some changes you want to make? Edit this chef here: ✏️ 
                <EditChefForm chef={chef} onEditChefSubmit={onEditChefSubmit}/>

        </div>
    )
}

export default ChefDetails;

