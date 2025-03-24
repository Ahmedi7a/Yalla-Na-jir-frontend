import { useEffect, useState } from 'react';
import * as rentalService from '../../services/rentalService';
import 'bootstrap/dist/css/bootstrap.min.css';

const RentalList = ({ rentals: propRentals }) => {
  const [rentals, setRentals] = useState(propRentals || []);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const data = await rentalService.getAllRentals();
        setRentals(data);
      } catch (error) {
        console.error('Error fetching rentals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
    const interval = setInterval(fetchRentals, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredRentals = filterStatus === 'all'
    ? rentals
    : rentals.filter((r) => r.status === filterStatus);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'completed':
        return 'secondary';
      default:
        return 'light';
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-dark">All Rentals</h2>
        <p className="text-muted">Overview of all rental activity on the platform.</p>
      </div>

      <div className="d-flex justify-content-end align-items-center mb-4">
        <label htmlFor="filter" className="me-2 fw-medium text-dark">Filter by Status:</label>
        <select
          id="filter"
          className="form-select w-auto shadow-sm rounded-pill"
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

      {/* Loading */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div>
          {filteredRentals.length === 0 ? (
            <div className="alert alert-info text-center">No rentals found for the selected status.</div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {filteredRentals.map((r) => (
                <div className="col" key={r._id}>
                  <div
                    className="card border-0 shadow"
                    style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}
                  >
                    <div className="card-body text-dark">
                      <h5 className="card-title mb-2 fw-semibold">
                        {r.userId?.username || 'Unknown User'}
                      </h5>
                      <p className="card-text mb-2">
                        Rented: <strong>{r.carId?.brand} {r.carId?.model}</strong><br />
                        Dealer: <strong>{r.carId?.dealerId?.username || 'Unknown Dealer'}</strong>
                      </p>
                      <span className={`badge bg-${getStatusBadge(r.status)} text-capitalize`}>
                        {r.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RentalList;
