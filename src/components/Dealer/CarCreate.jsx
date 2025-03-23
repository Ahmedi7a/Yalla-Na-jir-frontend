import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as carService from "../../services/carService";


const CreateCar = (props) => {
  const { carId } = useParams();

  // Initial form state
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    location: "",
  });
  
  const [imageFile, setImageFile] = useState(null); // 🔹 new state for image file
  

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit: if carId exists, we update; otherwise, create new
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (imageFile) {
      data.append('image', imageFile);
    }
    
    carId
      ? props.handleUpdateCar(carId, data)
      : props.handleAddCar(data);
    
  };

  // If editing an existing car, fetch the car data and populate the form
  useEffect(() => {
    const fetchCar = async () => {
      const carData = await carService.show(carId);
      setFormData(carData);
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
            <input
              type="text"
              className="form-control"
              name="brand"
              id="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="model" className="form-label">
              Model:
            </label>
            <input
              type="text"
              className="form-control"
              name="model"
              id="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="year" className="form-label">
              Year:
            </label>
            <input
              type="number"
              className="form-control"
              name="year"
              id="year"
              value={formData.year}
              onChange={handleChange}
            />
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
            <label htmlFor="location" className="form-label">
              Location:
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
  <label htmlFor="image" className="form-label">Upload Image:</label>
  <input
    type="file"
    className="form-control"
    name="image"
    id="image"
    accept="image/*"
    onChange={(e) => setImageFile(e.target.files[0])}
    required={!carId} // image required only when creating
  />

  {/* New image preview */}
  {imageFile && (
    <div className="mt-3">
      {/* <p>New Image Preview:</p> */}
      <img
        src={URL.createObjectURL(imageFile)}
        alt="New preview"
        style={{ width: '35px', height: '35px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }}
      />
            <small style={{ marginLeft: '8px' }}>This is the new uploaded photo</small>
    </div>
  )}

  {/* Current image (only if editing and no new file selected) */}
  {!imageFile && carId && formData.image?.url && (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
      <img
        src={formData.image.url}
        alt="Current"
        style={{ width: '35px', height: '35px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <small style={{ marginLeft: '8px' }}>This is the current photo</small>
    </div>
  )}
</div>



          <div className="d-flex gap-3">
            <button type="submit" className="btn btn-primary flex-grow-1">
              {carId ? "Update" : "Submit"}
            </button>
            <Link to="/dealer/cars/rentals" className="btn btn-secondary flex-grow-1">
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCar;
