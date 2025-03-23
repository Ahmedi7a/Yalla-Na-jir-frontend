import React, { useEffect, useState } from 'react';
import AcceptRequest from '../Admin/AcceptRequest';
import DealerList from '../Admin/DealerList';
import UserList from '../Admin/UserList';



//styling
import '../Admin/AdminStyles.css';


//services
import * as approvalService from '../../services/approvalService';
import * as rentalService from '../../services/rentalService';

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
        rentalService.getAllRentals()
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
    <div className="admin-dashboard">
  <h1>Welcome, Admin {user?.username}</h1>

  <section className="admin-section">
    <h2>Pending Dealer Requests</h2>
    <AcceptRequest requests={requests} onApprove={handleApprove} onReject={handleReject} />
  </section>

  <section className="admin-section">
    <h2>Approved Dealers</h2>
    <DealerList dealers={dealers} onDowngrade={handleDowngrade} />
  </section>

  <section className="admin-section">
    <h2>All Users</h2>
    <UserList users={users} />
  </section>
</div>

  );
};

export default AdminDashboard;
