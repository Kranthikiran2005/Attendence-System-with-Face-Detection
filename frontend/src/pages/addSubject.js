import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddSubject() {
  const [subject, setSubject] = useState("");
  const [section, setSection] = useState("");
  const [msg, setMsg] = useState("");

  const navigate=useNavigate();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/teacher/add-subject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subject, section }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("✅ Subject added successfully!");
        setSubject("");
        setSection("");
      } else {
        setMsg(data.error || "❌ Failed to add");
      }
    } catch (err) {
      console.error(err);
      setMsg("❌ Error occurred");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Subject</h2>

      {/* SUBJECT */}
      <label>Subject</label>
      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      >
        <option value="">Select Subject</option>
        <option>English</option>
        <option>Mathematics</option>
        <option>Physics</option>
        <option>Chemistry</option>
        <option>Biology</option>
        <option>History</option>
        <option>Computer Science</option>
      </select>

      {/* SECTION */}
      <label>Section</label>
      <input
        type="text"
        placeholder="Enter Section (S1, S2...)"
        value={section}
        onChange={(e) => setSection(e.target.value)}
      />

      {/* BUTTON */}
      <button onClick={handleSubmit}>Register</button>
      <button onClick={()=>{navigate("/teacher")}}>Back</button>

      {/* MESSAGE */}
      <p>{msg}</p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "80px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
  },
};