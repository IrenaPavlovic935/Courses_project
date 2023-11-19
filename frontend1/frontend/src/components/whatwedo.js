import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';

function WhatWeDo() {
  return (
    <div className="what-we-do">
      <h1>WHAT WE DO</h1>
      <h2>Inspiring discovery through creativity.</h2>
      <p>
        Edu is an education and online course platform with thousands of classes for creative and curious people, on topics including<br/> illustration, design, photography, video, freelancing, and more. On Educo, members come together to find inspiration and<br/>take the next step in their creative journey.
      </p>
      <h3>At Educo, We Empower:</h3>

      <div className='two-part'>
      <div className='one'>
      <ul>
      <h4>Members To</h4>
        <li>  <FaCheck style={{ backgroundColor: '#01a2a6',color: 'white', display: 'inline-block', padding: '4px', borderRadius: '50%' }}/> Get Inspired</li>
        <li> <FaCheck style={{ backgroundColor: '#01a2a6',color: 'white', display: 'inline-block', padding: '4px', borderRadius: '50%' }}/> Learn New Skills</li>
        <li>  <FaCheck style={{ backgroundColor: '#01a2a6',color: 'white', display: 'inline-block', padding: '4px', borderRadius: '50%' }}/> Make Discoveries</li>
      </ul>
      </div>
      <div className='one'>
     
      <ul>
      <h4>Instructors To</h4>
        <li>  <FaCheck style={{ backgroundColor: '#01a2a6',color: 'white', display: 'inline-block', padding: '4px', borderRadius: '50%' }}/> Share Expertise</li>
        <li>  <FaCheck style={{ backgroundColor: '#01a2a6',color: 'white', display: 'inline-block', padding: '4px', borderRadius: '50%' }}/> Earn Money</li>
        <li>  <FaCheck style={{ backgroundColor: '#01a2a6',color: 'white', display: 'inline-block', padding: '4px', borderRadius: '50%' }}/> Give Back</li>
      </ul>
      </div>
      <div className='one'>
     
      <ul>
      <h4>Employees To</h4>
        <li>  <FaCheck style={{ backgroundColor: '#01a2a6',color: 'white', display: 'inline-block', padding: '4px', borderRadius: '50%' }}/> Be Curious.</li>
        <li>  <FaCheck style={{ backgroundColor: '#01a2a6',color: 'white', display: 'inline-block', padding: '4px', borderRadius: '50%' }}/> Make an Impact</li>
        <li>  <FaCheck style={{ backgroundColor: '#01a2a6',color: 'white', display: 'inline-block', padding: '4px', borderRadius: '50%' }}/> Live a Full Life</li>
      </ul>
      </div>
      </div>
    </div>
  );
}

export default WhatWeDo;
