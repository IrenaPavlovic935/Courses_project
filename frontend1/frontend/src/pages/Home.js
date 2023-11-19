import React, { useEffect } from 'react';
import Header from '../components/Header';
import Courses from './Courses'; 
import TeacherList from '../components/TeacherList'; 
import About from '../components/About';
import Overview from '../components/Overview';
import Benefits from '../components/Benefits';
import WhatWeDo from '../components/whatwedo';
import { Link } from 'react-router-dom';
import hero from '../components/hero.jpg';
import './Home.css';

export default function Home() {
  useEffect(() => {
    localStorage.removeItem('userLoggedIn');
  }, []);


  return (
    <div>
      <div className="hero-section">
        <img src={hero} alt="Hero Slika" />
        <h1>Elevate Your Skills through Online Education</h1>
        <h2>Explore a World of Knowledge at Your Fingertips</h2>
        <Link to="/course-list" className='show'>
          Show Courses
        </Link>
      </div>
      <div className='overview'>
        <Overview />
      </div>
      <div className="About">
        <About />
      </div>
      <dic className="benefits">
        <Benefits />
      </dic>
      <dic className="WhatWeDo">
        <WhatWeDo />
      </dic>
      

      
      
    </div>
  );
}
