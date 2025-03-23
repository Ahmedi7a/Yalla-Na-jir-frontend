const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/cars`;

// Get all cars (public)
const index = async () => {
  try {
    const res = await fetch(BASE_URL);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Get single car by ID (public)
const show = async (carId) => {
  try {
    const res = await fetch(`${BASE_URL}/${carId}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Create car (dealer only)
const create = async (carFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        // 🚫 Do NOT set 'Content-Type' here when using FormData
      },
      body: carFormData, // ✅ Send FormData directly
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


// Update car
const update = async (carId, carFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${carId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        // 🚫 Skip 'Content-Type' if sending FormData
      },
      body: carFormData,
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


// Delete car
const deleteCar = async (carId) => {
  try {
    const res = await fetch(`${BASE_URL}/${carId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Add review
const createReview = async (carId, reviewFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${carId}/reviews`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Delete review
const deleteReview = async (carId, reviewId) => {
  try {
    const res = await fetch(`${BASE_URL}/${carId}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export {
  index,
  show,
  create,
  update,
  deleteCar,
  createReview,
  deleteReview
};
