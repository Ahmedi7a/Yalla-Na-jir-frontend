import { useEffect, useState } from 'react';
import * as rentalService from '../../services/rentalService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

const MyRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRentals = async () => {
      try {
        const data = await rentalService.getUserRentals();
        setRentals(data);
      } catch (error) {
        console.log('Error fetching user rentals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRentals();
    const interval = setInterval(fetchMyRentals, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredRentals = filter === 'all'
    ? rentals
    : rentals.filter((rental) => rental.status === filter);

  const handleCancelRental = async (rentalId) => {
    try {
      const updated = await rentalService.cancelRental(rentalId);
      if (updated?.rental) {
        setRentals((prev) =>
          prev.map((r) => r._id === rentalId ? updated.rental : r)
        );
      }
    } catch (err) {
      console.error('Failed to cancel rental:', err);
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark mb-3 mb-md-0" style={{ fontSize: '2rem' }}>
          My Rentals
        </h2>

        <div className="d-flex align-items-center">
          <label htmlFor="statusFilter" className="me-2 fw-semibold text-secondary">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            className="form-select shadow-sm px-3 py-2 rounded-pill border border-secondary"
            style={{ minWidth: '180px' }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="row">
          {filteredRentals.length > 0 ? (
            filteredRentals.map((rental, index) => (
              <div className="col-md-6 col-lg-4 mb-4" key={rental._id}>
                <motion.div
                  className="card h-100 shadow-sm"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
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

                  <motion.div
                    className="card-body d-flex flex-column"
                    variants={{ hover: {}, rest: {} }}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <h5 className="card-title">{rental.carId?.brand} {rental.carId?.model}</h5>

                    <p className="card-text mb-2">
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
                      </span>
                      <br />
                      <strong>Total Price:</strong> BHD {rental.totalPrice}
                    </p>

                    <motion.div
                      className="card-text small mb-2"
                      variants={{
                        hover: { opacity: 1, height: 'auto' },
                        rest: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <strong>From:</strong> {new Date(rental.startDate).toLocaleDateString()}<br />
                      <strong>To:</strong> {new Date(rental.endDate).toLocaleDateString()}
                    </motion.div>

                    {(rental.status === 'pending' || rental.status === 'approved') && (
                      <motion.div
                        className="mt-auto"
                        variants={{
                          hover: { opacity: 1, height: 'auto' },
                          rest: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <button
                          className="btn btn-outline-danger w-100 rounded-pill mt-2"
                          onClick={() => handleCancelRental(rental._id)}
                        >
                          Cancel Rental
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            ))
          ) : (
            <div className="alert alert-info text-center">No rentals match the selected status.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyRentals;
