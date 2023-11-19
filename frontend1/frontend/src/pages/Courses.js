import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import robiImage from '../components/robi4.png';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [activeItem, setActiveItem] = useState({
    title: '',
    start_date: '',
    end_date: '',
    teacher: '', 
    description: '',
    owner: '',
  });
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      setIsUserLoggedIn(true);
      const username = localStorage.getItem('user_name');
      setActiveItem((activeItem) => ({ ...activeItem, owner: username }));
    } else {
      setIsUserLoggedIn(false);
    }
    fetchTeachers(); 

  }, []);

  const getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActiveItem({
      ...activeItem,
      [name]: value,
    });
  };

    const handleSubmit = (e) => {
      e.preventDefault();

      const csrftoken = getCookie('csrftoken');
      const url = 'http://127.0.0.1:8019/api/course-create/';

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(activeItem),
      })
    .then((response) => {
    if (response.ok) {
      const successMessage = 'The course has been successfully added!';
      setSuccessMessage(successMessage);
      navigate('/course-list', { state: { successMessage } });
    } else {
      setSuccessMessage('An error occurred while adding the course.');
    }
  })
  .catch(function (error) {
      console.log('ERROR:', error);
    });
  };

  const fetchTeachers = () => {
    fetch('http://127.0.0.1:8019/api/teacher-list/')
      .then((response) => response.json())
      .then((data) => setTeachers(data))
      .catch((error) => {
        console.error('Error fetching teachers:', error);
      });
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = `${currentDate.getMonth() + 1}`.padStart(2, '0'); 
    const day = `${currentDate.getDate()}`.padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  };

  return (
    <div id="task-containerr">
      {isUserLoggedIn ? (
        <div id="form-wrapper">
          <h1>Add Course</h1>
          <form onSubmit={handleSubmit} id="form">
            <div className="flex-wrapper">
              <div className="course-title">
                <input
                  onChange={handleChange}
                  value={activeItem.title}
                  className="form-control"
                  type="text"
                  name="title"
                  placeholder="Course Title"
                />
              </div>
              <div className="course-start_date">
                <input
                  onChange={handleChange}
                  value={activeItem.start_date}
                  className="form-control"
                  type="date"
                  name="start_date"
                  placeholder="Start Date"
                  min={getCurrentDate()}
                />
              </div>
              <div className="course-end_date">
                <input
                  onChange={handleChange}
                  value={activeItem.end_date}
                  className="form-control"
                  type="date"
                  name="end_date"
                  placeholder="End Date"
                  min={activeItem.start_date} 
                />
              </div>

            <div className="form-group">
                <select
                  className="form-control"
                  id="teacher"
                  name="teacher"
                  value={activeItem.teacher}
                  onChange={handleChange}
                >
                  <option value="">Select a teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.username} value={teacher.username}>
                      {teacher.username}
                    </option>
                  ))}
                </select>
              </div>
              <div className="course-description">
                <textarea
                  onChange={handleChange}
                  value={activeItem.description}
                  className="form-control"
                  name="description"
                  placeholder="Course Description"
                />
              </div>
              <div className="course-owner" style={{ display: 'none' }}>
                <input
                  onChange={handleChange}
                  value={activeItem.owner}
                  className="form-control"
                  type="hidden"
                  name="owner"
                />
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <input id="submit" className="btn" type="submit" value="Add Course" />
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className="robot">
            <img src={robiImage} alt="Robi Image" />
          </div>
          <div className="message">
            <h1>You must be logged in to access this page</h1>
            <Link to="/login" className="login-link">
              Log in here
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
