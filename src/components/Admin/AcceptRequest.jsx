import '../Admin/AdminStyles.css';

const AcceptRequest = ({ requests, onApprove, onReject }) => {
  // Filter out requests from users who are already dealers
  const filteredRequests = requests.filter(
    (request) => request.userId?.role !== 'dealer'
  );

  return (
    <div>
      {filteredRequests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        filteredRequests.map((req) => (
          <div key={req._id} className="admin-item">
            <div className="admin-info">
              <strong>User:</strong> {req.userId?.username || 'Unknown User'} <br />
              <strong>Phone:</strong> {req.phone || 'N/A'} <br />
              <strong>Description:</strong>{' '}
              <span style={{ whiteSpace: 'pre-wrap' }}>
                {req.description || 'No reason provided.'}
              </span>
            </div>
            <div className="admin-buttons mt-2">
              <button onClick={() => onApprove(req._id)}>Approve</button>
              <button className="danger" onClick={() => onReject(req._id)}>
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AcceptRequest;
