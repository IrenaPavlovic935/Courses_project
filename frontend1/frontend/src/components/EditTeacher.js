import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EditTeacher() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState({
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
      fetchTeacherData(id);
    }
  }, [id]);

  const fetchTeacherData = (teacherId) => {
    fetch(`http://127.0.0.1:8019/api/teacher-detail/${teacherId}/`)
      .then((response) => response.json())
      .then((data) => { setTeacher(data);})
      .catch((error) => {
        console.error('Error fetching teacher data:', error);
      });
  };

  const handleSave = () => {
    const csrftoken = getCookie('csrftoken');
    const url = id
      ? `http://127.0.0.1:8019/api/teacher-update/${id}/`
      : 'http://127.0.0.1:8019/api/teacher-create/';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(teacher),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Teacher saved successfully');
          window.location.href = "/teacher-list"; 
        } else {
          console.error('Failed to save teacher');
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
      <h2>Edit Teacher</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={teacher.first_name}
            onChange={(e) => setTeacher({ ...teacher, first_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={teacher.last_name}
            onChange={(e) => setTeacher({ ...teacher, last_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            className="form-control"
            id="gender"
            name="gender"
            value={teacher.gender}
            onChange={(e) => setTeacher({ ...teacher, gender: e.target.value })}
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
            value={teacher.email}
            onChange={(e) => setTeacher({ ...teacher, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={teacher.city}
            onChange={(e) => setTeacher({ ...teacher, city: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="street"
            value={teacher.street}
            onChange={(e) => setTeacher({ ...teacher, street: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={teacher.address}
            onChange={(e) => setTeacher({ ...teacher, address: e.target.value })}
          />
        </div>
        <button type="button" className="edit_for_teacher" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
}

export default EditTeacher;


