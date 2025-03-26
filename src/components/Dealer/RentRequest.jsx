import { useState, useEffect } from 'react';
import * as rentalService from '../../services/rentalService';
import * as carService from '../../services/carService';
import 'bootstrap/dist/css/bootstrap.min.css';

function RentRequests() {
  const [rentals, setRentals] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDealerRentals = async () => {
      try {
        const data = await rentalService.getDealerRentals();
        setRentals(data);
      } catch (error) {
        console.error('Error fetching dealer rentals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDealerRentals();
    const interval = setInterval(fetchDealerRentals, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (rentalId, newStatus, carId = null) => {
    try {
      const updatedRental = await rentalService.updateRentalStatus(rentalId, newStatus);

      if (newStatus === 'approved' && carId) {
        await carService.update(carId, { availability: 'rented' });
      }

      if (newStatus === 'rejected' && carId) {
        await carService.update(carId, { availability: 'available' });
      }

      if (newStatus === 'completed') {
        setRentals((prev) => prev.filter((r) => r._id !== rentalId));
        return;
      }

      setRentals((prevRentals) =>
        prevRentals.map((r) => (r._id === rentalId ? updatedRental.rental : r))
      );
    } catch (error) {
      console.error('Error updating rental status:', error);
    }
  };

  const filteredRentals =
    statusFilter === 'all'
      ? rentals
      : rentals.filter((rental) => rental.status === statusFilter);

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Rental Requests</h1>
        <p className="text-muted fs-5">Manage all rental requests for your listed cars</p>
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <h4 className="mb-0 fw-semibold">Requests Overview</h4>
        <div className="d-flex align-items-center">
          <label htmlFor="statusFilter" className="me-2 fw-medium">Filter by Status:</label>
          <select
            id="statusFilter"
            className="form-select rounded-pill shadow-sm"
            style={{ width: '200px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredRentals.length ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle shadow-sm">
            <thead className="table-light">
              <tr>
                <th>User</th>
                <th>Car</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total Price</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRentals.map((rental) => (
                <tr key={rental._id}>
                  <td>{rental.userId?.username}</td>
                  <td>{rental.carId?.brand} {rental.carId?.model}</td>
                  <td>{new Date(rental.startDate).toLocaleDateString()}</td>
                  <td>{new Date(rental.endDate).toLocaleDateString()}</td>
                  <td>${rental.totalPrice}</td>
                  <td>
                    <span className={`badge text-bg-${
                      rental.status === 'approved'
                        ? 'success'
                        : rental.status === 'pending'
                        ? 'warning'
                        : rental.status === 'rejected'
                        ? 'danger'
                        : rental.status === 'completed'
                        ? 'secondary'
                        : 'light'
                    } text-capitalize`}>
                      {rental.status}
                    </span>
                  </td>
                  <td className="text-center">
                    {rental.status === 'pending' && (
                      <div className="d-flex gap-2 justify-content-center flex-wrap">
                        <button
                          className="btn btn-sm btn-success rounded-pill"
                          onClick={() => handleUpdateStatus(rental._id, 'approved', rental.carId?._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-danger rounded-pill"
                          onClick={() => handleUpdateStatus(rental._id, 'rejected', rental.carId?._id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {rental.status === 'approved' && (
                      <button
                        className="btn btn-sm btn-secondary rounded-pill"
                        onClick={() => handleUpdateStatus(rental._id, 'completed')}
                      >
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info text-center">No rental requests found.</div>
      )}
    </div>
  );
}

export default RentRequests;