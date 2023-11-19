import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [activeItem, setActiveItem] = useState({
    id: null,
    title: '',
    start_date: '',
    end_date: '',
    teacher: '',
    description: '',
  });
  const [teachers, setTeachers] = useState([]);
  const [minEndDate, setMinEndDate] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }

   
      fetchCourse(id);
 

    fetchTeachers();
  }, [id]);

  const fetchCourse = (courseId) => {
    fetch(`http://127.0.0.1:8019/api/course-detail/${courseId}/`)
      .then((response) => response.json())
      .then((data) => {
        setActiveItem(data);
        // setMinEndDate(data.start_date);
      })
      .catch((error) => {
        console.error('Error fetching course details:', error);
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
    const url = id
      ? `http://127.0.0.1:8019/api/course-update/${id}/`
      : 'http://127.0.0.1:8019/api/course-create/';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(activeItem),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Course saved successfully');
          navigate('/course-list');
        } else {
          console.error('Failed to save course');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

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

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = `${currentDate.getMonth() + 1}`.padStart(2, '0');
    const day = `${currentDate.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className='form-wrapper-edit'>
      <div>
        <h2>Edit Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={activeItem.title}
              onChange={handleChange}
              placeholder="Course Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="start_date">Start Date:</label>
            <input
              type="date"
              className="form-control"
              id="start_date"
              name="start_date"
              value={activeItem.start_date}
              onChange={handleChange}
              placeholder="Start Date"
              min={getCurrentDate()} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_date">End Date:</label>
            <input
              type="date"
              className="form-control"
              id="end_date"
              name="end_date"
              value={activeItem.end_date}
              onChange={handleChange}
              placeholder="End Date"
              min={activeItem.start_date} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="teacher">Teacher:</label>
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
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={activeItem.description}
              onChange={handleChange}
              placeholder="Course Description"
            />
          </div>
          <button type="submit" className="edit-purse">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCourse;
