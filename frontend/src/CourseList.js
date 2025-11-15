import CourseCard from "./CourseCard";

function CourseList({ courses, deleteCourse }) {
  return (
    <div>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        courses.map(course => (
          <CourseCard 
            key={course.id} 
            course={course} 
            deleteCourse={deleteCourse} 
          />
        ))
      )}
    </div>
  );
}

export default CourseList;
