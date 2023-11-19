import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { MdCheckCircle } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import deleteImage from './delete.png';
function StudentList() {
  const [studentList, setStudentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(6);
  const currentUserUsername = localStorage.getItem('user_name');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentStudentToDelete, setCurrentStudentToDelete] = useState(null);
  const [isBlurBackgroundActive, setIsBlurBackgroundActive] = useState(false);
  const location = useLocation();
  const { state } = location;
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (state && state.successMessage) {
      setSuccessMessage(state.successMessage);
      setShowSuccessMessage(true);
    }
  }, [state]);

  const fetchStudents = () => {
    fetch('http://127.0.0.1:8019/api/student-list/')
      .then((response) => response.json())
      .then((data) => setStudentList(data))
      .catch((error) => {
        console.error('Error fetching student list:', error);
      });
  };

  const handleEdit = (student) => {
    return (
      <Link to={`/edit-student/${student.id}`} className="btn btn-sm btn-outline-info">
        Edit
      </Link>
    );
  };

  const handleDelete = (student) => {
    setCurrentStudentToDelete(student);
    setShowDeleteModal(true);
    setIsBlurBackgroundActive(true);
  };
  
  const handleModalClose = () => {
    setShowDeleteModal(false);
    setIsBlurBackgroundActive(false);
  };
  
  const handleStudentDelete = (student) => {
    fetch(`http://127.0.0.1:8019/api/student-delete/${student.id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchStudents();
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
      });
  };
  

  const isCurrentUserOwner = (student) => {
    return currentUserUsername === student.username;
  };

  const indexOfLastStudents = currentPage * studentsPerPage;
  const indexOfFirstStudents = indexOfLastStudents - studentsPerPage;
  const currentStudents = studentList.slice(indexOfFirstStudents, indexOfLastStudents);

  const MAX_DESCRIPTION_LENGTH = 70;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(studentList.length / studentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="title_for_list_course">
        <h1>
          <AiOutlineUser size={32} />
          Student List
        </h1>
        <p>
          <Link to="/">Home</Link> / <Link to="/students-list">Students</Link>
        </p>
      </div>
      {showSuccessMessage && (
      <div className="success-message" style={{marginTop:'5px'}}>  <MdCheckCircle style={{ color: 'white', fontSize: '25px' }} />{successMessage}
      <button className="close-button" onClick={() => setShowSuccessMessage(false)} style={{background:(105, 214, 105)}}>x</button></div>
    )}
      <div id="list-wrapper">
        {currentStudents.map((student, index) => (
          <div key={student.id} className="task-wrapper flex-wrapper">
            <div style={{ flex: 6 }}>
              <div className='student_name'> {student.first_name} {student.last_name}</div>
              <div className='student_info'>Email: {student.email}</div>
              <div className='student_info'>Gender: {student.gender}</div>
              <div className='student_info'>City: {student.city}</div>
              <div className='student_info'>Street: {student.street}</div>
              <div className='student_info'>Address: {student.address}</div>
              <div className='student_info'>Date of Birth: {student.date_of_birth}</div>
            </div>
            <div className="button-container">
              {isCurrentUserOwner(student) && handleEdit(student)}
              {isCurrentUserOwner(student) && (
                <button
                  onClick={() => handleDelete(student)}
                  className="btn btn-sm btn-outline-dark"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {currentPage > 1 && <button className='btn btn-sm btn-outline-info' onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`btn btn-sm btn-outline-info ${currentPage === number ? 'active' : ''}`}>
            {number}
          </button>
        ))}
        {currentPage < Math.ceil(studentList.length / studentsPerPage) && <button className='btn btn-sm btn-outline-info' onClick={() => setCurrentPage(currentPage + 1)}>Next</button>}
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
          <p>Do you really want to delete this student? This process cannot be undone.</p>
        </div>
        <div className="footer_for_modal">
          <button className='cancel'onClick={handleModalClose}>Cancel</button>
          <button onClick={() => handleStudentDelete(currentStudentToDelete)} className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default StudentList;
