import { useState } from "react";
import "../components/guide.css";

export default function Guides() {
  const [guides, setGuides] = useState([
    { condition: "Burns", description: "Cool the burn under running water for 10 minutes.", tags: "burn" },
    { condition: "Fracture", description: "Immobilize the area and avoid movement until medical help arrives.",tags: "fracture" },
  ]);

  const [formData, setFormData] = useState({
    id: "",
    condition: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.id || !formData.condition || !formData.description) {
      alert("All fields are required!");
      return;
    }

    setGuides([...guides, formData]);
    setFormData({ id: "", condition: "", description: "" });
  };

  return (
    <div className="guides-page">
      <header className="topbar">
        <h1>First-Aid Guides</h1>
      </header>

      {/* Add Guide Form */}
      <section className="form-section">
        <h2>Add New Guide</h2>
        <form onSubmit={handleSubmit} className="guide-form">
          <div className="form-group">
            <label>Condition</label>
            <input
              type="text"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              placeholder="Enter condition"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows="3"
            />
          </div>
            <div className="form-group">
            <label>Tegs</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Enter tags"
            />
          </div>
          <button type="submit" className="add-btn">
            Add Guide
          </button>
        </form>
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
            </tr>
          </thead>
          <tbody>
            {guides.length > 0 ? (
              guides.map((g, index) => (
                <tr key={index}>
                  <td>{g.condition}</td>
                  <td>{g.description}</td>
                  <td>{g.tags}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No guides available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
