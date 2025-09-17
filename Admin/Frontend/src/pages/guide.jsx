import { useEffect, useState } from "react";
import axios from "axios";
import "../components/guide.css";

export default function Guides() {
  const [guides, setGuides] = useState([]);
  const [createData, setCreateData] = useState({
    condition: "",
    description: "",
    tags: "",
  });

  const [updateData, setUpdateData] = useState({
    id: "",
    condition: "",
    description: "",
    tags: "",
  });

  const [deleteId, setDeleteId] = useState("");

  const API_URL = "http://localhost:5000/api/articles"; // replace with your backend URL

  // Fetch all guides
  const fetchGuides = async () => {
    try {
      const res = await axios.get(API_URL);
      setGuides(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  // Create Guide
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!createData.condition || !createData.description) return alert("Condition and Description are required");
    try {
      await axios.post(API_URL, {
        title: createData.condition,
        body: createData.description,
        tags: createData.tags,
      });
      setCreateData({ condition: "", description: "", tags: "" });
      fetchGuides();
    } catch (err) {
      console.error(err);
    }
  };

  // Update Guide
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateData.id || !updateData.condition || !updateData.description)
      return alert("ID, Condition, and Description are required");
    try {
      await axios.put(`${API_URL}/${updateData.id}`, {
        title: updateData.condition,
        body: updateData.description,
        tags: updateData.tags,
      });
      setUpdateData({ id: "", condition: "", description: "", tags: "" });
      fetchGuides();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Guide
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!deleteId) return alert("Select a guide to delete");
    if (!window.confirm("Are you sure you want to delete this guide?")) return;
    try {
      await axios.delete(`${API_URL}/${deleteId}`);
      setDeleteId("");
      fetchGuides();
    } catch (err) {
      console.error(err);
    }
  };

  // Fill Update Form from table row
  const fillUpdateForm = (guide) => {
    setUpdateData({
      id: guide._id,
      condition: guide.title,
      description: guide.body,
      tags: guide.tags,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="guides-page">
      <header className="topbar">
        <h1>First-Aid Guides</h1>
      </header>

      {/* Forms Section in Horizontal Layout */}
<section className="forms-container">
  {/* Create Guide Form */}
  <div className="form-section">
    <h2>Add New Guide</h2>
    <form onSubmit={handleCreate} className="guide-form">
      <div className="form-group">
        <label>Condition</label>
        <input
          type="text"
          name="condition"
          value={createData.condition}
          onChange={(e) => setCreateData({ ...createData, condition: e.target.value })}
          placeholder="Enter condition"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={createData.description}
          onChange={(e) => setCreateData({ ...createData, description: e.target.value })}
          placeholder="Enter description"
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>Tags</label>
        <input
          type="text"
          name="tags"
          value={createData.tags}
          onChange={(e) => setCreateData({ ...createData, tags: e.target.value })}
          placeholder="Enter tags"
        />
      </div>
      <button type="submit" className="add-btn">Add Guide</button>
    </form>
  </div>

  {/* Update Guide Form */}
  <div className="form-section">
    <h2>Update Guide</h2>
    <form onSubmit={handleUpdate} className="guide-form">
      <div className="form-group">
        <label>Guide ID</label>
        <input type="text" name="id" value={updateData.id} readOnly />
      </div>
      <div className="form-group">
        <label>Condition</label>
        <input
          type="text"
          name="condition"
          value={updateData.condition}
          onChange={(e) => setUpdateData({ ...updateData, condition: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={updateData.description}
          onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>Tags</label>
        <input
          type="text"
          name="tags"
          value={updateData.tags}
          onChange={(e) => setUpdateData({ ...updateData, tags: e.target.value })}
        />
      </div>
      <button type="submit" className="add-btn">Update Guide</button>
    </form>
  </div>

  {/* Delete Guide Form */}
  <div className="form-section">
    <h2>Delete Guide</h2>
    <form onSubmit={handleDelete} className="guide-form">
      <div className="form-group">
        <label>Select Guide to Delete</label>
        <select value={deleteId} onChange={(e) => setDeleteId(e.target.value)}>
          <option value="">--Select--</option>
          {guides.map((g) => (
            <option key={g._id} value={g._id}>
              {g.title}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="delete-btn">Delete Guide</button>
    </form>
  </div>
</section>

      {/* Guides Table */}
      <section className="table-section">
        <h2>Stored Guides</h2>
        <table className="guides-table">
          <thead>
            <tr>
              <th>Condition</th>
              <th>Description</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {guides.length > 0 ? (
              guides.map((g) => (
                <tr key={g._id}>
                  <td>{g.title}</td>
                  <td>{g.body}</td>
                  <td>{g.tags}</td>
                  <td>
                    <button className="edit-btn" onClick={() => fillUpdateForm(g)}>Edit</button>
                    <button className="delete-btn" onClick={() => { setDeleteId(g._id); handleDelete(new Event('submit')); }}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No guides available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
