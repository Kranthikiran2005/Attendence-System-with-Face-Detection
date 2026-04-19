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

const css = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  popup: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    minWidth: "320px",
    textAlign: "center",
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
    animation: "fadeUp 0.3s ease",
  },

  closeBtn: {
    marginTop: "20px",
    padding: "8px 16px",
    background: "#1a5276",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};


export default function StudentPage({ onSubject, onTakePhoto }) {
  const [hovered, setHovered] = useState(null);
  const [student_id, setStudent_id] =useState(null);
  const [student_name,setStudent_name]=useState(null);
  const [sub,setSub]=useState(null);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  const location=useLocation();
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [showPopup, setShowPopup] = useState(false);
const [attendanceData, setAttendanceData] = useState(null);
const [loadingPopup, setLoadingPopup] = useState(false);

  const getLoginStatus = () => {
  return location.state?.logged || false;
};

const role=location.state?.role;
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login", { state: { role: role } });
    return;
  }

  setIsLoggedIn(true);
  setStudent_name(localStorage.getItem("user"));
  setStudent_id(localStorage.getItem("id"));

  // 🔥 FETCH SUBJECTS
  const fetchSubjects = async () => {
    try {
      const res = await fetch("http://localhost:3000/student/subjects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setSubjects(data); // expected: [{ Subject, Section, ... }]
    } catch (err) {
      console.error(err);
    }
  };

  fetchSubjects();
}, []);

  const fetchAttendance = async (subject, section) => {
        try {
          console.log("fetch");
          setLoadingPopup(true);
          setShowPopup(true);

          const token = localStorage.getItem("token");

          const res = await fetch("http://localhost:3000/student/attendance", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              subject,
              section,
            }),
          });
          
          const data = await res.json();
          console.log(data);
          setAttendanceData(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingPopup(false);
        }
      };
  
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
      <span>Welcome, {student_name}</span>

      <button onClick={()=>{navigate("/camera_page")}}>
        📷 Take Photos
      </button>

      <button onClick={() => {
        setIsLoggedIn(false);
        setStudent_id(null);
        setStudent_name(null);
        localStorage.clear();

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
          {subjects.map((subj, i) => (
            <button
              key={i}
              onClick={() => {
                fetchAttendance(subj.Subject, subj.Section);
                console.log("fetching");
                setSub(subj.Subject);
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? "#1a5276" : "#fff",
               border: `2px solid ${hovered === i ? "#1a5276" : "#ece8e0"}`,
                borderRadius: 4,
                padding: "36px 32px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.25s ease",
                transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
                boxShadow:
                  hovered === i
                    ? "0 12px 32px rgba(26,82,118,0.2)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
                animation: "fadeUp 0.5s ease both",
                animationDelay: `${i * 0.07}s`,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 16 }}>
                📘
              </div>

              <p
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: hovered === i ? "#fff" : "#1a1a1a",
                  marginBottom: 6,
                  transition: "color 0.22s",
                }}
              >
                {subj.Subject}
              </p>

              <p
                style={{
                  fontSize: 12,
                  color: hovered === i ? "rgba(255,255,255,0.75)" : "#aaa",
                  transition: "color 0.22s",
                }}
              >
                Section: {subj.Section}
              </p>

              <div
                style={{
                  marginTop: 24,
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: hovered === i ? "#fff" : "#1a5276",
                  fontWeight: 500,
                }}
              >
                Open subject →
              </div>
            </button>
          ))}
        </div>
      </div>

      {showPopup && (
      <div style={css.overlay}>
        <div style={css.popup}>
          <h2>📊 Attendance Details</h2>

          {loadingPopup ? (
            <p>Loading...</p>
          ) : attendanceData ? (
            <>
              <p><b>Subject</b> {sub}</p>
              <p><b>Classes Attended:</b> {attendanceData[0].no_of_present}</p>
              <p><b>Total Classes:</b> {attendanceData[0].no_of_classes}</p>

              <p>
                <b>Percentage:</b>{" "}
                {Math.round((attendanceData.attended / attendanceData.total) * 100)}%
              </p>
            </>
          ) : (
            <p>No data available</p>
          )}

          <button style={css.closeBtn} onClick={() => setShowPopup(false)}>
            Close
          </button>
        </div>
      </div>
    )}
    </>
  );
}
