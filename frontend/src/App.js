
import './App.css';
import { Routes, Route } from "react-router-dom";

import Roleselector from './pages/Homepage'
import StudentPage from './pages/StudentPage';

import Login from './pages/Login'
import Register from './pages/register';
import TeacherPage from './pages/Teacher';
import Attendence from './pages/attendence';
function App() {
  return (

    <Routes>

      <Route path="/" element={<Roleselector/>}/>
      <Route path="/login"  element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/student" element={<StudentPage/>}/>
      <Route path="/teacher" element={<TeacherPage/>}/>
      <Route path="/teacher/attendence" element={<Attendence/>}/>
     
    </Routes>
    
  );
}


export default App;
