import { useState,useEffect } from "react";
//import SubjectAttendancePage from "./SubjectAttendancePage";
import { useLocation, useNavigate } from "react-router-dom";



const SUBJECTS = [
  { id: 1, name: "Mathematics", icon: "∑", color: "#e8f4fd", accent: "#2980b9", desc: "Algebra, Calculus & Geometry" },
  { id: 2, name: "Physics", icon: "⚛", color: "#fef9e7", accent: "#d4a017", desc: "Mechanics, Waves & Thermodynamics" },
  { id: 3, name: "Chemistry", icon: "⚗", color: "#eafaf1", accent: "#27ae60", desc: "Organic, Inorganic & Physical" },
  { id: 4, name: "Biology", icon: "🧬", color: "#fdf2f8", accent: "#8e44ad", desc: "Cells, Genetics & Ecology" },
  { id: 5, name: "History", icon: "📜", color: "#fdf5e6", accent: "#ca6f1e", desc: "Ancient, Medieval & Modern" },
  { id: 6, name: "Computer Science", icon: "⌨", color: "#eaf2ff", accent: "#1a5276", desc: "Algorithms, Data Structures & AI" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #fffbf4; font-family: 'DM Sans', sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;

/**
 * StudentPage
 *
 * Props:
 *   onSubject(subject)  — called when a subject card is clicked, receives the subject object
 *   onTakePhoto()       — called when "Take Photos" button is clicked
 */
export default function StudentPage({ onSubject, onTakePhoto }) {
  const [hovered, setHovered] = useState(null);
  const [student_id, setStudent_id] =useState(null);
  const [student_name,setStudent_name]=useState(null);
  const navigate = useNavigate();
  const location=useLocation();
const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getLoginStatus = () => {
  return location.state?.logged || false;
};
useEffect(() => {
  if (location.state?.logged) {
    setIsLoggedIn(true);
  }
  setStudent_id(location.state?.id);
  setStudent_name(location.state?.name);
}, [location.state]);
  
  return (
    <>
      <style>{styles}</style>
      <div style={{ minHeight: "100vh", background: "#fffbf4", animation: "fadeIn 0.4s ease" }}>

        {/* Top bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "28px 48px",
          borderBottom: "1px solid #ece8e0",
        }}>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: "#1a1a1a", lineHeight: 1 }}>
              Student Portal
            </p>
            <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", marginTop: 4 }}>
              Choose a subject to begin
            </p>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
  {!isLoggedIn ? (
    <>
      <button
        onClick={() => navigate("/register", { state: { role: "Student" } })}
        style={{
      padding: "10px 20px",
      background: "#1a1a1a",
      color: "#fffbf4",
      border: "none",
      fontSize: 12,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      cursor: "pointer",
      borderRadius: 2,
      }}
      >
        Register
      </button>

      <button
        onClick={() => navigate("/login",{state:{role: "student"}})}
        style={{
      padding: "10px 20px",
      background: "#1a1a1a",
      color: "#fffbf4",
      border: "none",
      fontSize: 12,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      cursor: "pointer",
      borderRadius: 2,
    }}
      >
        Login
      </button>
    </>
  ) : (
    <>
      <span>Welcome, {student_name?.user_id}</span>

      <button onClick={onTakePhoto}>
        📷 Take Photos
      </button>

      <button onClick={() => {
        setIsLoggedIn(false);
        setStudent_id(null);
        setStudent_name(null);
      }}>
        Logout
      </button>
    </>
  )}
</div>
</div>

        {/* Subject grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24, padding: "48px",
        }}>
          {SUBJECTS.map((subj, i) => (
            <button
              key={subj.id}
              onClick={() => {
                //navigate("/student/attendance",{state: {subject:subj}});
              }}
              onMouseEnter={() => setHovered(subj.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === subj.id ? subj.accent : "#fff",
                border: `2px solid ${hovered === subj.id ? subj.accent : "#ece8e0"}`,
                borderRadius: 4,
                padding: "36px 32px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.25s ease",
                transform: hovered === subj.id ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hovered === subj.id ? `0 12px 32px ${subj.accent}33` : "0 2px 8px rgba(0,0,0,0.04)",
                animation: "fadeUp 0.5s ease both",
                animationDelay: `${i * 0.07}s`,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 16 }}>{subj.icon}</div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22, fontWeight: 700,
                color: hovered === subj.id ? "#fff" : "#1a1a1a",
                marginBottom: 6, lineHeight: 1.2,
                transition: "color 0.22s",
              }}>{subj.name}</p>
              <p style={{
                fontSize: 12, letterSpacing: "0.04em",
                color: hovered === subj.id ? "rgba(255,255,255,0.75)" : "#aaa",
                transition: "color 0.22s",
              }}>{subj.desc}</p>

              <div style={{
                marginTop: 24,
                display: "flex", alignItems: "center", gap: 6,
                fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
                color: hovered === subj.id ? "rgba(255,255,255,0.9)" : subj.accent,
                fontWeight: 500, transition: "color 0.22s",
              }}>
                Open subject <span style={{ fontSize: 14 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
