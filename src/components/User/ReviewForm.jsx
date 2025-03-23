import { useState } from 'react';

const ReviewForm = ({ handleAddReview }) => {
  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddReview(formData); 
    setFormData({ text: '' }); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text">Your review:</label>
      <textarea
        name="text"
        id="text"
        value={formData.text}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
