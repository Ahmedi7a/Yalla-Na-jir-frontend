// approvalService.js

const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/approval`;

// ========== Dealer Request ==========
const requestDealer = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/request-dealer`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateApprovalStatus = async (approvalId, status) => {
  try {
    const res = await fetch(`${BASE_URL}/${approvalId}/status`, {
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

const getPendingDealerRequests = async () => {
  try {
    const res = await fetch(`${BASE_URL}/pending-dealer-requests`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteApprovalRequest = async (approvalId) => {
  try {
    const res = await fetch(`${BASE_URL}/${approvalId}`, {
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

const downgradeDealer = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/downgrade-dealer/${userId}`, {
      method: 'PUT',
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

const getApprovedDealers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/approved-dealers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/all-users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// ========== New Admin Actions ==========

// Delete any user
const deleteUser = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
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

// Update user role
const updateUserRole = async (userId, role) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/role`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Admin update rental status
const updateRentalStatus = async (rentalId, status) => {
  try {
    const res = await fetch(`${BASE_URL}/rentals/${rentalId}/status`, {
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

// Admin delete rental
const deleteRental = async (rentalId) => {
  try {
    const res = await fetch(`${BASE_URL}/rentals/${rentalId}`, {
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

// Admin get all cars
const getAllCars = async () => {
  try {
    const res = await fetch(`${BASE_URL}/cars`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Admin update car
const updateCar = async (carId, updateData) => {
  try {
    const res = await fetch(`${BASE_URL}/cars/${carId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Admin delete car
const deleteCar = async (carId) => {
  try {
    const res = await fetch(`${BASE_URL}/cars/${carId}`, {
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
const getAllRentals = async () => {
  try {
    const res = await fetch(`${BASE_URL}/rentals/all-rentals`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// ========== Exports ==========
export {
  requestDealer,
  updateApprovalStatus,
  getPendingDealerRequests,
  deleteApprovalRequest,
  downgradeDealer,
  getApprovedDealers,
  getAllUsers,
  deleteUser,
  updateUserRole,
  updateRentalStatus,
  deleteRental,
  getAllCars,
  updateCar,
  deleteCar,
  getAllRentals
};
