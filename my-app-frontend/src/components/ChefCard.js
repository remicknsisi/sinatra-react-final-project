import React from "react";
import { Link } from "react-router-dom"

function ChefCard ({ data }) {

    const { first_name, last_name, age, id } = data

    return (
        <div className="card">
            <h3>{first_name} {last_name}</h3>
            {/* <img className="card-img" src={image_url}></img> */}
            <br></br>
            <p>Age: {age}</p>
            <Link to={`/chefs/${id}`}>Read More</Link>
        </div>
    )
}

export default ChefCard;