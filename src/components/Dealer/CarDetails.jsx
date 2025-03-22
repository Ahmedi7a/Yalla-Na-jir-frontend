import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import * as carService from '../../services/carService'

function CarDetail() {
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
      <h2>{car.brand} {car.model}</h2>
      <p>Year: {car.year}</p>
      <p>Price per day: ${car.pricePerDay}</p>
      <p>Status: {car.availability}</p>
      <Link to="/dealer/cars/rentals">Back to Cars</Link>
    </div>
  )
}

export default CarDetail
