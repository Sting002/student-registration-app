function CourseCard({ course, deleteCourse }) {
  return (
    <div className="course-card">
      <h4>{course.name}</h4>
      <p><b>Lecturer:</b> {course.lecturer}</p>
      <button onClick={() => deleteCourse(course.id)}>
        Delete
      </button>
    </div>
  );
}

export default CourseCard;
