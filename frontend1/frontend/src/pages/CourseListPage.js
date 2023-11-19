import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './Home.css';


class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseList: [],
    };
  }

  componentDidMount() {
    this.fetchCourse();
  }

  fetchCourse() {
    console.log('Fetching...');

    fetch('http://127.0.0.1:8019/api/course-list/')
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          courseList: data,
        })
      );
  }

  handleEdit(course) {
    // Implementirajte funkcionalnost za ažuriranje kursa
  }

  handleDelete(course) {
    // Implementirajte funkcionalnost za brisanje kursa
  }

  render() {
    const course = this.state.courseList;
    return (
      <div id="list-wrapper">
        {course.map(function (cours, index) {
          return (
            <div key={index} className="task-wrapper flex-wrapper">
              <div className="flex-item">
                <span>{cours.title}</span>
                <span>{cours.start_date}</span>
                <span>{cours.end_date}</span>
                <span>{cours.teacher}</span>
                <span>{cours.description}</span>
              </div>
              <div className="flex-item">
                <button
                  onClick={() => this.handleEdit(cours)}
                  className="btn btn-sm btn-outline-info"
                >
                  Edit
                </button>
              </div>
              <div className="flex-item">
                <button
                  onClick={() => this.handleDelete(cours)}
                  className="btn btn-sm btn-outline-dark"
                >
                  Delete
                </button>
              </div>
            </div>
          );
})}

      </div>
    );
  }
}
export default withRouter(CourseList);

