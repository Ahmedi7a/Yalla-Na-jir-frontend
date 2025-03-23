import '../Admin/AdminStyles.css';

const DealerList = ({ dealers, onDowngrade }) => (
  <div>
    {dealers.map((dealer) => (
      <div key={dealer._id} className="admin-item">
        <span>{dealer.username}</span>
        <div className="admin-buttons">
          <button className="warning" onClick={() => onDowngrade(dealer._id)}>
            Remove Dealer Access
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default DealerList;
