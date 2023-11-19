import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { IoIosHand } from 'react-icons/io';

function Benefits() {
  return (
    <div className="benefits">
        <div className='left'>
            <h2>YOUR BENEFITS</h2>
            <h3>Benefits of Learning<br/>
             with Edu</h3>
            <p>
                Egestas faucibus nisl et ultricies. Tempus lectus condimentum<br/>
                tristique mauris id vitae. Id pulvinar a eget vitae pellentesque<br/>
                ridiculus platea. Vulputate cursus.
            </p>

            <ul>
                <li><FaCheck style={{ backgroundColor: '#01a2a6',color: 'white', display: 'inline-block', padding: '4px', borderRadius: '50%' }}/> Flexible Learning</li>
                <li><FaCheck style={{ backgroundColor: '#01a2a6',color: 'white', display: 'inline-block', padding: '4px', borderRadius: '50%' }}/> Quality Instruction</li>
                <li><FaCheck style={{ backgroundColor: '#01a2a6',color: 'white', display: 'inline-block', padding: '4px', borderRadius: '50%' }}/> Cost-Effective</li>
            </ul>
        </div>
        <div className='right'>
            <img src='https://assets-global.website-files.com/57822c659e1627a433e6a7c6/616cfa3f18c83931fb770588_5e43c858150470e1132b5ecd_Online%2520School.png'/>
        <h3>Explore Inspiring Online Courses</h3>
        <div className='benefits_list'>
            <div className='right_sidee'>
                <img src={require('./click2.png')} alt="Logo" />

            </div>
            <ul>
                <li>Digital Marketing</li>
                <li>Email Marketing</li>
                <li>Digital Illustration</li>
                <li>Film & Video</li>
                <li>Social Media</li>
            </ul>
        </div>
        </div>
      
    </div>
  );
}

export default Benefits;
