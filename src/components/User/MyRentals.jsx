import { useEffect, useState } from 'react';
import * as rentalService from '../../services/rentalService';

const MyRentals = () => {
  const [rentals, setRentals] = useState([]);

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
  }, []);

  return (
    <div>
      <h2>My Rentals</h2>
      {rentals.length === 0 ? (
        <p>You haven't rented any cars yet.</p>
      ) : (
        <ul>
          {rentals.map((rental) => (
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
