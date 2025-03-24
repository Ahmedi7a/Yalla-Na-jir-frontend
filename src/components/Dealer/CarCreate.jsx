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
  LandRover: ["Range Rover", "Discovery", "Defender"]
};

const CreateCar = (props) => {
  const { carId } = useParams();

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: currentYear - 1999 },
    (_, i) => currentYear - i
  );

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
  };

  const center = { lat: 26.2235, lng: 50.5876};

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: currentYear,
    pricePerDay: "",
    location: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [marker, setMarker] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY, // Replace this!
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (imageFile) {
      data.append("image", imageFile);
    }

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
    <>
      <h1 className="text-center">{carId ? "Edit Car" : "Add New Car"}</h1>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="brand" className="form-label">
              Brand:
            </label>
            <select
              className="form-control"
              name="brand"
              id="brand"
              value={formData.brand}
              onChange={handleBrandChange}
              required
            >
              <option value="">Select Brand</option>
              {Object.keys(brandModelMap).map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
  
          <div className="mb-3">
            <label htmlFor="model" className="form-label">
              Model:
            </label>
            <select
              className="form-control"
              name="model"
              id="model"
              value={formData.model}
              onChange={handleChange}
              required
              disabled={!formData.brand}
            >
              <option value="">Select Model</option>
              {formData.brand &&
                brandModelMap[formData.brand].map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>
          </div>
  
          <div className="mb-3">
            <label htmlFor="year" className="form-label">
              Year:
            </label>
            <select
              className="form-control"
              name="year"
              id="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
  
          <div className="mb-3">
            <label htmlFor="pricePerDay" className="form-label">
              Price Per Day:
            </label>
            <input
              type="number"
              className="form-control"
              name="pricePerDay"
              id="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="mb-3">
            <label className="form-label">Location (select on map):</label>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "300px" }}
                zoom={10}
                center={marker || { lat: 26.2235, lng: 50.5876 }}
                onClick={handleMapClick}
              >
                {marker && <Marker position={marker} />}
              </GoogleMap>
            ) : (
              <div>Loading Map...</div>
            )}
            <input
              type="text"
              className="form-control mt-2"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Click on the map to set location"
              readOnly
              required
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Upload Image:
            </label>
            <input
              type="file"
              className="form-control"
              name="image"
              id="image"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              required={!carId}
            />
  
            {imageFile && (
              <div className="mt-3">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="New preview"
                  style={{
                    width: "35px",
                    height: "35px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
                <small style={{ marginLeft: "8px" }}>
                  This is the new uploaded photo
                </small>
              </div>
            )}
  
            {!imageFile && carId && formData.image?.url && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <img
                  src={formData.image.url}
                  alt="Current"
                  style={{
                    width: "35px",
                    height: "35px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
                <small style={{ marginLeft: "8px" }}>
                  This is the current photo
                </small>
              </div>
            )}
          </div>
  
          <div className="d-flex gap-3">
            <button type="submit" className="btn btn-primary flex-grow-1">
              {carId ? "Update" : "Submit"}
            </button>
            <Link
              to="/dealer/cars/rentals"
              className="btn btn-secondary flex-grow-1"
            >
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCar;