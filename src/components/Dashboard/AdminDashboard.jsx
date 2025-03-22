import React from 'react';
import AcceptRequest from '../Admin/AcceptRequest';
import DealerList from '../Admin/DealerList';
import UserList from '../Admin/UserList';
import RentalList from '../Admin/RentalList';

const AdminDashboard = ({ user, cars }) => {
  return (
    <div className="admin-dashboard" style={{ padding: '2rem' }}>
      <h1>Welcome, Admin {user?.username}</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>Pending Dealer Requests</h2>
        <AcceptRequest />
      </section>

        <section style={{ marginTop: '2rem' }}>
        {/* <h2>Approved Dealers</h2> */}
        <DealerList />
      </section> 

       <section style={{ marginTop: '2rem' }}>
        {/* <h2>Registered Users</h2> */}
        <UserList />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>All Rentals</h2>
        <RentalList />
      </section> 
    </div>
  );
};

export default AdminDashboard;
