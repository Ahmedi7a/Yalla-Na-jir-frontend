import { useState } from 'react';
import { motion } from 'framer-motion';

const ReviewForm = ({ handleAddReview }) => {
  const [formData, setFormData] = useState({ comment: "", rating: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddReview(formData);
    setFormData({ comment: "", rating: "" });
  };

  return (
    <motion.div
      className="card shadow-sm p-4 rounded-4 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h5 className="fw-bold mb-3">Leave a Review</h5>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">Your Review</label>
          <textarea
            className="form-control"
            id="comment"
            name="comment"
            rows="3"
            value={formData.comment}
            onChange={handleChange}
            required
            placeholder="Write your thoughts here..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating</label>
          <select
            className="form-select"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a rating --</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>

        <button type="submit" className="btn btn-warning w-100 rounded-pill">
          Submit Review
        </button>
      </form>
    </motion.div>
  );
};

export default ReviewForm;
