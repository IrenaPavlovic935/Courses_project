import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaCalendar, FaChalkboardTeacher } from 'react-icons/fa';
import { FaInfoCircle } from 'react-icons/fa';



function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchCourseAndStudents = async () => {
      try {
        
        const courseResponse = await fetch(`http://127.0.0.1:8019/api/course-detail/${courseId}/`);
        const courseData = await courseResponse.json();
        setCourse(courseData);

        const studentRequests = courseData.students.map((studentId) =>
          fetch(`http://127.0.0.1:8019/api/student-detail/${studentId}/`).then((response) => response.json())
        );
        const studentData = await Promise.all(studentRequests);
        console.log(studentData)
        setStudents(studentData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCourseAndStudents();
  }, [courseId]);

  return (


    <div className='detail'>
      <div className="image-overlay">
      <img src={require('./hero_for_detail.jpg')}/>
      </div>
      <div className='information_for_course'>
          <h2>{course?.title}</h2>
            {/* <Link to="/course-list" className='show2'>
              Show Courses
            </Link> */}
        </div>
   
      <div className='details'>
     
        <div className='details_courses'>
        
          <div className='start_date'>
            <div className='start_date_image'>
              <img src={require('./start_date.png')} alt="Logo"  style={{ width: '90px', height: '90px' , marginTop:'20px', marginLeft:'10px'}}/>
            </div>
          <div className='start_date_information'>
          <p>Course Start Date</p>
          <h>  {course?.start_date}</h><br/>
          </div>
      
          </div>
          <div className='start_date'>
              <div className='start_date_image'>
                <img src={require('./end_date.jpg')} alt="Logo"  style={{ width: '90px', height: '90px' , marginTop:'20px', marginLeft:'10px', borderRadius:'50%'}}/>
              </div>
            <div className='start_date_information'>
              <p>Course End Date </p>
              <h>{course?.end_date}</h><br/>
            </div>
          </div>
          <div className='start_date'>
            <div className='start_date_image'>
              <img src="https://toppng.com/uploads/preview/tppt-guru-icon-icon-guru-11553490787eay8im91al.png"  style={{ width: '90px', height: '90px' , marginTop:'20px', marginLeft:'10px',borderRadius:'50%'}}/>
            </div>
            <div className='start_date_information'>
              <p>Your instructor for this course</p>
              <h>{course?.teacher}</h>
              <h>{course?.teacher?.first_name} {course?.teacher?.last_name}</h>
              


            </div>
          </div>
        </div>
        
        

        
            <div className='about_this_course'>
              <h>DESCRIPTION</h>
              <h2>About This Course</h2>
            <p> {course?.description}</p>
            </div>
     
      </div>
      <div className="students-container">
      <h2>Enrolled Students</h2>
  {students.length > 0 ? (
    <table className="students-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.username}>
            <td>{student.first_name}</td>
            <td>{student.last_name}</td>
            <td>{student.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
      ) : (
        <p>No students enrolled yet.</p>
      )}
      {/* ... (remaining code) */}
    </div>
    </div>
  );
}

export default CourseDetail;
