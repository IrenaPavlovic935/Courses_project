// EditStudent.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function EditStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    city: '',
    street: '',
    address: '',
  });

  useEffect(() => {
    if (id) {
      fetchStudentData(id);
    }
  }, [id]);

  const fetchStudentData = (studentId) => {
    fetch(`http://127.0.0.1:8019/api/student-detail/${studentId}/`)
      .then((response) => response.json())
      .then((data) => {setStudent(data);})
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  };

  const handleSave = () => {
    const csrftoken = getCookie('csrftoken');
    const url = id
      ? `http://127.0.0.1:8019/api/student-update/${id}/`
      : 'http://127.0.0.1:8019/api/student-create/';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(student),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Student saved successfully');
          window.location.href = '/students-list';
        } else {
          console.error('Failed to save student');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  return (
    <div className='Edit_Students'>
      <h2>Edit Student</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={student.first_name}
            onChange={(e) => setStudent({ ...student, first_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={student.last_name}
            onChange={(e) => setStudent({ ...student, last_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            className="form-control"
            id="gender"
            name="gender"
            value={student.gender}
            onChange={(e) => setStudent({ ...student, gender: e.target.value })}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={student.email}
            onChange={(e) => setStudent({ ...student, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={student.city}
            onChange={(e) => setStudent({ ...student, city: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="street"
            value={student.street}
            onChange={(e) => setStudent({ ...student, street: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={student.address}
            onChange={(e) => setStudent({ ...student, address: e.target.value })}
          />
        </div>
        <button type="button" className="edit_for_teacher" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
}

export default EditStudent;
