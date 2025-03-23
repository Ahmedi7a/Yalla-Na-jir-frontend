import { useState, useEffect } from 'react';
import * as rentalService from '../../services/rentalService';
import * as carService from '../../services/carService';

function RentRequests() {
  const [rentals, setRentals] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchDealerRentals = async () => {
      try {
        const data = await rentalService.getDealerRentals();
        setRentals(data);
      } catch (error) {
        console.error('Error fetching dealer rentals:', error);
      }
    };

    // Fetch rentals initially
    fetchDealerRentals();

    // Set up polling to fetch rentals every 5 seconds
    const interval = setInterval(fetchDealerRentals, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (rentalId, newStatus, carId = null) => {
    try {
      const updatedRental = await rentalService.updateRentalStatus(rentalId, newStatus);

      if (newStatus === 'approved' && carId) {
        await carService.update(carId, { availability: 'rented' });
        console.log(`Car ${carId} set to rented after approval.`);
      }

      if (newStatus === 'rejected' && carId) {
        await carService.update(carId, { availability: 'available' });
        console.log(`Car ${carId} set to available after rejection.`);
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
    <div>
      <h2>Rental Requests for Your Cars</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="statusFilter">Filter by Status: </label>
        <select
          id="statusFilter"
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

      {filteredRentals.length ? (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Car</th>
              <th>Start</th>
              <th>End</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRentals.map((rental) => (
              <tr key={rental._id}>
                <td>{rental.userId?.username || rental.userId}</td>
                <td>
                  {rental.carId?.brand} {rental.carId?.model}
                </td>
                <td>{new Date(rental.startDate).toLocaleDateString()}</td>
                <td>{new Date(rental.endDate).toLocaleDateString()}</td>
                <td>${rental.totalPrice}</td>
                <td>{rental.status}</td>
                <td>
                  {rental.status === 'pending' && (
                    <>
                      <button
                        onClick={() =>
                          handleUpdateStatus(rental._id, 'approved', rental.carId?._id)
                        }
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateStatus(rental._id, 'rejected', rental.carId?._id)
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {rental.status === 'approved' && (
                    <button onClick={() => handleUpdateStatus(rental._id, 'completed')}>
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No rental requests found.</p>
      )}
    </div>
  );
}

export default RentRequests;