import '../Admin/AdminStyles.css';

const AcceptRequest = ({ requests, onApprove, onReject }) => {
  // Filter out requests from users who are already dealers
  const filteredRequests = requests.filter(request => 
    request.userId?.role !== 'dealer'
  );

  return (
    <div>
      {filteredRequests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        filteredRequests.map((req) => (
          <div key={req._id} className="admin-item">
            <span>{req.userId?.username || 'Unknown User'}</span>
            <div className="admin-buttons">
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
