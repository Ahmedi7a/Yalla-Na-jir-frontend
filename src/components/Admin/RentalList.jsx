import { useEffect, useState } from 'react';
import * as rentalService from '../../services/rentalService';
import '../Admin/AdminStyles.css';

const RentalList = ({ rentals: propRentals }) => {
  const [rentals, setRentals] = useState(propRentals || []);

  useEffect(() => {
    const fetchRentals = async () => {
      if (!propRentals) {
        const data = await rentalService.getAllRentals();
        setRentals(data);
      }
    };
    fetchRentals();
  }, [propRentals]);

  return (
    <div className="admin-dashboard">
      <h2>All Rentals</h2>
      {rentals.map((r) => (
        <div key={r._id} className="admin-item">
          <p style={{ margin: 0 }}>
            <strong>{r.userId?.username || 'Unknown User'}</strong> rented <strong>{r.carId?.brand} {r.carId?.model}</strong>
          </p>
          <small>Status: {r.status}</small>
        </div>
      ))}
    </div>
  );
};

export default RentalList;
