import { CourseType } from "../../utils/types";
import "./Course.scss";

interface CourseProps {
  course: CourseType;
}

export const Course: React.FC<CourseProps> = ({ course }) => {
  return (
    <div className="course-item" style={{backgroundColor: course.bgColor}}>
      <img src={course.image} alt={course.name} />
      <h3>{course.name}</h3>
    </div>
  )
}
