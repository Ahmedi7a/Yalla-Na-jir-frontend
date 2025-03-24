import { useEffect, useState } from 'react';
import * as rentalService from '../../services/rentalService';

const MyRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchMyRentals = async () => {
      try {
        const data = await rentalService.getUserRentals();
        setRentals(data);
      } catch (error) {
        console.log('Error fetching user rentals:', error);
      }
    };

    fetchMyRentals();
    const interval = setInterval(fetchMyRentals, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredRentals = filter === 'all'
    ? rentals
    : rentals.filter((rental) => rental.status === filter);

  return (
    <div>
      <h2>My Rentals</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="statusFilter">Filter by Status: </label>
        <select
          id="statusFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {filteredRentals.length === 0 ? (
        <p>No rentals match the selected status.</p>
      ) : (
        <ul>
          {filteredRentals.map((rental) => (
            <li key={rental._id}>
              <p><strong>Car:</strong> {rental.carId?.brand} {rental.carId?.model}</p>
              <p><strong>From:</strong> {new Date(rental.startDate).toLocaleDateString()}</p>
              <p><strong>To:</strong> {new Date(rental.endDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {rental.status}</p>
              <p><strong>Total Price:</strong> ${rental.totalPrice}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRentals;
