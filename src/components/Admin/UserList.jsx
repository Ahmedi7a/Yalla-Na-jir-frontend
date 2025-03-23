import '../Admin/AdminStyles.css';

const UserList = ({ users }) => (
  <div>
    {users.map(user => (
      <div key={user._id} className="admin-item">
        <span>{user.username} – {user.role}</span>
      </div>
    ))}
  </div>
);

export default UserList;
