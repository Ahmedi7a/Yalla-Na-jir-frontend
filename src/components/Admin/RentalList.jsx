import { useEffect, useState } from 'react';
import * as approvalService from '../../services/approvalService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Admin/AdminStyles.css';

const RentalList = () => {
  const [rentals, setRentals] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchRentals = async () => {
    try {
      const data = await approvalService.getAllRentals();
      setRentals(data || []);
    } catch (error) {
      console.error('Error fetching rentals:', error);
      toast.error('Failed to load rentals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
    const interval = setInterval(fetchRentals, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (rentalId, status) => {
    try {
      await approvalService.updateRentalStatus(rentalId, status);
      toast.success(`Rental status updated to ${status}`);
      fetchRentals();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (rentalId) => {
    toast.info(
      <div>
        Are you sure you want to delete this rental?
        <div className="mt-2 d-flex justify-content-end gap-2">
          <button
            className="btn btn-sm btn-danger"
            onClick={async () => {
              toast.dismiss();
              try {
                await approvalService.deleteRental(rentalId);
                toast.success('Rental deleted successfully');
                fetchRentals();
              } catch (error) {
                toast.error('Failed to delete rental');
              }
            }}
          >
            Yes, Delete
          </button>
          <button className="btn btn-sm btn-secondary" onClick={() => toast.dismiss()}>
            Cancel
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  const filteredRentals =
    filterStatus === 'all'
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
      case 'cancelled':
        return 'dark';
      default:
        return 'light';
    }
  };

  return (
    <div className="container py-5">
      <ToastContainer position="top-center" />
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
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : filteredRentals.length === 0 ? (
        <div className="alert alert-info text-center">No rentals found for the selected status.</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {filteredRentals.map((rental) => (
            <div className="col" key={rental._id}>
              <div className="card border-0 shadow" style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
                <div className="card-body text-dark">
                  <h5 className="card-title mb-2 fw-semibold">
                    {rental.userId?.username || 'Unknown User'}
                  </h5>
                  <p className="card-text mb-2">
                    <strong>Car:</strong> {rental.carId?.brand} {rental.carId?.model}<br />
                    <strong>Dealer:</strong> {rental.carId?.dealerId?.username || 'Unknown'}
                  </p>

                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className={`badge bg-${getStatusBadge(rental.status)} text-capitalize`}>
                      {rental.status}
                    </span>
                    <select
                      className="form-select form-select-sm w-auto"
                      value={rental.status}
                      onChange={(e) => handleStatusChange(rental._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="text-end">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(rental._id)}
                    >
                      Delete Rental
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RentalList;
