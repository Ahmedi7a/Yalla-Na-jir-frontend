import { useState, useEffect } from 'react';
import * as rentalService from '../../services/rentalService';
import * as carService from '../../services/carService';

function RentRequests() {
  const [rentals, setRentals] = useState([]);

  // Fetch rental requests on mount
  useEffect(() => {
    const fetchDealerRentals = async () => {
      try {
        const data = await rentalService.getDealerRentals();
        setRentals(data);
      } catch (error) {
        console.error('Error fetching dealer rentals:', error);
      }
    };

    fetchDealerRentals();
  }, []);

  const handleUpdateStatus = async (rentalId, newStatus, carId = null) => {
    try {
        // Update rental status in the backend
        const response = await rentalService.updateRentalStatus(rentalId, newStatus);

        // If approved, log that the car is now rented
        if (newStatus === 'approved' && carId) {
            console.log(`Car ${carId} set to rented after approval.`);
        }

        // If completed or rejected, log that the car is now available
        if (['completed', 'rejected'].includes(newStatus) && carId) {
            console.log(`Car ${carId} set to available after ${newStatus}.`);
        }

        // If completed, remove rental from state
        if (newStatus === 'completed') {
            setRentals((prev) => prev.filter((r) => r._id !== rentalId));
            return;
        }

        // Otherwise, update rental in state with data from backend
        setRentals((prevRentals) =>
            prevRentals.map((r) =>
                r._id === rentalId ? response.rental : r
            )
        );
    } catch (error) {
        console.error('Error updating rental status:', error);
    }
};

  // const handleDeleteRental = async (rentalId) => {
  //   try {
  //     const rental = rentals.find((r) => r._id === rentalId);

  //     // Update car availability to 'available' before deleting the rental
  //     if (rental?.carId?._id) {
  //       try {
  //         await carService.update(rental.carId._id, { availability: 'available' });
  //         console.log(`Car ${rental.carId._id} set to available after rental deletion.`);
  //       } catch (err) {
  //         console.error('Error setting car to available:', err);
  //       }
  //     }

  //     // Delete the rental
  //     await rentalService.deleteRental(rentalId);

  //     // Remove rental from state
  //     setRentals((prev) => prev.filter((r) => r._id !== rentalId));
  //   } catch (error) {
  //     console.error('Error deleting rental:', error);
  //   }
  // };

  return (
    <div>
      <h2>Rental Requests for Your Cars</h2>
      {rentals.length ? (
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
            {rentals.map((rental) => (
              <tr key={rental._id}>
                <td>{rental.userId?.username}</td>
                <td>{rental.carId?.brand} {rental.carId?.model}</td>
                <td>{new Date(rental.startDate).toLocaleDateString()}</td>
                <td>{new Date(rental.endDate).toLocaleDateString()}</td>
                <td>${rental.totalPrice}</td>
                <td>{rental.status}</td>
                <td>
                  {/* Show Approve/Reject only when status is pending */}
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

                  {/* Show Complete if approved */}
                  {rental.status === 'approved' && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(rental._id, 'completed')
                      }
                    >
                      Complete
                    </button>
                  )}

                  {/* Show Delete only if approved or rejected
                  {['approved', 'rejected'].includes(rental.status) && (
                    <button onClick={() => handleDeleteRental(rental._id)}>
                      Delete
                    </button>
                  )} */}
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
