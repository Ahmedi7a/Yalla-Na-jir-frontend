import '../Admin/AdminStyles.css';
import { useState, useEffect } from 'react';
import * as approvalService from '../../services/approvalService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserList = ({ users }) => {
  const [userList, setUserList] = useState(users);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  const handleDelete = async (userId) => {
    toast.info(
      <div>
        Are you sure you want to delete this user?
        <div className="mt-2 d-flex justify-content-end gap-2">
          <button
            className="btn btn-sm btn-danger"
            onClick={async () => {
              toast.dismiss();
              try {
                await approvalService.deleteUser(userId);
                setUserList((prev) => prev.filter((u) => u._id !== userId));
                toast.success('User deleted successfully');
              } catch (error) {
                toast.error('Failed to delete user');
              }
            }}
          >
            Yes, Delete
          </button>
          <button className="btn btn-sm btn-secondary" onClick={() => toast.dismiss()}>
            Cancel
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await approvalService.updateUserRole(userId, newRole);
      setUserList((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
      toast.success(`Role updated to ${newRole}`);
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  return (
    <div className="container py-4">
      <ToastContainer position="top-center" />
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {userList.map((user) => (
          <div key={user._id} className="col">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-dark">
                <h5 className="card-title mb-2 fw-semibold">
                  {user.username}
                </h5>
                <p className="card-text mb-2">
                  <strong>Role:</strong>{' '}
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="form-select form-select-sm w-auto d-inline-block ms-2"
                  >
                    <option value="user">User</option>
                    <option value="dealer">Dealer</option>
                    <option value="admin">Admin</option>
                  </select>
                </p>
                <div className="text-end mt-3">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
