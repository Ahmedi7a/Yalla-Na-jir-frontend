import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthedUserContext } from '../../App'
import * as carService from '../../services/carService'

function DealerDashboard() {
  const user = useContext(AuthedUserContext)
  const [cars, setCars] = useState([])

  useEffect(() => {
    const fetchDealerCars = async () => {
      try {
        // Fetch all cars (or use a dedicated endpoint for the dealer's cars if available)
        const allCars = await carService.index()

        // Filter out only the cars belonging to the logged-in dealer
        const dealerCars = allCars.filter(
          (car) => car.dealerId === user._id
        )

        setCars(dealerCars)
      } catch (error) {
        console.error('Error fetching dealer cars:', error)
      }
    }

    if (user?.role === 'dealer') {
      fetchDealerCars()

      // Set up polling to fetch data every 5 seconds
      const interval = setInterval(fetchDealerCars, 5000)

      // Cleanup interval on component unmount
      return () => clearInterval(interval)
    }
  }, [user]) // Only depends on `user`

  return (
    <main>
      <h1>Dealer Dashboard for {user?.username}</h1>

      <div>
        <h2>My Cars</h2>
        <ul>
          {cars.map((car) => (
            <li key={car._id}>
              <h3>{car.brand} {car.model}</h3>
              <p>Price per day: ${car.pricePerDay}</p>
              <p>Status: {car.availability}</p>
              <Link to={`/dealer/cars/${car._id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default DealerDashboard