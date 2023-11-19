import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axiosInstance from './axios';
import { FaExclamationCircle } from 'react-icons/fa';


function SignUp() {
  const navigate = useNavigate();
  const initialFormData = {
    email: '',
    username: '',
    password: '',
    firstName: '',
  };

  const [formData, updateFormData] = useState(initialFormData);
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); 
  
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
    } else {
      axiosInstance
        .post('/users/register/', {
          email: formData.email,
          user_name: formData.username,
          password: formData.password,
          firstName: formData.firstName,
        })
        .then((res) => {
          localStorage.setItem('user_id', res.data.id);
          console.log('ID korisnika:', res.data.id);
          navigate('/login');
        })
        .catch((error) => {
          if (error.response.status === 400) {
            if (error.response.data && error.response.data.error_type === "validation_error") {
              setError(`Invalid input. Please check your email, username, and password. Details: ${error.response.data.error_message}`);
            } else {
              setError('An error occurred. Please try again.');
            }
          } else if (error.response.status === 500) {
            setError('An existing email or username, your email and username must be unique');
          } else {
            setError('An error occurred. Please try again.');
          }          
        });
    }
  };
  

  return (
    <>
    {error && 
    (<div className="error-message">
    <FaExclamationCircle />
    {error}
    <span className="close-btn" onClick={() => setError(null)}>&times;</span>
    </div>)}

    <div className='register'>
   
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
          />
        </div>
        <button className="signup" type="submit">Sign Up</button>
      </form>
    </div>
    </>
  );
}

export default SignUp;
