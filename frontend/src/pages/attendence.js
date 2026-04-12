import React, { useState } from "react";

const Attendence = () => {
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Attendence Panel</h2>

        {/* Section Dropdown */}
        <div style={styles.field}>
          <label>Section:</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            style={styles.select}
          >
            <option value="">Select Section</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>
        </div>

        {/* Subject Dropdown */}
        <div style={styles.field}>
          <label>Subject:</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={styles.select}
          >
            <option value="">Select Subject</option>
            <option value="Math">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
          </select>
        </div>

        {/* Buttons */}
        <div style={styles.buttonContainer}>
          <button style={styles.startBtn}>
            Start Session
          </button>

          <button style={styles.endBtn}>
            End Session
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "350px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  field: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  select: {
    padding: "8px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  startBtn: {
    padding: "10px",
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  endBtn: {
    padding: "10px",
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Attendence;