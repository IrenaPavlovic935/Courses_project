import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { MdCheckCircle } from 'react-icons/md';
import deleteImage from './delete.png';
function TeacherList() {
  const [teacherList, setTeacherList] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const currentUserUsername = localStorage.getItem('user_name');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentTeacherToDelete, setCurrentTeacherToDelete] = useState(null);
  const [isBlurBackgroundActive, setIsBlurBackgroundActive] = useState(false);
  const location = useLocation();
  const { state } = location;
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  useEffect(() => {
    fetchTeachers();
  }, []);

  
   useEffect(() => {
    if (state && state.successMessage) {
      setSuccessMessage(state.successMessage);
      setShowSuccessMessage(true);
    }
  }, [state]);

  const fetchTeachers = () => {
    fetch('http://127.0.0.1:8019/api/teacher-list/')
      .then((response) => response.json())
      .then((data) => setTeacherList(data))
      .catch((error) => {
        console.error('Error fetching teacher list:', error);
      });
  };

  const isCurrentUserOwner = (teacher) => {
    return currentUserUsername === teacher.owner;
  };

  const handleEdit = (teacher) => {
    return (
      <Link to={`/edit-teacher/${teacher.id}`} className="btn btn-sm btn-outline-info">
        Edit
      </Link>
    );
  };

  const handleDelete = (teacher) => {
    setCurrentTeacherToDelete(teacher);
    setShowDeleteModal(true);
    setIsBlurBackgroundActive(true);
  };

  const handleModalClose = () => {
    setShowDeleteModal(false);
    setIsBlurBackgroundActive(false);
  };
  
  const handleTeacherDelete = (teacher) => {
    fetch(`http://127.0.0.1:8019/api/teacher-delete/${teacher.id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchTeachers();
        setShowDeleteModal(false);
      })
      .catch((error) => {
        console.error('Error deleting teacher:', error);
      });
  };
  

  const handleScrollLeft = () => {
    const cardWidth = document.querySelector('.teacher-card').offsetWidth;
    const slider = document.querySelector('.teacher-slider');
    const newPosition = scrollPosition - 1;
  
    if (newPosition >= 0) {
      slider.scrollLeft -= cardWidth;
      setScrollPosition(newPosition);
    } else {
      const totalWidth = cardWidth * teacherList.length;
      slider.scrollLeft = totalWidth - slider.offsetWidth;
      //od totalne sirine oduzimamo trenutno vdjljivu nas ekranu kako bi omogucili skrol
      setScrollPosition(teacherList.length - 1);
    }
  };
  
  const handleScrollRight = () => {
    const cardWidth = document.querySelector('.teacher-card').offsetWidth;
    const slider = document.querySelector('.teacher-slider');
    const newPosition = scrollPosition + 1;
  
    if (newPosition < teacherList.length) {
      slider.scrollLeft += cardWidth;
      setScrollPosition(newPosition);
    } else {
      slider.scrollLeft = 0;
      setScrollPosition(0);
    }
  };

  return (
          <div className="teacher-list-container">
            <div className='title_for_list_course'>
              <h1><AiOutlineUser size={32} />
              Teacher List</h1>
              <p>
                <Link to="/">Home</Link> / <Link to="/teacher-list">Teachers</Link>
              </p>
            </div>
            {showSuccessMessage && (
        <div className="success-message">
          <MdCheckCircle style={{ color: 'white', fontSize: '25px' }} />
          {successMessage}
          <button className="close-button" onClick={() => setShowSuccessMessage(false)} style={{background:'rgb(105, 214, 105)'}}>x</button>
        </div>
      )}
      <div className="teacher-slider">
        <div className="teacher-cards">
          {teacherList.map((teacher, index) => (
            <div key={teacher.id} className={`teacher-card ${index === scrollPosition ? 'active' : ''}`}>
              <h1>
                {teacher.first_name} {teacher.last_name}
              </h1>
              <p>Email: {teacher.email}</p>
              <p>Gender: {teacher.gender}</p>
              <p>City: {teacher.city}</p>
              <p>Street: {teacher.street}</p>
              <p>Address: {teacher.address}</p>
              <Link to={`/edit-teacher/${teacher.id}`}>
                {isCurrentUserOwner(teacher) && (
                  <button className="btn btn-sm btn-outline-info">Edit</button>
                )}
              </Link>
              {isCurrentUserOwner(teacher) && (
                <button className="btn btn-sm btn-outline-dark" onClick={() => handleDelete(teacher)}>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <button className="scroll" onClick={handleScrollLeft}>
        &lt;
      </button>
      <button className="scroll" onClick={handleScrollRight}>
        &gt;
      </button>
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
                <p>Do you really want to delete this teacher? This process cannot be undone.</p>
              </div>
              <div className="footer_for_modal">
                <button className='cancel' onClick={handleModalClose}>Cancel</button>
                <button onClick={() => handleTeacherDelete(currentTeacherToDelete)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
      </div>
    )}

  </div>
    
  );
}

export default TeacherList;
