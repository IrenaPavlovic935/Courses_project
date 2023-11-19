import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Courses from './pages/Courses';
import Header from './components/Header';
import Footer from './components/Footer';
import CourseList from './components/CourseList'; 
import EditCourse from './components/EditCourse';
import Register from './components/Register'; 
import Login from './components/Login'
import Logout from './components/Logout'
import TeacherList from './components/TeacherList';
import TeacherAdd from './components/TeacherAdd';
import EditTeacher from './components/EditTeacher';
import StudentList from './components/StudentList';
import EditStudent from './components/EditStudents';
import StudentAdd from './components/StudentAdd';
import CourseDetail from './components/CourseDetail';
import Contact from './pages/Contact';
import About from './components/About';
import Overview from './components/Overview';
import Benefits from './components/Benefits';
import WhatWeDo from './components/whatwedo';
export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/edit-course/:id" element={<EditCourse />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/logout" element={<Logout />} />
        <Route path="/teacher-list" element={<TeacherList />} />
        <Route path="/teacher-add" element={<TeacherAdd />} />
        <Route path="/edit-teacher/:id" element={<EditTeacher />} />
        <Route path="/students-list" element={<StudentList />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />
        <Route path="/student-add" element={<StudentAdd />} />
        <Route path="/course-detail/:courseId" element={<CourseDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/overview" element={<Overview/>} />
        <Route path="/benefits" element={<Benefits/>} />
        <Route path="/whatwedo" element={<WhatWeDo/>} />

        

        
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

