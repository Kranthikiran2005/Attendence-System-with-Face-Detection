import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #ffd1a3b5;
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }

  .heading {
    font-family: 'Playfair Display', serif;
    font-size: 13px;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: #999;
  }

  .options {
    display: flex;
    gap: 24px;
    align-items: center;
    border-radius: 2px;
  }

  .option-btn {
    width: 250px;
    height: 100px;
    border: 1.5px solid #ccc;
    border-radius: 5px;
    background: transparent;
    color: #888;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: color 0.25s ease, border-color 0.25s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .option-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #2c2c2c;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.77, 0, 0.175, 1);
    z-index: 0;
  }

  .option-btn:hover::before,
  .option-btn.active::before {
    transform: scaleX(1);
  }

  .option-btn:hover,
  .option-btn.active {
    color: #fffbf4;
    border-color: #2c2c2c;
  }

  .option-btn span {
    position: relative;
    z-index: 1;
  }

  .divider {
    width: 1px;
    height: 24px;
    background: #ddd;
  }

  .status {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #bbb;
    min-height: 16px;
    transition: color 0.3s ease;
  }

  .status.active {
    color: #2c2c2c;
  }
`;



export default function RoleSelector() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <p className="heading">Select your role</p>

        <div className="options">
          <button
            className={`option-btn ${selected === "student" ? "active" : ""}`}
            onClick={() => {
            setSelected("student");
            navigate("/student");
          }}
          >
            <span>Student</span>
          </button>

          <div className="divider" />

          <button
            className={`option-btn ${selected === "teacher" ? "active" : ""}`}
            onClick={() => setSelected("teacher")}
          >
            <span>Teacher</span>
          </button>
          <button
            className={`option-btn ${selected === "class" ? "active" : ""}`}
            onClick={() => setSelected("class")}
          >
            <span>Class</span>
          </button>
        </div>

        <p className={`status ${selected ? "active" : ""}`}>
          {selected ? `Continuing as ${selected}` : ""}
        </p>
      </div>
    </>
  );
}