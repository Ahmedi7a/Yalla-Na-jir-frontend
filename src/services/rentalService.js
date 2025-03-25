const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/rentals`;


// Create a rental request (user only)
 
const createRentalRequest = async (carId, rentalData) => {
  try {
    const res = await fetch(`${BASE_URL}/${carId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rentalData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


const getUserRentals = async () => {
  try {
    const res = await fetch(`${BASE_URL}/my-rentals`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


// Get all rentals for dealer's cars
const getDealerRentals = async () => {
  try {
    const res = await fetch(`${BASE_URL}/dealer-rentals`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


// Update rental status (dealer only)
const updateRentalStatus = async (rentalId, status) => {
  try {
    const res = await fetch(`${BASE_URL}/${rentalId}/status`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


// Delete a rental (dealer only)
const deleteRental = async (rentalId) => {
  try {
    const res = await fetch(`${BASE_URL}/${rentalId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getAllRentals = async () => {
  try {
    const res = await fetch(`${BASE_URL}/all-rentals`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const cancelRental = async (rentalId) => {
  try {
    const res = await fetch(`${BASE_URL}/${rentalId}/cancel`, {
      method: 'PUT',
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
  createRentalRequest,
  getUserRentals,
  getDealerRentals,
  updateRentalStatus,
  deleteRental,
  getAllRentals,
  cancelRental
};
