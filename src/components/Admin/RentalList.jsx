import '../Admin/AdminStyles.css';

const RentalList = ({ rentals }) => (
  <div>
    {rentals.map((r) => (
      <div key={r._id} className="admin-item">
        <p style={{ margin: 0 }}>
          <strong>{r.userId?.username || 'Unknown User'}</strong> rented <strong>{r.carId?.brand} {r.carId?.model}</strong>
        </p>
        <small>Status: {r.status}</small>
      </div>
    ))}
  </div>
);

export default RentalList;
