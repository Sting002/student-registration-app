import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Temporary in-memory database
let students = [];

// Get all students
app.get("/students", (req, res) => {
  res.json(students);
});

// Add student
app.post("/students", (req, res) => {
  const { name, course } = req.body;

  const newStudent = {
    id: uuidv4(),
    name,
    course
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Update student
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { name, course } = req.body;

  const studentIndex = students.findIndex(s => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students[studentIndex] = { id, name, course };
  res.json(students[studentIndex]);
});

// Delete student
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;

  students = students.filter(student => student.id !== id);

  res.json({ message: "Student deleted" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
