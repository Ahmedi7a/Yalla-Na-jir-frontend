import '../Admin/AdminStyles.css';

const AcceptRequest = ({ requests, onApprove, onReject }) => (
  <div>
    {requests.length === 0 ? (
      <p>No pending requests.</p>
    ) : (
      requests.map((req) => (
        <div key={req._id} className="admin-item">
          <span>{req.userId?.username || 'Unknown User'}</span>
          <div className="admin-buttons">
            <button onClick={() => onApprove(req._id)}>Approve</button>
            <button className="danger" onClick={() => onReject(req._id)}>Reject</button>
          </div>
        </div>
      ))
    )}
  </div>
);

export default AcceptRequest;
