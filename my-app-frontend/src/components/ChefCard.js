import React from "react";
import { Link } from "react-router-dom"

function ChefCard ({ chef }) {

    const { first_name, last_name, age, image, id } = chef

    return (
        <div className="card">
            <h3>{first_name} {last_name}</h3>
            <img className="card-img" src={image}></img>
            <br></br>
            <p>Years Cooking: "years" | Age: {age}</p>
            <Link to={`/chefs/${id}`}>Read More</Link>
        </div>
    )
}

export default ChefCard;