import React, { useState } from "react";
import { useParams } from "react-router-dom";

function NewCommentForm ({ onPostComment }) {

    const [newComment, setNewComment] = useState('')
    const [newRating, setNewRating] = useState()
    const [newAuthorName, setNewAuthorName] = useState('')

    const { id } = useParams()

    function handlePostComment(e){
        e.preventDefault()

        const newReview = {
            comment: newComment,
            rating: newRating,
            recipe_id: id,
            author_name: newAuthorName
        }

        fetch(`http://localhost:9292/reviews`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(
              newReview
            )
          })
          .then(res => res.json())
          .then(newReviewObj => onPostComment(newReviewObj))
    }

    return (
        <div className="add-comment">
            <label>Leave a Review: </label>
            <form onSubmit={handlePostComment}>
                <input type="text" placeholder="E.g. Love this recipe!" value={newComment} onChange={e => setNewComment(e.target.value)}>
                </input>
                <input type="number" placeholder="Rate 1-5 Stars" value={newRating} onChange={e => setNewRating(e.target.value)}>
                </input>
                <input type="text" placeholder="Your Name Here" value={newAuthorName} onChange={e => setNewAuthorName(e.target.value)}>
                </input>
                <button>Post ✍️ </button>
            </form>
        </div>
    )
}

export default NewCommentForm;