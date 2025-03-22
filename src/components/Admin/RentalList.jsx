import { useEffect, useState } from 'react';
import * as rentalService from '../../services/rentalService';

const RentalList = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      const data = await rentalService.getAllRentals(); 
      setRentals(data);
    };
    fetchRentals();
  }, []);

  return (
    <div>
      <h2>All Rentals</h2>
      {rentals.map((r) => (
        <div key={r._id}>
          <p>
            User: <strong>{r.userId?.username || 'Unknown User'}</strong> | Car: <strong>{r.carId?.brand || 'Unknown Brand'} {r.carId?.model || ''}</strong>
          </p>
          <p>Status: {r.status}</p>
        </div>
      ))}
    </div>
  );
};

export default RentalList;
