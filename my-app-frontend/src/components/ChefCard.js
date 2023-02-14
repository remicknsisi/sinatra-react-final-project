import React from "react";
import { Link } from "react-router-dom"

function ChefCard ({ chef, onDeleteChef }) {

    const { first_name, last_name, age, image, id, years_cooking } = chef

    function handleDeleteChef(){
        fetch(`http://localhost:9292/chefs/${chef.id}`, {
          method: 'DELETE'})
        .then(res => res.json())
        .then(deletedChef => onDeleteChef(deletedChef))}

    return (
        <div className="card">
            <h3>{first_name} {last_name}</h3>
            <img className="card-img" src={image}></img>
            <br></br>
            <h4>Years Cooking: {years_cooking} | Age: {age}</h4>
            <Link to={`/chefs/${id}`}>Read More</Link>
            <br></br>
            <br></br>
            <button className="chef-btn" onClick={handleDeleteChef}>❌ Delete Chef</button>
        </div>
    )
}

export default ChefCard;