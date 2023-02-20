import React from "react";

function Review ({ review }) {
    const { author_name, comment, rating, recipe_id } = review

    return (
        <div className="review">
            I am a review!
        </div>
    )
}

export default Review;