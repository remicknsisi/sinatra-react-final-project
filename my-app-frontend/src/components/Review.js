import React from "react";

function Review ({ review, onDeleteReview }) {
    const { author_name, comment, rating, id } = review

    function handleDeleteReview(){
        fetch(`http://localhost:9292/reviews/${id}`, {
            method: 'DELETE'})
          .then(res => res.json())
          .then(deletedReview => onDeleteReview(deletedReview))}

    return (
        <div className="reviews">
            <h4>{author_name} | Rating: {'⭐'.repeat(rating)}</h4>
            <p>{comment}</p>
            <button onClick={handleDeleteReview}>❌ Delete Review</button>
        </div>
    )
}

export default Review;