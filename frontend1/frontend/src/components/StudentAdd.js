import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdError } from 'react-icons/md';

function StudentAdd() {
   const [successMessage, setSuccessMessage] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [newStudent, setNewStudent] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    city: '',
    street: '',
    address: '',
    date_of_birth: '',
    username: ''
  });
  
  const handleSuccessClose = () => {
    setSuccessMessage('');
  };

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      setIsUserLoggedIn(true);
      const username = localStorage.getItem('user_name');
    
      setNewStudent(prevNewStudent => ({
        ...prevNewStudent,
        username: username,
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

    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const csrftoken = getCookie('csrftoken');
    const url = 'http://127.0.0.1:8019/api/student-create/';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(newStudent),
    })
    .then((response) => {
      if (response.ok) {
        const successMessage = 'The student has been successfully added!';
        setSuccessMessage(successMessage);
        navigate('/students-list', { state: { successMessage } });
      } else if (response.status === 409) {
        setSuccessMessage(' You are already registered as a student');
      } else {
        throw new Error('An error occurred while adding the student');
      }
    })
    .catch(function (error) {
      console.log('ERROR:', error);
      setSuccessMessage('An error occurred while adding the student');
    });
  };

  return (
    <div id="student-container">
       {successMessage && (
                <p
                style={{
                  color: 'white',
                  background: '#ff6b6b',
                  padding: '10px',
                  textAlign: 'center',
                  borderRadius: '5px',
                  width: '500px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height:'40px',
                  marginLeft:'-45px'
                }}
              >
             <MdError style={{ color: 'white', fontSize: '25px' }} />{successMessage}
             <button
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '20px',
              }}
              onClick={handleSuccessClose}
            >
              &times;
            </button></p>
        )}
      {isUserLoggedIn ? (
        <div id="form-wrapper">
          <h1>Add Student</h1>
          <form onSubmit={handleSubmit} id="form">
            <div className="flex-wrapper">
              <div className="student-first_name">
                <input
                  onChange={handleChange}
                  value={newStudent.first_name}
                  className="form-control"
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                />
              </div>
              <div className="student-last_name">
                <input
                  onChange={handleChange}
                  value={newStudent.last_name}
                  className="form-control"
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                />
              </div>
              <div className="student-gender">
                <select
                  onChange={handleChange}
                  value={newStudent.gender}
                  className="form-control"
                  name="gender"
                >
                  <option value="" disabled>Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="student-email">
                <input
                  onChange={handleChange}
                  value={newStudent.email}
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="student-city">
                <input
                  onChange={handleChange}
                  value={newStudent.city}
                  className="form-control"
                  type="text"
                  name="city"
                  placeholder="City"
                />
              </div>
              <div className="student-street">
                <input
                  onChange={handleChange}
                  value={newStudent.street}
                  className="form-control"
                  type="text"
                  name="street"
                  placeholder="Street"
                />
              </div>
              <div className="student-address">
                <input
                  onChange={handleChange}
                  value={newStudent.address}
                  className="form-control"
                  type="text"
                  name="address"
                  placeholder="Address"
                />
              </div>
              <div className="student-date_of_birth">
                <div className='date_of_birdth'>
                  <input
                    onChange={handleChange}
                    value={newStudent.date_of_birth}
                    className="form-control"
                    type="date" 
                    name="date_of_birth"
                    placeholder="Date of Birth"
                  />
                </div>
              </div>
              <div className='username' style={{ display: 'none' }}>
                <input
                  onChange={handleChange}
                  value={newStudent.username}
                  className="form-control"
                  type="text" 
                  name="username"
                />
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <input id="submit" className="btn" type="submit" value="Add Student" />
            </div>
          </form>
        </div>
      ) : (
        <div >
        <div className='robot'>
        <img src={require('./robi4.png')} alt="Logo" />
        </div>
        <div div className='message'>
        <h1>You must be logged in to access this page</h1>
        <Link to="/login"  className="login-link" >Log in here</Link>
        </div>
        
      </div>
      )}
    </div>
  );
}

export default StudentAdd;
