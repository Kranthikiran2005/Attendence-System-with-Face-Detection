
import './App.css';
import { Routes, Route } from "react-router-dom";

import Roleselector from './pages/Homepage'
import StudentPage from './pages/StudentPage';
import Login from './pages/Login'
function App() {
  return (

    <Routes>

      <Route path="/" element={<Roleselector/>}/>
      <Route path="/student" element={<StudentPage/>}/>
    </Routes>
  );
}

export default App;
