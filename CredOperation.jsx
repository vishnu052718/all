import React, { useState } from "react";

const CredOperation= () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Update
      const updated = [...data];
      updated[editingIndex] = formData;
      setData(updated);
      setEditingIndex(null);
    } else {
      // Create
      setData([...data, formData]);
    }
    setFormData({ name: "", email: "" });
  };

  const handleEdit = (index) => {
    setFormData(data[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = data.filter((_, i) => i !== index);
    setData(filtered);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>CRUD App in React</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingIndex !== null ? "Update" : "Add"}</button>
      </form>

      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr><td colSpan="3">No data</td></tr>
          )}
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td><td>{item.email}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>{" "}
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CredOperation;