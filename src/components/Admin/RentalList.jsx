import { useEffect, useState } from 'react';
import * as rentalService from '../../services/rentalService';
import '../Admin/AdminStyles.css';

const RentalList = ({ rentals: propRentals }) => {
  const [rentals, setRentals] = useState(propRentals || []);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchRentals = async () => {
      if (!propRentals) {
        const data = await rentalService.getAllRentals();
        setRentals(data);
      }
    };
    fetchRentals();
  }, [propRentals]);

  const filteredRentals = filterStatus === 'all'
    ? rentals
    : rentals.filter(r => r.status === filterStatus);

  return (
    <div className="admin-dashboard">
      <h2>All Rentals</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="filter">Filter by Status: </label>
        <select
          id="filter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {filteredRentals.map((r) => (
        <div key={r._id} className="admin-item">
          <p style={{ margin: 0 }}>
            <strong>{r.userId?.username || 'Unknown User'}</strong> rented{' '}
            <strong>{r.carId?.brand} {r.carId?.model}</strong>
          </p>
          <small>Status: {r.status}</small>
        </div>
      ))}
    </div>
  );
};

export default RentalList;
