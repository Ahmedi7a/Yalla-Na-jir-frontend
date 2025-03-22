import { useEffect, useState } from 'react';
import * as approvalService from '../../services/approvalService';

const DealerList = () => {
  const [dealers, setDealers] = useState([]);

  useEffect(() => {
    const fetchDealers = async () => {
      const data = await approvalService.getApprovedDealers(); // assumes you have this
      setDealers(data);
    };
    fetchDealers();
  }, []);

  const handleDowngrade = async (userId) => {
    await approvalService.downgradeDealer(userId);
    setDealers(dealers.filter(d => d._id !== userId));
  };

  return (
    <div>
      <h2>Approved Dealers</h2>
      {dealers.map((dealer) => (
        <div key={dealer._id}>
          <p>{dealer.username}</p>
          <button onClick={() => handleDowngrade(dealer._id)}>Remove Dealer Access</button>
        </div>
      ))}
    </div>
  );
};

export default DealerList;
