import { React, useState } from "react";

function EditChefForm ({ chef, onEditChefSubmit }) {

    const { first_name, last_name, age, image, bio, years_cooking, id } = chef

    const [newFirstName, setNewFirstName] = useState(first_name)
    const [newLastName, setNewLastName] = useState(last_name)
    const [newAge, setNewAge] = useState(age)
    const [newChefImage, setNewChefImage] = useState(image)
    const [newBio, setNewBio] = useState(bio)
    const [newYearsCooking, setNewYearsCooking] = useState(years_cooking)

    function handleFirstNameChange(e){
        setNewFirstName(e.target.value)
    }
    function handleLastNameChange(e){
        setNewLastName(e.target.value)
    }
    function handleAgeChange(e){
        setNewAge(e.target.value)
    }
    function handleChefImageChange(e){
        setNewChefImage(e.target.value)
    }
    function handleBioChange(e){
        setNewBio(e.target.value)
    }
    function handleNewYearsCooking(e){
        setNewYearsCooking(e.target.value)
    }

    function handleEditChef(){
        fetch(`http://localhost:9292/chefs/${id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                first_name: newFirstName,
                last_name: newLastName,
                image: newChefImage,
                years_cooking: newYearsCooking,
                age: newAge,
                bio: newBio
             })
           })
           .then(res => res.json())
           .then(updatedChef => onEditChefSubmit(updatedChef)
          )
    }

    return (
        <div className="edit-chef-form">
            <form onSubmit={handleEditChef} className="chef-form-container">
                    First Name: ✏️ <input type="text" onChange={handleFirstNameChange} value={newFirstName} placeholder="First Name" />
                    <br></br>
                    Last Name: ✏️ <input type="text" onChange={handleLastNameChange} value={newLastName} placeholder="Last Name" />
                    <br></br>
                    Image URL: ✏️ <input type="text" onChange={handleChefImageChange} value={newChefImage} placeholder="Image URL" />
                    <br></br>
                    Age of Chef: ✏️ <input type="number" onChange={handleAgeChange} value={newAge} placeholder="Age of Chef" />
                    <br></br>
                    Bio: ✏️ <input type="text" onChange={handleBioChange} value={newBio} placeholder="Bio" />
                    <br></br>
                    Years Cooking: ✏️ <input type="text" onChange={handleNewYearsCooking} value={newYearsCooking} placeholder="Years Cooking" />
                    <br></br>
                    <br></br>
                <button type="submit">Finish Editing Chef</button>
            </form>
        </div>
    )
}

export default EditChefForm;