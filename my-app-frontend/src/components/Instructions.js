import React from "react";
import { useParams } from "react-router-dom";

function Instructions ({ recipes }) {
    const { id } = useParams()
    const itemOfFocus = recipes.find(recipe => recipe.id == id)

    const instructionsList = itemOfFocus.instructions.split('. ').map(step => {
        return(
            <li>{step}</li>
        )
    })

    return (
        <div>
            <h2 >Instructions:</h2>
                <ol type="1" className="instructions">{instructionsList}</ol>
        </div>
    )
}

export default Instructions;