import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {  FaMapMarker } from 'react-icons/fa';
import { FaTwitter, FaFacebook } from 'react-icons/fa';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Home.css';




function Contact() {
  return (
    <div className='contact'>
      <div className='map'>
        <h1><FaMapMarker /> Contacts</h1>
        <iframe
          title="New York"
          width="342"
          height="306"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
          scrolling="no"
        ></iframe>
      </div>
      <div className='contact_form_and_info'>
     
      <div className="contact-container">
      <div className="contact-form">    
        <form className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" name="name" placeholder="Your Name" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your Email" />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" placeholder="Your Phone" />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="Subject" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" placeholder="Message"></textarea>
          </div>

          
        </form>
        <button  className="send_message" type="submit">Send Message</button>
      </div>
    </div>
   

        <div className="contact-info">
            <h2>Before Contacting Us</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur<br/> adipisici elit, sed eiusmod tempor incidunt ut<br/> labore et dolore magna aliqua. Non equidem<br/> invideo, miror magis posuere velit aliquet.
            </p>
            <h2>Contact Information</h2>
            <p><FaMapMarkerAlt style={{ color: '#01a2a6'}} /> Brooklyn, NY 10036, United States</p>
            <p> <FaPhone style={{ color: '#01a2a6'}} /> 1-800-123-1234</p>
            <p> <FaEnvelope style={{ color: '#01a2a6'}} /> example@language-school.com
            </p>
            <h2>Social Media</h2>
            <div className='Social_Media'>
                <a href="https://twitter.com/your-twitter-account">
                <FaTwitter />  TWEETER 
                </a>
                <a href="https://www.facebook.com/your-facebook-page">
                <FaFacebook /> FACEBOOK 
                </a>
                </div>
            </div>
            </div>
      </div>
  );
}

export default Contact;
