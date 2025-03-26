import { useState } from 'react';
import '../Admin/AdminStyles.css';

const MAX_LENGTH = 100; 

const AcceptRequest = ({ requests, onApprove, onReject }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredRequests = requests.filter(
    (request) => request.userId?.role !== 'dealer'
  );

  return (
    <div>
      {filteredRequests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        filteredRequests.map((req) => {
          const desc = req.description || 'No reason provided.';
          const isLong = desc.length > MAX_LENGTH;
          const isExpanded = expanded[req._id];

          return (
            <div key={req._id} className="admin-item">
              <div className="admin-info">
                <strong>User:</strong> {req.userId?.username || 'Unknown User'} <br />
                <strong>Phone:</strong> {req.phone || 'N/A'} <br />
                <strong>Description:</strong>{' '}
                <span style={{ whiteSpace: 'pre-wrap' }}>
                  {isExpanded || !isLong ? desc : `${desc.slice(0, MAX_LENGTH)}... `}
                  {isLong && (
                    <button
                      onClick={() => toggleExpand(req._id)}
                      style={{ border: 'none', background: 'none', color: '#007bff', cursor: 'pointer', padding: 0 }}
                    >
                      {isExpanded ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </span>
              </div>
              <div className="admin-buttons mt-2" style={{ display: 'flex', gap: '3px' }}>
                <button onClick={() => onApprove(req._id)}>Approve</button>
                <button className="danger" onClick={() => onReject(req._id)}>
                  Reject
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AcceptRequest;
