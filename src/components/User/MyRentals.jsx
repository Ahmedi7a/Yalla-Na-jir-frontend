import { useEffect, useState } from 'react';
import * as rentalService from '../../services/rentalService';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchMyRentals = async () => {
      try {
        const data = await rentalService.getUserRentals();
        console.log('Fetched rentals:', data);
        setRentals(data);
      } catch (error) {
        console.log('Error fetching user rentals:', error);
      }
    };

    fetchMyRentals();
    const interval = setInterval(fetchMyRentals, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredRentals = filter === 'all'
    ? rentals
    : rentals.filter((rental) => rental.status === filter);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">My Rentals</h2>
        <div className="form-inline">
          <label htmlFor="statusFilter" className="me-2">Filter by Status:</label>
          <select
            id="statusFilter"
            className="form-select"
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
      </div>

      {filteredRentals.length === 0 ? (
        <div className="alert alert-info">No rentals match the selected status.</div>
      ) : (
        <div className="row">
          {filteredRentals.map((rental) => (
            <div className="col-md-6 col-lg-4 mb-4" key={rental._id}>
              <div className="card h-100 shadow-sm">
                {rental.carId?.image?.url ? (
                  <img
                    src={rental.carId.image.url}
                    alt={`${rental.carId.brand} ${rental.carId.model}`}
                    className="card-img-top"
                    style={{ objectFit: 'cover', height: '200px', flex: '0 0 auto' }}
                  />
                ) : (
                  <div className="card-img-top d-flex align-items-center justify-content-center bg-light" style={{ height: '200px' }}>
                    <span className="text-muted">No image available</span>
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{rental.carId?.brand} {rental.carId?.model}</h5>
                  <p className="card-text">
                    <strong>From:</strong> {new Date(rental.startDate).toLocaleDateString()}<br />
                    <strong>To:</strong> {new Date(rental.endDate).toLocaleDateString()}<br />
                    <strong>Status:</strong>{' '}
                    <span className={`badge bg-${
                      rental.status === 'approved'
                        ? 'success'
                        : rental.status === 'pending'
                        ? 'warning'
                        : rental.status === 'rejected'
                        ? 'danger'
                        : rental.status === 'completed'
                        ? 'secondary'
                        : 'secondary'
                    }`}>
                      {rental.status}
                    </span><br />
                    <strong>Total Price:</strong> ${rental.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRentals;