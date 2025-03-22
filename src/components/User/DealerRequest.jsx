import { useState } from 'react';
import * as approvalService from '../../services/approvalService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DealerRequest = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    setLoading(true);
    try {
      const response = await approvalService.requestDealer();

      if (response?.status === 'pending') {
        toast.success('Your dealer request has been sent!');
        setSubmitted(true);
      } else if (response?.error) {
        toast.error(response.error);
      } else {
        toast.info('Request submitted. Waiting for admin approval.');
        setSubmitted(true);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Become a Dealer</h2>

      {submitted ? (
        <p>Your request has been sent and is pending admin approval.</p>
      ) : (
        <>
          <p>Click below to send a request to become a dealer.</p>
          <button onClick={handleRequest} disabled={loading}>
            {loading ? 'Submitting...' : 'Request Dealer Access'}
          </button>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default DealerRequest;
