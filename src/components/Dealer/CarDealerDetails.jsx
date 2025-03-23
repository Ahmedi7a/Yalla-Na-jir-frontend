import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import * as carService from '../../services/carService'

function CarDealerDetails(props) {
  const { carId } = useParams()
  const [car, setCar] = useState(null)

  useEffect(() => {
    const fetchCar = async () => {
      const data = await carService.show(carId)
      setCar(data)
    }
    fetchCar()
  }, [carId])

  if (!car) return <p>Loading...</p>

  return (
    <div>
            {car.image?.url && (
        <img 
          src={car.image.url} 
          alt={`${car.brand} ${car.model}`} 
          style={{ width: '200px', height: 'auto', borderRadius: '8px', marginBottom: '10px' }} 
        />
      )}
      <h2>{car.brand} {car.model}</h2>
      <p>Year: {car.year}</p>
      <p>Price per day: ${car.pricePerDay}</p>
      <p>Status: {car.availability}</p>
      <Link to={`/dealer/cars/${car._id}/edit`} style={{ marginRight: '1rem' }}>
        Edit
      </Link>

      <button onClick={()=>props.handleDeleteCar(carId)} style={{ marginRight: '1rem' }}>
        Delete
      </button>

      <Link to="/dealer/cars/rentals">Back to Cars</Link>
      
    </div>
  )
}

export default CarDealerDetails
