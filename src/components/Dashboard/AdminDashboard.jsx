import React, { useEffect, useState } from 'react';
import AcceptRequest from '../Admin/AcceptRequest';
import DealerList from '../Admin/DealerList';
import UserList from '../Admin/UserList';

import * as approvalService from '../../services/approvalService';
import * as rentalService from '../../services/rentalService';

import { FaUsers, FaCar, FaUserShield, FaUserPlus } from 'react-icons/fa';

const AdminDashboard = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [users, setUsers] = useState([]);
  const [rentals, setRentals] = useState([]);

  const fetchData = async () => {
    try {
      const [reqs, dealerData, userData, rentalData] = await Promise.all([
        approvalService.getPendingDealerRequests(),
        approvalService.getApprovedDealers(),
        approvalService.getAllUsers(),
        rentalService.getAllRentals(),
      ]);
      setRequests(reqs);
      setDealers(dealerData);
      setUsers(userData);
      setRentals(rentalData);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const handleApprove = async (id) => {
    await approvalService.updateApprovalStatus(id, 'approved');
    fetchData();
  };

  const handleReject = async (id) => {
    await approvalService.updateApprovalStatus(id, 'rejected');
    fetchData();
  };

  const handleDowngrade = async (userId) => {
    await approvalService.downgradeDealer(userId);
    fetchData();
  };

  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h1 className="fw-bold">Admin Dashboard</h1>
        <p className="text-muted">Welcome, <strong>{user?.username}</strong>. Here's your system overview.</p>
      </div>


      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="card text-white bg-primary shadow-sm rounded-4">
            <div className="card-body d-flex align-items-center">
              <FaUserPlus size={32} className="me-3" />
              <div>
                <h6 className="card-title mb-0">Pending Requests</h6>
                <h4 className="fw-bold mb-0">{requests.length}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success shadow-sm rounded-4">
            <div className="card-body d-flex align-items-center">
              <FaUserShield size={32} className="me-3" />
              <div>
                <h6 className="card-title mb-0">Approved Dealers</h6>
                <h4 className="fw-bold mb-0">{dealers.length}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-dark shadow-sm rounded-4">
            <div className="card-body d-flex align-items-center">
              <FaUsers size={32} className="me-3" />
              <div>
                <h6 className="card-title mb-0">Total Users</h6>
                <h4 className="fw-bold mb-0">{users.length}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-secondary shadow-sm rounded-4">
            <div className="card-body d-flex align-items-center">
              <FaCar size={32} className="me-3" />
              <div>
                <h6 className="card-title mb-0">Total Rentals</h6>
                <h4 className="fw-bold mb-0">{rentals.length}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>


      <section className="mb-5">
        <h3 className="fw-semibold mb-3">Pending Dealer Requests</h3>
        <AcceptRequest requests={requests} onApprove={handleApprove} onReject={handleReject} />
      </section>

      <section className="mb-5">
        <h3 className="fw-semibold mb-3">Approved Dealers</h3>
        <DealerList dealers={dealers} onDowngrade={handleDowngrade} />
      </section>

      <section className="mb-5">
        <h3 className="fw-semibold mb-3">All Registered Users</h3>
        <UserList users={users} />
      </section>
    </div>
  );
};

export default AdminDashboard;
