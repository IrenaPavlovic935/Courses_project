import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(''); 

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_name'); 
    setIsLoggedIn(false);

  };

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const storedUserName = localStorage.getItem('user_name'); 
    if (accessToken) {
      setIsLoggedIn(true);
      setUserName(storedUserName); 
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav className="navbar" key={isLoggedIn.toString()}>
      <div className="logo">
        <img src={require('./edu.jpg')} alt="Logo" />
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li className="has-submenu">
            <a href="/courses">Courses</a>
            <div id="courses-menu" className="sub-menu">
              <li><a href="/course-list">Course List</a></li>
              <li><a href="/courses">Course Add</a></li>
            </div>
          </li>
          <li className="has-submenu">
            <a href="#">Teachers</a>
            <div id="teachers-menu" className="sub-menu">
              <li><a href="/teacher-list">Teacher List</a></li>
              <li><a href="/teacher-add">Teacher Add</a></li>
            </div>
          </li>
          <li className="has-submenu"> 
            <a href="#">Students</a>
            <div id="students-menu" className="sub-menu">
              <li><a href="/students-list">Student List</a></li>
              <li><a href="/student-add">Student Add</a></li>
            </div>
          </li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      {isLoggedIn ? (
        <div className="user-info">
          {/* <span>Dobrodošli, {userName}</span>  */}
          <button className="logout_button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="user-auth">
          <li><Link to="/register" className="register_button">Register</Link></li>
          <li><Link to="/login" className="login_button">Login</Link></li>
        </div>
      )}
    </nav>
  );
}

export default Header;
