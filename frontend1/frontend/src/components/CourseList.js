import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { MdCheckCircle } from 'react-icons/md';
import Modal from './Modal';
import deleteImage from './delete.png';
import { useLocation } from 'react-router-dom';
import axiosInstance from './axios';
import { MdError } from 'react-icons/md';

function CourseList() {
  const [courseList, setCourseList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCourseToDelete, setCurrentCourseToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [coursesPerPage, setCoursesPerPage] = useState(6);
  const currentUserUsername = localStorage.getItem('user_name');
  const [isBlurBackgroundActive, setIsBlurBackgroundActive] = useState(false);
  const location = useLocation();
  const { state } = location;
  const[errorMessage, setErrorMessage]=useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const[showErrorMessage, setShowErrorMessage]=useState(false);
  const [studentList, setStudentList] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  


  useEffect(() => {
    fetchCourse();
    fetchStudents();
  }, []);

 
  useEffect(() => {
    if (state && state.successMessage) {
      setSuccessMessage(state.successMessage);
      setShowSuccessMessage(true);
    }
  }, [state]);


  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  const fetchCourse = () => {
    console.log('Fetching...');
    fetch('http://127.0.0.1:8019/api/course-list/')
      .then((response) => response.json())
      .then((data) => setCourseList(data))
      .catch((error) => {
        console.error('Error fetching course list:', error);
      });
  };

  const fetchStudents = () => {
    fetch('http://127.0.0.1:8019/api/student-list/')
      .then((response) => response.json())
      .then((data) => setStudentList(data))
      .catch((error) => {
        console.error('Error fetching student list:', error);
      });
  };
  const isCurrentUserStudent = () => {
    return studentList.some(student => student.username === currentUserUsername);
    /*some metodu za nizove, koja vraća true ako bar jedan element niza zadovoljava određeni uslov*/
  };
  const handleEdit = (course) => (
    <Link to={`/edit-course/${course.id}`} className="btn btn-sm btn-outline-info">
      Edit
    </Link>
  );
  const handleJoinCourse = (courseId) => {
    const selectedCourse = courseList.find(course => course.id === courseId);
  
    if (!selectedCourse) {
      console.error("Selected course not found");
      return;
    }
  
    // const isCurrentUserEnrolled = selectedCourse.students.some(student => student.username === currentUserUsername);
  
    axiosInstance.post(`enroll-student/`, {
      course_id: courseId,
      student_username: currentUserUsername,
    })
      .then(response => handleSuccess(response))
      .catch(error => handleErrorResponse(error));
  };
  
  const handleSuccess = (response) => {
    if (response && response.data && response.data.message) {
      setSuccessMessage(response.data.message);
      setShowSuccessMessage(true);
      fetchCourse();
    } else {
      handleErrorResponse();
    }
  };
  
  const handleErrorResponse = (error) => {
    console.error('Error while enrolling student:', error);
    if (error.response && error.response.status === 409) {
      setErrorMessage("You are already enrolled in this course!");
    } else {
      console.error('Invalid response format');
      setErrorMessage("Error: Unexpected response format.");
    }
  
    setShowErrorMessage(true);
  };
  
  
  const handleDelete = (course) => {
    setCurrentCourseToDelete(course);
    setShowDeleteModal(true);
    setIsBlurBackgroundActive(true);
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
    setIsBlurBackgroundActive(false);
  };
  
  
  const handleCourseDelete = (course) => {
    fetch(`http://127.0.0.1:8019/api/course-delete/${course.id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchCourse();
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.error('Error deleting course:', error);
      });
  };

  const indexOfLastCourses = currentPage * coursesPerPage;
  const indexOfFirstCourses = indexOfLastCourses - coursesPerPage;
  const currentCourses = courseList.slice(indexOfFirstCourses, indexOfLastCourses);

  const isCurrentUserOwner = (course) => currentUserUsername === course.owner;

  const MAX_DESCRIPTION_LENGTH = 70;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(courseList.length / coursesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className="title_for_list_course">
        <h1>
          <FiEdit /> Available Courses
        </h1>
        <p>
          <Link to="/">Home</Link> / <Link to="/course-list">Courses</Link>
        </p>
      </div>
      {showSuccessMessage && (
  <div className="success-message" style={{marginTop:'5px'}}>
    <MdCheckCircle style={{ color: 'white', fontSize: '25px' }} />
    {successMessage}
    <button className="close-button" onClick={() => setShowSuccessMessage(false)} style={{background:(105, 214, 105)}}>x</button>
  </div>
)}

{showErrorMessage && (
  <div className="error-message">
    <MdError style={{ color: 'white', fontSize: '25px' }} />
    {errorMessage}
    <button className="close-button" onClick={() => setShowErrorMessage(false)} style={{background:'#ff6b6b', color:'white'}}>x</button>
  </div>
)}



      <div id="list-wrapper">
        {currentCourses.map((course, index) => (
          <div key={index} className="task-wrapper flex-wrapper">
            <img src="https://www.geteducated.com/wp-content/uploads/2019/11/online-tutoring-concept-ebooks-internet-courses-process-vector-staff-vector-id1053519062.jpg" alt="Course" />
            <div>
              <div className="title_for_course">{course.title}</div>
              <div>
                Description: {course.description.slice(0, MAX_DESCRIPTION_LENGTH)}{' '}
                {course.description.length > MAX_DESCRIPTION_LENGTH && '...'}
              </div>
            </div>
            <div className="button-container">
              {isCurrentUserOwner(course) && handleEdit(course)}
              {isCurrentUserOwner(course) && (
                <button
                  onClick={() => handleDelete(course)}
                  className="btn btn-sm btn-outline-dark"
                >
                  Delete
                </button>
              )}
              <Link to={`/course-detail/${course.id}`} className="btn btn-sm btn-outline-info">
                View Details
              </Link>
              {isUserLoggedIn ? (
                  isCurrentUserStudent() ? (
                    isCurrentUserOwner(course) ? (
                      null
                    ) : (
                      <button
                        onClick={() => handleJoinCourse(course.id)}
                        className="btn btn-sm btn-outline-info" 
                      >
                        Join the course
                      </button>
                    )
                  ) : (
                    <Link to="/student-add" className="btn btn-sm btn-outline-info" style={{ marginLeft: 5 }}>
                      Register as Student
                    </Link>
                  )
                ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <button className="btn btn-sm btn-outline-info" onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </button>
        )}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`btn btn-sm btn-outline-info ${currentPage === number ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}
        {currentPage < Math.ceil(courseList.length / coursesPerPage) && (
          <button className="btn btn-sm btn-outline-info" onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
      {showDeleteModal && (
  <div className="modalBackground">
    <div className="blur-background"> 
      <div className="modalContainer">
        <button className='remove' onClick={handleModalClose}>x</button>
        <div className='delete_image'>
          <img src={deleteImage} alt="Logo" style={{ width: '90px', height: '80px' }}/>
        </div>
        <div className="title_for_modal">
          <h1>Are You Sure?</h1>
        </div>
        <div className="body_for_modal">
          <p>Do you really want to delete these records? This<br/>process cannot be undone.</p>
        </div>
        <div className="footer_for_modal">
          <button onClick={handleModalClose} className='cancel'>Cancel</button>
          <button  onClick={() => handleCourseDelete(currentCourseToDelete)} className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default CourseList;