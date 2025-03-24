import { useState } from 'react';

const ReviewForm = ({ handleAddReview }) => {
  const [formData, setFormData] = useState({ comment:"", rating:"" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddReview(formData); 
    setFormData({ comment:"", rating:"" }); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text">Your review:</label>
      <textarea
        name="comment"
        id="comment"
        value={formData.comment}
        onChange={handleChange}
        required
      />
      <label htmlFor="rating">Rating:</label>
      <select
        name="rating"
        id="rating"
        value={formData.rating}
        onChange={handleChange}
        required
      >
        <option value="">-- Select a rating --</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <br />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
