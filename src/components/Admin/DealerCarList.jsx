import { useEffect, useState } from 'react';
import * as approvalService from '../../services/approvalService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Admin/AdminStyles.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDealer, setSelectedDealer] = useState('all');

  const fetchCars = async () => {
    try {
      const data = await approvalService.getAllCars();
      setCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast.error('Failed to load cars');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
    const intervalId = setInterval(fetchCars, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const handleDelete = async (carId) => {
    toast.info(
      <div>
        Are you sure you want to delete this car?
        <div className="mt-2 d-flex justify-content-end gap-2">
          <button
            className="btn btn-sm btn-danger"
            onClick={async () => {
              toast.dismiss();
              try {
                await approvalService.deleteCar(carId);
                toast.success('Car deleted successfully');
                fetchCars();
              } catch (error) {
                toast.error('Failed to delete car');
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

  const uniqueDealers = Array.from(
    new Set(cars.map(car => car.dealerId?.username).filter(Boolean))
  );

  const filteredCars = selectedDealer === 'all'
    ? cars
    : cars.filter(car => car.dealerId?.username === selectedDealer);

  return (
    <div className="container py-5">
      <ToastContainer position="top-center" />
      <div className="text-center mb-4">
        <h2 className="fw-bold text-dark">All Cars</h2>
        <p className="text-muted">Manage all cars listed by dealers on the platform.</p>
      </div>


      <div className="d-flex justify-content-end align-items-center mb-4">
        <label htmlFor="dealerFilter" className="me-2 fw-medium text-dark">Filter by Dealer:</label>
        <select
          id="dealerFilter"
          className="form-select w-auto shadow-sm rounded-pill"
          value={selectedDealer}
          onChange={(e) => setSelectedDealer(e.target.value)}
        >
          <option value="all">All Dealers</option>
          {uniqueDealers.map((dealer) => (
            <option key={dealer} value={dealer}>
              {dealer}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : filteredCars.length === 0 ? (
        <div className="alert alert-info text-center">No cars found for the selected dealer.</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {filteredCars.map((car) => (
            <div className="col" key={car._id}>
              <div className="card border-0 shadow" style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
                <div className="card-body text-dark">
                  <h5 className="card-title mb-2 fw-semibold">
                    {car.brand} {car.model}
                  </h5>
                  <p className="card-text mb-2">
                    <strong>Year:</strong> {car.year}<br />
                    <strong>Price/Day:</strong> {car.pricePerDay} BHD<br />
                    <strong>Dealer:</strong> {car.dealerId?.username || 'Unknown'}
                  </p>
                  <div className="text-end">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(car._id)}
                    >
                      Delete Car
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

export default CarList;
