import React from "react";

function Card ({ recipe }) {

    const { name, instructions, ingredients, image_url, hours, chef_id, rating } = recipe

    return (
        <div className="card">
            <h3>{name}</h3>
            <img className="card-img" src={image_url}></img>
            <br></br>
            <p>Hours to Prepare: {hours}</p>
            Ingredients:<p>{ingredients}</p>
            Instructions:<p>{instructions}</p>
            <p>Rating: {rating}</p>
        </div>
    )
}

export default Card;