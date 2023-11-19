import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';

function TeacherAdd() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [activeTeacher, setActiveTeacher] = useState({
    username: '',
    first_name: '',
    last_name: '',
    gender: '', 
    email: '',
    city: '',
    street: '',
    address: '',
    owner: ''
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      setIsUserLoggedIn(true);
      const username = localStorage.getItem('user_name');

      setActiveTeacher(prevActiveTeacher => ({
        ...prevActiveTeacher,
        owner: username,
      }));
    } else {
      setIsUserLoggedIn(false);
    }
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
    setActiveTeacher({
      ...activeTeacher,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); 

    const csrftoken = getCookie('csrftoken');
    const url = 'http://127.0.0.1:8019/api/teacher-create/';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(activeTeacher),
    })
    .then((response) => {
      if (response.ok) {
        const successMessage = 'The teacher has been successfully added!';
        setSuccessMessage(successMessage);
        navigate('/teacher-list', { state: { successMessage } });
      } else {
        return response.json().then(data => {
          if (response.status === 400) {
            if (data.error_type === "validation_error") {
              setError(`Invalid input. Please check your email, username, and password. Details: ${data.error_message}`);
            } else {
              setError('An error occurred. Please try again.');
            }
          } else if (response.status === 500) {
            setError('An existing email or username, your email and username must be unique');
          } else {
            setError('An error occurred. Please try again.');
          }
        });
      }
    })
  }
    
  return (
    <div id="teacher-container">
      {error && 
    (<div className="error-message" style={{position:'relative', marginLeft:'-80px'}}>
    <FaExclamationCircle />
    {error}
    <span className="close-btn" onClick={() => setError(null)}>&times;</span>
    </div>)}
      {isUserLoggedIn ? (
        <div id="form-wrapper">
          <h1>Add Teacher</h1>
          <form onSubmit={handleSubmit} id="form">
            <div className="flex-wrapper">
              <div className="teacher-username">
                <input
                  onChange={handleChange}
                  value={activeTeacher.username}
                  className="form-control"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
              </div>
              <div className="teacher-first_name">
                <input
                  onChange={handleChange}
                  value={activeTeacher.first_name}
                  className="form-control"
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                />
              </div>
              <div className="teacher-last_name">
                <input
                  onChange={handleChange}
                  value={activeTeacher.last_name}
                  className="form-control"
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                />
              </div>
              <div className="teacher-gender">
                <select
                  onChange={handleChange}
                  value={activeTeacher.gender}
                  className="form-control"
                  name="gender"
                >
                  <option value="" disabled>Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>


              <div className="teacher-email">
                <input
                  onChange={handleChange}
                  value={activeTeacher.email}
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="teacher-city">
                <input
                  onChange={handleChange}
                  value={activeTeacher.city}
                  className="form-control"
                  type="text"
                  name="city"
                  placeholder="City"
                />
              </div>
              <div className="teacher-street">
                <input
                  onChange={handleChange}
                  value={activeTeacher.street}
                  className="form-control"
                  type="text"
                  name="street"
                  placeholder="Street"
                />
              </div>
              <div className="teacher-address">
                <input
                  onChange={handleChange}
                  value={activeTeacher.address}
                  className="form-control"
                  type="text"
                  name="address"
                  placeholder="Address"
                />
              </div>
              <div className="teacher-owner" style={{ display: 'none' }}>
                <input
                  onChange={handleChange}
                  value={activeTeacher.owner}
                  className="form-control"
                  type="text"
                  name="owner"
                />
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <input id="submit" className="btn" type="submit" value="Add Teacher" />
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className='robot'>
            <img src={require('./robi4.png')} alt="Logo" />
          </div>
          <div className='message'>
            <h1>You must be logged in to access this page</h1>
            <Link to="/login" className="login-link">Log in here</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherAdd;
