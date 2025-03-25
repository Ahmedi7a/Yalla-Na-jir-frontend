import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import * as carService from "../../services/carService";

const brandModelMap = {
  Toyota: ["Corolla", "Camry", "RAV4", "Highlander", "Yaris", "Prius"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot", "Fit", "Odyssey"],
  Ford: ["Fusion", "Escape", "Focus", "Explorer", "Mustang", "Edge"],
  Chevrolet: ["Malibu", "Equinox", "Tahoe", "Impala", "Cruze", "Traverse"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "X1", "X7"],
  Tesla: ["Model S", "Model 3", "Model X", "Model Y", "Roadster", "Cybertruck"],
  Hyundai: ["Elantra", "Tucson", "Santa Fe", "Sonata", "Accent"],
  Kia: ["Sorento", "Sportage", "Soul", "Optima", "Rio"],
  Jeep: ["Wrangler", "Cherokee", "Compass", "Grand Cherokee", "Renegade"],
  Nissan: ["Altima", "Sentra", "Rogue", "Tiida", "Micra", "Pathfinder", "Maxima"],
  MercedesBenz: ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
  Audi: ["A3", "A4", "Q5", "Q7"],
  Volkswagen: ["Golf", "Jetta", "Passat", "Tiguan"],
  Subaru: ["Impreza", "Outback", "Forester", "Crosstrek"],
  Mazda: ["Mazda3", "Mazda6", "CX-5", "CX-9"],
  Dodge: ["Charger", "Challenger", "Durango"],
  GMC: ["Sierra", "Yukon", "Terrain"],
  Porsche: ["911", "Cayenne", "Macan"],
  LandRover: ["Range Rover", "Discovery", "Defender"],
};

const CreateCar = (props) => {
  const { carId } = useParams();

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1999 }, (_, i) => currentYear - i);

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: currentYear,
    pricePerDay: "",
    location: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [marker, setMarker] = useState(null);

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  const center = { lat: 26.2235, lng: 50.5876 };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setFormData({ ...formData, brand, model: "" });
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarker({ lat, lng });
    setFormData({ ...formData, location: `${lat}, ${lng}` });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) data.append(key, formData[key]);
    if (imageFile) data.append("image", imageFile);

    carId ? props.handleUpdateCar(carId, data) : props.handleAddCar(data);
  };

  useEffect(() => {
    const fetchCar = async () => {
      const carData = await carService.show(carId);
      setFormData(carData);
      if (carData.location) {
        const [lat, lng] = carData.location.split(",").map(Number);
        setMarker({ lat, lng });
      }
    };
    if (carId) fetchCar();
  }, [carId]);

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: "#f5f8fa", minHeight: "100vh" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold text-dark">{carId ? "Edit Car" : "Add New Car"}</h1>
          <p className="text-muted">{carId ? "Update your car's listing below." : "Fill in the car details to create a new listing."}</p>
        </div>

        <div className="card shadow border-0 rounded-4 p-4 bg-white">
          <form onSubmit={handleSubmit}>

            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="brand" className="form-label">Brand</label>
                <select
                  className="form-select"
                  name="brand"
                  value={formData.brand}
                  onChange={handleBrandChange}
                  required
                >
                  <option value="">Select Brand</option>
                  {Object.keys(brandModelMap).map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="model" className="form-label">Model</label>
                <select
                  className="form-select"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  disabled={!formData.brand}
                >
                  <option value="">Select Model</option>
                  {formData.brand &&
                    brandModelMap[formData.brand].map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="year" className="form-label">Year</label>
                <select
                  className="form-select"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-8">
                <label htmlFor="pricePerDay" className="form-label">Price Per Day (BHD)</label>
                <input
                  type="number"
                  className="form-control"
                  name="pricePerDay"
                  value={formData.pricePerDay}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">Location (click on map)</label>
                {isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={10}
                    center={marker || center}
                    onClick={handleMapClick}
                  >
                    {marker && <Marker position={marker} />}
                  </GoogleMap>
                ) : (
                  <div className="text-muted">Loading Map...</div>
                )}
                <input
                  type="text"
                  className="form-control mt-2"
                  name="location"
                  value={formData.location}
                  readOnly
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="image" className="form-label">Upload Car Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  required={!carId}
                />
                <div className="mt-3 d-flex align-items-center gap-3">
                  {imageFile && (
                    <>
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Preview"
                        className="rounded border"
                        style={{ width: 40, height: 40, objectFit: "cover" }}
                      />
                      <small className="text-success">New uploaded image</small>
                    </>
                  )}
                  {!imageFile && carId && formData.image?.url && (
                    <>
                      <img
                        src={formData.image.url}
                        alt="Current"
                        className="rounded border"
                        style={{ width: 40, height: 40, objectFit: "cover" }}
                      />
                      <small className="text-muted">Current image</small>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="d-flex flex-column flex-md-row gap-3 mt-4">
              <button type="submit" className="btn btn-primary px-4 py-2 w-100 w-md-auto">
                {carId ? "Update Car" : "Add Car"}
              </button>
              <Link to="/dealer/cars/rentals" className="btn btn-outline-danger px-4 py-2 w-100 w-md-auto">
                Cancel / Go Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCar;
