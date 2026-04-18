import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  "@import": "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap",
};

const SUBJECT_STYLES = {
  english: { icon: "📘", accent: "#2980b9" },
  mathematics: { icon: "∑", accent: "#8e44ad" },
  physics: { icon: "⚛", accent: "#d4a017" },
  chemistry: { icon: "⚗", accent: "#27ae60" },
  biology: { icon: "🧬", accent: "#16a085" },
  history: { icon: "📜", accent: "#ca6f1e" },
  "computer science": { icon: "⌨", accent: "#1a5276" },
}; 

export default function TeacherPage() {
  const [activeNav, setActiveNav] = useState("Dashboard");
const navigate = useNavigate();
  const navItems = ["Attendence"];
  const [subjects, setSubjects] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hovered, setHovered] = useState(null);
  const name=localStorage.getItem("user") || "Teacher";
  console.log(name);

  useEffect(() => {
  const fetchSubjects = async () => {
    const token=localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  else{
    navigate("/login",{state: {role: "teacher"}});
  }

    try {
      const teacherId = localStorage.getItem("userId");
      

      if (!token) {
        console.error("No token found");
        return;
      }
      const res = await fetch(
        "http://localhost:3000/teacher/subjects/",{
          method: "GET",
          headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
        }
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      console.log(data);
      setSubjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchSubjects();

}, []);

  return (
    <div style={css.wrapper}>
      {/* Sidebar */}
      <aside style={css.sidebar}>
        <div style={css.logo}>EduPortal</div>

        <nav style={css.nav}>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveNav(item);
                navigate("/teacher/attendence");
                }}
              style={{
                ...css.navItem,
                ...(activeNav === item ? css.navItemActive : {}),
              }}
            >
              <span style={{
                ...css.navDot,
                ...(activeNav === item ? css.navDotActive : {}),
              }} />
              {item}
            </button>
          ))}
        </nav>

        <button style={css.attBtn}>Take Attendance</button>
      </aside>

      {/* Main content */}
      <main style={css.main}>
        <div style={css.topBar}>
        <h1 style={css.pageTitle}>Teacher Dashboard</h1>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button
        style={css.addBtn}
        onClick={() => navigate("/teacher/add_subject")}
        >
        + Add Subject
      </button>
        <button onClick={()=>{localStorage.clear();
          navigate("/login",{state :{role : "teacher"}});}
        }>Logout</button>
      <span style={css.date}>Sunday, April 12, 2026</span>
      </div>  
      </div>

        {/* Profile card */}
        <div style={css.profileCard}>
          <div style={css.avatar}>MK</div>
          <div>
            <div style={css.teacherName}>{name}</div>
            <div style={css.teacherMeta}>
              Mathematics &nbsp;·&nbsp; Class 10-B &nbsp;·&nbsp; ID: TCH-204
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={css.statsGrid}>
          {[
            
          ].map((stat) => (
            <div key={stat.label} style={css.statCard}>
              <div style={css.statLabel}>{stat.label}</div>
              <div style={css.statValue}>{stat.value}</div>
            </div>
          ))}
        </div>

          <div style={css.cardGrid}>
  {subjects &&
    subjects.map((sub, i) => {
      console.log(sub);
      console.log("Hi");
      const subject=sub.Subject;
      const section=sub.Section;
      const style2 = SUBJECT_STYLES[subject.toLowerCase()];

      const isActive = selected === sub;

      return (
        <button
          key={i}
          onClick={() => {setSelected(sub);
            navigate("/teacher/attendance",{state : {subject: subject, section:section}})
          }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            background:
              hovered === i || isActive ? style2.accent : "#fff",
            border: `2px solid ${
              hovered === i || isActive ? style2.accent : "#ece8e0"
            }`,
            borderRadius: "10px",
            padding: "24px",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.25s ease",
            transform:
              hovered === i ? "translateY(-4px)" : "translateY(0)",
            boxShadow:
              hovered === i
                ? `0 12px 32px ${style2.accent}33`
                : "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          {/* ICON */}
          <div style={{ fontSize: 28, marginBottom: 12 }}>
            {style2.icon}
          </div>

          {/* SUBJECT NAME */}
          <p
            style={{
              fontSize: 18,
              fontWeight: "600",
              color:
                hovered === i || isActive ? "#fff" : "#1a1a1a",
              marginBottom: 6,
            }}
          >
            {sub.Subject}
          </p>

          {/* SECTION */}
          <p
            style={{
              fontSize: 13,
              color:
                hovered === i || isActive
                  ? "rgba(255,255,255,0.8)"
                  : "#888",
            }}
          >
            Section: {sub.Section}
          </p>

          {/* CTA */}
          <div
            style={{
              marginTop: 16,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color:
                hovered === i || isActive
                  ? "#fff"
                  : style2.accent,
            }}
          >
            Select →
          </div>
        </button>
      );
    })}
</div>

      </main>
      
    </div>
  );
}

const css = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'DM Sans', sans-serif",
    background: "#f5f4f0",
    color: "#1a1a1a",
  },
  sidebar: {
    width: "220px",
    background: "#ffffff",
    borderRight: "1px solid #e8e6e0",
    padding: "1.5rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flexShrink: 0,
  },
  logo: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "1.25rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #e8e6e0",
    letterSpacing: "-0.3px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 10px",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#888",
    cursor: "pointer",
    background: "transparent",
    border: "none",
    textAlign: "left",
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "400",
    transition: "background 0.15s, color 0.15s",
  },
  navItemActive: {
    background: "#f5f4f0",
    color: "#1a1a1a",
    fontWeight: "500",
    border: "1px solid #e8e6e0",
  },
  navDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#ccc",
    flexShrink: 0,
    transition: "background 0.15s",
  },
  navDotActive: {
    background: "#185FA5",
  },
  addBtn: {
  padding: "8px 14px",
  background: "#1a1a1a",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
},
  main: {
    flex: 1,
    padding: "1.75rem 2rem",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  pageTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1a1a1a",
    letterSpacing: "-0.4px",
    margin: 0,
  },
  date: {
    fontSize: "13px",
    color: "#888",
    fontFamily: "'DM Mono', monospace",
  },
  profileCard: {
    background: "#ffffff",
    border: "1px solid #e8e6e0",
    borderRadius: "12px",
    padding: "1.25rem",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "1.25rem",
  },
  avatar: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "#E6F1FB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "600",
    color: "#185FA5",
    flexShrink: 0,
  },
  teacherName: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: "3px",
  },
  teacherMeta: {
    fontSize: "13px",
    color: "#888",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
  },
  statCard: {
    background: "#ffffff",
    border: "1px solid #e8e6e0",
    borderRadius: "10px",
    padding: "1rem 1.1rem",
  },
  statLabel: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "6px",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1a1a1a",
    letterSpacing: "-0.5px",
  },
  cardGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "12px",
},

subjectCard: {
  background: "#fff",
  padding: "12px",
  borderRadius: "10px",
  cursor: "pointer",
},
};
