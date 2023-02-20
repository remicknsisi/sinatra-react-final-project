import React from "react";

function Instructions ({ instructions }) {

    const instructionsList = instructions.split('. ').map(step => {
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