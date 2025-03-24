// approvalService.js

const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/approval`;


const requestDealer = async () => {
  try {
    const res = await fetch(`${BASE_URL}/request-dealer`, {
      method: 'POST',
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

export {
  requestDealer,
  updateApprovalStatus,
  getPendingDealerRequests,
  deleteApprovalRequest,
  downgradeDealer,
  getApprovedDealers,
  getAllUsers,
};