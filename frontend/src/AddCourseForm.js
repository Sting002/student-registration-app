import { useState } from "react";

function AddCourseForm({ addCourse }) {
  const [name, setName] = useState("");
  const [lecturer, setLecturer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !lecturer.trim()) {
      alert("Please fill in all fields");
      return;
    }

    addCourse({ name, lecturer });
    setName("");
    setLecturer("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Course Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      
      <input 
        type="text" 
        placeholder="Lecturer"
        value={lecturer}
        onChange={(e) => setLecturer(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default AddCourseForm;
