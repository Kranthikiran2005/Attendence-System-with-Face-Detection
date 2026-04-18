import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AttendancePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const subject = location.state?.subject;
  const section = location.state?.section;

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [started, setStarted] = useState(false);

  // 🔹 Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:3000/students/${subject}/${section}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (section) fetchStudents();
  }, [section]);

  // 🔹 Handle checkbox
  const markAttendance = (id) => {
    console.log("Clicked:", id); 
    setAttendance((prev) => {
        if (prev[id]) return prev;

        return {
            ...prev,
            [id]: true,
        };
      
    });
  };
  const handleEndClass = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/attendance/mark", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        subject,
        section,
        attendance,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Attendance saved");
    } else {
      alert(data.error || "❌ Failed");
    }
  } catch (err) {
    console.error(err);
  }
};

const handleDeleteCourse = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this course?");
  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:3000/students/course/delete/${subject}/${section}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("✅ Course deleted");
      navigate("/teacher");
    } else {
      alert(data.error || "❌ Failed to delete");
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div style={css.wrapper}>
      {/* Sidebar */}
      <aside style={css.sidebar}>
        <h2 style={css.logo}>Attendance</h2>

        <button
          style={{
            ...css.btn,
            background: started ? "#aaa" : "#185FA5",
          }}
          onClick={() => setStarted(true)}
          disabled={started}
        >
          ▶ Start Class
        </button>

        <button
          style={{
            ...css.btn,
            background: "#e74c3c",
          }}
          onClick={() => {
            setStarted(false);
            console.log("Final Attendance:", attendance);

          }}
        >
          ■ End Class
        </button>
      </aside>

      {/* Main */}
      <main style={css.main}>
        <div style={css.header}>
        <h1>{subject} - Section {section}</h1>

        <button style={css.deleteBtn} onClick={handleDeleteCourse}>
          🗑 Delete Course
        </button>
      </div>
          
        <table style={css.table}>
          <thead>
            <tr>
              <th style={css.th}>ID</th>
              <th style={css.th}>Name</th>
              <th style={css.th}>Classes Attended</th>
              <th style={css.th}>Present</th>
            </tr>
          </thead>

          <tbody>
            {students.map((stu) => (
              <tr key={stu.S_ID}>
                <td style={css.td}>{stu.S_ID}</td>
                <td style={css.td}>{stu.S_Name}</td>
                <td style={css.td}>{stu.no_of_present + (attendance[stu.S_ID]?1:0)}</td>

                <td>
                  <input
                    type="checkbox"
                    disabled={!started || attendance[stu.S_ID]}
                    checked={attendance[stu.S_ID] || false}
                    onChange={() => markAttendance(stu.S_ID)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  },

  sidebar: {
    width: "220px",
    background: "#fff",
    padding: "20px",
    borderRight: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  logo: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  header: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
},

deleteBtn: {
  padding: "8px 14px",
  background: "#e74c3c",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
},
  btn: {
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "30px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    background: "#fff",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    borderBottom: "2px solid #ddd",
  },

  td: {
    padding: "10px",
    borderBottom: "1px solid #eee",
  },
};