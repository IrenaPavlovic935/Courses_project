import React from 'react';

class About extends React.Component {
  render() {
    return (
      <div className='About_Sction'>
        <div className='upper_part'>
            <div className='left_side'>
                <h1>WHO WE ARE</h1>
                <h2>Your Online Learning<br/>Partner</h2>
                <p>Egestas faucibus nisl et ultricies. Tempus lectus condimentum<br/> tristique mauris id vitae. Id pulvinar a eget vitae pellentesque <br/>ridiculus platea. Vulputate cursus.</p>
            </div>
            <div className='right_side'>
                <img src={require('./about2.png')} alt="Logo" />

            </div>
        </div>  
        <div className='down_part' >
            <div className='online_ciurses'>
                <img src={require('./online_courses.jpg')} alt="Logo" />
                <h1>Online Courses</h1>
                <p>Egestas faucibus nisl et ultricies. <br/>Tempus lectus condimentum tristique<br/> mauris id vitae. Id pulvinar eget vitae.</p>
            </div>
            
            <div className='online_ciurses'>
                <img src={require('./skills.jpg')} alt="Logo" />
                <h1>Upgrade Skills</h1>
                <p>Egestas faucibus nisl et ultricies. <br/>Tempus lectus condimentum tristique<br/> mauris id vitae. Id pulvinar eget vitae.</p>
            </div>
            <div className='online_ciurses'>
                <img src={require('./certifications.jpg')} alt="Logo" />
                <h1>Certifications</h1>
                <p>Egestas faucibus nisl et ultricies. <br/>Tempus lectus condimentum tristique<br/> mauris id vitae. Id pulvinar eget vitae.</p>
            </div>
        </div>
      </div>
    );
  }
}

export default About;
