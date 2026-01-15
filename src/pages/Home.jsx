import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Loader from "../components/Loader";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/userApi";
import UserForm from "../components/UserForm";

function Home() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  // CREATE
  const handleAddUser = async (userData) => {
    const createdUser = await createUser(userData);
    setUsers([{ ...createdUser, id: users.length + 1 }, ...users]);
  };

  // UPDATE
  const handleUpdateUser = async (id, userData) => {
    try {
      const updated = await updateUser(id, userData);
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, ...updated } : user
        )
      );
    } catch {
      alert("Failed to update user");
    }
  };

  // ✅ DELETE
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch {
      alert("Failed to delete user");
    }
  };

 if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>

      <UserForm
        onAddUser={handleAddUser}
        onUpdateUser={handleUpdateUser}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
      />

        <div style={{ overflowX: "auto" }}>
        <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/user/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button className="edit-btn" onClick={() => setEditingUser(user)}>
                  Edit
                </button>

                <button
                  className="delete-btn" onClick={() => handleDeleteUser(user.id)}
                  style={{ marginLeft: "10px", color: "white" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Home;
