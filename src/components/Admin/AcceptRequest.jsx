import { useEffect, useState } from 'react';
import * as approvalService from '../../services/approvalService';

const AcceptRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await approvalService.getPendingDealerRequests(); // get all pending approvals
      setRequests(data);
    };
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    await approvalService.updateApprovalStatus(id, 'approved');
    setRequests(requests.filter(req => req._id !== id));
  };

  const handleReject = async (id) => {
    await approvalService.updateApprovalStatus(id, 'rejected');
    setRequests(requests.filter(req => req._id !== id));
  };

  return (
    <div>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        requests.map((req) => (
          <div key={req._id}>
            <p>{req.userId?.username || 'Unknown User'}</p>
            <button onClick={() => handleApprove(req._id)}>Approve</button>
            <button onClick={() => handleReject(req._id)}>Reject</button>
          </div>
        ))
        
      )}
    </div>
  );
};

export default AcceptRequest;
