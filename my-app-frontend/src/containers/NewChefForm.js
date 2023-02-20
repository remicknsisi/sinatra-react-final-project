import React, { useState } from "react";

function NewChefForm ({ onChefSubmit }) {

    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newAge, setNewAge] = useState()
    const [newChefImage, setNewChefImage] = useState('')
    const [newBio, setNewBio] = useState('')

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

    function handleSubmitChef(e){
        e.preventDefault()

        const newChefCard = {
            first_name: newFirstName,
            last_name: newLastName,
            age: newAge,
            image: newChefImage,
            bio: newBio
        }

        fetch(`http://localhost:9292/chefs`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(
              newChefCard
            )
          })
          .then(res => res.json())
          .then(newChef => onChefSubmit(newChef))
    }

    return (
    <div className = "forms-container">
        <div className="chef-form">
            <h3 className="form-headers"> Enter a new chef here: 👨‍🍳 </h3>
            <form onSubmit={handleSubmitChef} className="chef-form-container">
                    First Name: <input type="text" onChange={handleFirstNameChange} value={newFirstName} placeholder="First Name" />
                    <br></br>
                    Last Name: <input type="text" onChange={handleLastNameChange} value={newLastName} placeholder="Last Name" />
                    <br></br>
                    Image URL: <input type="text" onChange={handleChefImageChange} value={newChefImage} placeholder="Image URL" />
                    <br></br>
                    Age of Chef: <input type="number" onChange={handleAgeChange} value={newAge} placeholder="Age of Chef" />
                    <br></br>
                    Bio: <input type="text" onChange={handleBioChange} value={newBio} placeholder="Bio" />
                    <br></br>
                    <br></br>
                    <button type="submit">Create Chef</button>
            </form>
        </div>
    </div>
    )
}

export default NewChefForm;