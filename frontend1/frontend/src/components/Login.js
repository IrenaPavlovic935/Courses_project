import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axios';
import { FaExclamationCircle } from 'react-icons/fa';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '120px',
    marginBottom: '120px',
    marginLeft: '28%',
    backgroundColor: 'white',
    width: '700px',
    height: '350px',
    padding: '50px',
    borderRadius: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  },
  input: {
    width: '100%',
    marginBottom: '16px',
  },
  button: {
    width: '100%',
    marginBottom: '16px',
  },
  link: {
    textAlign: 'center',
  },
  animationComplete: {
    background: "linear-gradient(90deg, rgba(54,217,182,1) 0%, rgba(32,152,126,1) 43%, rgba(0,212,255,1) 100%)",
  },
};

export default function SignIn() {
  const navigate = useNavigate();
  const initialFormData = ({
    user_name: '',
    password: '',
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [error, setError] = useState(null); 

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axiosInstance
      .post(`token/`, { user_name: formData.user_name, password: formData.password })
      .then((res) => {
        console.log('Server response:', res.data);
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        localStorage.setItem('user_id', res.data.user_id);
        localStorage.setItem('user_name', formData.user_name);
  
        axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
  
        const userLoggedIn = localStorage.getItem('userLoggedIn');
  
        if (!userLoggedIn) {
          localStorage.setItem('userLoggedIn', 'true');
          location.reload(); 
          window.location = '/'; 
        } else {
          window.location = '/'; 
        }
      })
      .catch((error) => {
        setError("Oops, an error occurred, please try again.");
      });

    }
  useEffect(() => {
    const image4 = document.getElementById("image4");

    const handleAnimationEnd = () => {
      setAnimationComplete(true);
    };

    image4.addEventListener("animationend", handleAnimationEnd);

    return () => {
      image4.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  return (
    <> 
    {error && (
      <div className="error-message">
        <FaExclamationCircle />
        {error}
        <span className="close-btn" onClick={() => setError(null)}>&times;</span>
      </div>
    )}

    <div className={`login ${animationComplete ? "animation-complete" : ""}`} style={animationComplete ? styles.animationComplete : null}>
       {/* prvi dao dadaje html klasu a drugi css  */}
      <div style={styles.container}>
        <h1>Sign in</h1>
        <form noValidate>
          <input
            style={styles.input}
            type="text"
            id="user_name"
            name="user_name"
            placeholder="User Name"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={handleChange}
            required
          />
          <button
            style={styles.button}
            type="submit"
            className='signin'
            onClick={handleSubmit}
          >
            Sign In
          </button>
          <p style={styles.link}>
            <a className="link_Forgot_password" href="/register">Don't have an account? Sign Up</a>
          </p>
        </form>
      </div>
      <div className='animation'>
        <img src={require('./image1.png')} alt="Image 1" className="image" id="image1" />
        <img src={require('./image2.png')} alt="Image 2" className="image" id="image2" />
        <img src={require('./image3.png')} alt="Image 3" className="image" id="image3" />
        <img src={require('./image4.png')} alt="Image 4" className="image" id="image4" />
        <img src={require('./image5.png')} alt="Image 5" className="image" id="image5" />
      </div>
    </div>
    </>
  );
}
