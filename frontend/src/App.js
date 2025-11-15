import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Load students
  useEffect(() => {
    axios.get("http://localhost:4000/students")
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  }, []);

  // Add or Update student
  const handleSubmit = () => {
    const student = { name, course };

    if (editingId) {
      // UPDATE
      axios.put(`http://localhost:4000/students/${editingId}`, student)
        .then(() => {
          setStudents(students.map(s => s.id === editingId ? { id: editingId, ...student } : s));
          setEditingId(null);
          setName("");
          setCourse("");
        });
    } else {
      // CREATE
      axios.post("http://localhost:4000/students", student)
        .then(res => {
          setStudents([...students, res.data]);
          setName("");
          setCourse("");
        });
    }
  };

  // DELETE
  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/students/${id}`)
      .then(() => setStudents(students.filter(s => s.id !== id)));
  };

  // ENABLE EDIT MODE
  const startEdit = (student) => {
    setEditingId(student.id);
    setName(student.name);
    setCourse(student.course);
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Student Registration App</h2>

      {/* Form Card */}
      <div className="card p-3 mb-4">
        <h4>{editingId ? "Edit Student" : "Add Student"}</h4>

        <input
          type="text"
          className="form-control"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          className="form-control"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleSubmit}>
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button
            className="btn btn-secondary"
            onClick={() => {
              setEditingId(null);
              setName("");
              setCourse("");
            }}
          >
            Cancel
          </button>
        )}

      </div>

      {/* Student List */}
      <div className="card p-3">
        <h4>Registered Students</h4>

        {students.length === 0 ? (
          <p>No students yet.</p>
        ) : (
          <ul className="list-group">
            {students.map(student => (
              <li key={student.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{student.name}</strong> – {student.course}
                </div>

                <div>
                  <button className="btn btn-warning btn-sm" onClick={() => startEdit(student)}>
                    Edit
                  </button>

                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student.id)}>
                    Delete
                  </button>
                </div>

              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

export default App;
