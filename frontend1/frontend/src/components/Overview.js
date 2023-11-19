import React, { useState, useEffect } from 'react';

function Overview() {
  const [successStories, setSuccessStories] = useState(0);
  const [instructors, setInstructors] = useState(0);
  const [courses, setCourses] = useState(0);
  const [members, setMembers] = useState(0);

  useEffect(() => {
    const targetSuccessStories = 34; 
    const targetInstructors = 100; 
    const targetCourses = 54;
    const targetMembers = 80; 

    const step = 3;
    const successStoriesInterval = setInterval(() => {
      if (successStories < targetSuccessStories) {
        setSuccessStories(successStories + step);
      }
    }, 40);

    const instructorsInterval = setInterval(() => {
      if (instructors < targetInstructors) {
        setInstructors(instructors + step);
      }
    }, 40);

    const coursesInterval = setInterval(() => {
      if (courses < targetCourses) {
        setCourses(courses + step);
      }
    }, 40);

    const membersInterval = setInterval(() => {
      if (members < targetMembers) {
        setMembers(members + step);
      }
    }, 40);



    return () => {
      clearInterval(successStoriesInterval);
      clearInterval(instructorsInterval);
      clearInterval(coursesInterval);
      clearInterval(membersInterval);
    };
  }, [successStories, instructors, courses, members]);

  return (
    <section className="overview">
      <div className="overview-item">
        <h3>{successStories}K +</h3>
        <p>Success Stories</p>
      </div>
      <div className="overview-item">
        <h3>{instructors} +</h3>
        <p>Expert Instructors</p>
      </div>
      <div className="overview-item">
        <h3>{courses}K +</h3>
        <p>Online Courses</p>
      </div>
      <div className="overview-item">
        <h3>{members}K +</h3>
        <p>Worldwide Members</p>
      </div>
    </section>
  );
}

export default Overview;


