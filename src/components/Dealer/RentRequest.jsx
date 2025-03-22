import { useState, useEffect } from 'react'
import * as rentalService from '../../services/rentalService'
import * as carService from '../../services/carService'

function RentRequests() {
  const [rentals, setRentals] = useState([])

  // Fetch rental requests for dealer's cars
  useEffect(() => {
    const fetchDealerRentals = async () => {
      try {
        const data = await rentalService.getDealerRentals()
        setRentals(data)
      } catch (error) {
        console.error('Error fetching dealer rentals:', error)
      }
    }

    fetchDealerRentals()
  }, [])

  // Update rental status
  const handleUpdateStatus = async (rentalId, newStatus, carId) => {
    try {
      const updatedRental = await rentalService.updateRentalStatus(rentalId, newStatus)

      // If rental is rejected, set the car status back to available
      if (newStatus === 'rejected' && carId) {
        try {
          await carService.update(carId, { availability: 'available' })
          console.log(`Car ${carId} set to available`)
        } catch (err) {
          console.error('Error updating car availability:', err)
        }
      }

      // Update local rental state
      setRentals((prevRentals) =>
        prevRentals.map((r) => (r._id === rentalId ? updatedRental : r))
      )
    } catch (error) {
      console.error('Error updating rental status:', error)
    }
  }

  // Delete rental
  const handleDeleteRental = async (rentalId) => {
    try {
      await rentalService.deleteRental(rentalId)
      setRentals((prevRentals) =>
        prevRentals.filter((r) => r._id !== rentalId)
      )
    } catch (error) {
      console.error('Error deleting rental:', error)
    }
  }

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
                <td>{rental.userId?.username || rental.userId}</td>
                <td>{rental.carId?.brand} {rental.carId?.model}</td>
                <td>{new Date(rental.startDate).toLocaleDateString()}</td>
                <td>{new Date(rental.endDate).toLocaleDateString()}</td>
                <td>${rental.totalPrice}</td>
                <td>{rental.status}</td>
                <td>
                  {rental.status !== 'approved' && (
                    <button onClick={() => handleUpdateStatus(rental._id, 'approved', rental.carId?._id)}>
                      Approve
                    </button>
                  )}
                  {rental.status !== 'rejected' && (
                    <button onClick={() => handleUpdateStatus(rental._id, 'rejected', rental.carId?._id)}>
                      Reject
                    </button>
                  )}
                  {rental.status !== 'completed' && (
                    <button onClick={() => handleUpdateStatus(rental._id, 'completed')}>
                      Complete
                    </button>
                  )}
                  <button onClick={() => handleDeleteRental(rental._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No rental requests found.</p>
      )}
    </div>
  )
}

export default RentRequests
