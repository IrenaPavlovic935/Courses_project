import React from 'react';
import { FaCoffee } from 'react-icons/fa';
import { FaEnvelope, FaPhone, FaMapMarker } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="logo_for_footer">
          <img src={require('./edu2.png')} alt="Logo" />
          <div className='text_in_footer'>
            <p>Lorem ipsum dolor sit amet<br/>
            nsectetur cing elit. Suspe ndisse<br/>
            suscipit sagittis leo sit met entum<br/>
            estibulum dignissim posuere <br/>
            cubilia deleniti atque corrupti quos dolores vero eos et<br/>
            accusamu.</p>
          </div>
        </div>
        <div className="footer-links">
            <h1>About School</h1>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Staff</a></li>
            <li><a href="#">Our Partners</a></li>
          </ul>
        </div>
        <div className="footer-links">
            <h1>Courses</h1>
          <ul>
            <li><a href="#">Long-term Programmes</a></li>
            <li><a href="#">Intensive Programmes</a></li>
            <li><a href="#">Specialized Programme</a></li>
          </ul>
        </div>
        <div className="footer-links">
            <h1>Contact Info</h1>
          <ul>
            <li><a href="#"><FaEnvelope /> example@education-school.com</a></li>
            <li><a href="#"><FaPhone /> Call Us: 1-800-123-1234</a></li>
            <li><a href="#"><FaMapMarker /> Brooklyn, NY 10036, United
             States</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
      <div className="footer-social">
        <a href="#"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
      </div>
    </footer>
  );
};

export default Footer;
