import { useEffect, useState } from 'react';
import * as approvalService from '../../services/approvalService';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await approvalService.getAllUsers(); // create this if needed
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      {users.map(user => (
        <div key={user._id}>
          <p>{user.username} – {user.role}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
