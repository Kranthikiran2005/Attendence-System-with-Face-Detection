import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  "@import": "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap",
};

export default function TeacherPage() {
  const [activeNav, setActiveNav] = useState("Dashboard");
const navigate = useNavigate();
  const navItems = ["Attendence"];

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
          <span style={css.date}>Sunday, April 12, 2026</span>
        </div>

        {/* Profile card */}
        <div style={css.profileCard}>
          <div style={css.avatar}>MK</div>
          <div>
            <div style={css.teacherName}>Mr. Mohan Kumar</div>
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
  attBtn: {
    marginTop: "auto",
    width: "100%",
    padding: "10px 0",
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "'DM Sans', sans-serif",
    borderRadius: "8px",
    border: "none",
    background: "#185FA5",
    color: "#E6F1FB",
    cursor: "pointer",
    transition: "opacity 0.15s",
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
};
