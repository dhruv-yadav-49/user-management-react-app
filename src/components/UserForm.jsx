import { useState, useEffect } from "react";

function UserForm({ onAddUser, onUpdateUser, editingUser, setEditingUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // 👇 Edit mode me data pre-fill
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setPhone(editingUser.phone);
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      alert("All fields are required");
      return;
    }

    const userData = { name, email, phone };

    if (editingUser) {
      onUpdateUser(editingUser.id, userData);
      setEditingUser(null);
    } else {
      onAddUser(userData);
    }

    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fff", 
                                           padding: "15px",
                                           borderRadius: "6px", 
                                           marginBottom: "20px",
                                           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
      <h3>{editingUser ? "Edit User" : "Add User"}</h3>

      <input style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />
 
      <input style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br /><br />

      <button type="submit">
        {editingUser ? "Update User" : "Create User"}
      </button>

      {editingUser && (
        <button
          type="button"
          onClick={() => setEditingUser(null)}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default UserForm;
