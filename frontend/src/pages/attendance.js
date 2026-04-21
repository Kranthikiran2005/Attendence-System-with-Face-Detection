import { useRef, useState, useEffect } from "react";
import {useLocation} from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function CameraAttendancePage() {
  const [started, setStarted] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [students, setStudents] = useState([]); // attendance log
  const [markedStudents, setMarkedStudents] = useState(new Set());
  const location = useLocation();

  const subject = location.state?.subject;
  const section = location.state?.section;

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const token=localStorage.getItem("token");
  // 🔹 Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera error:", err);
      alert("❌ Unable to access camera");
    }
  };

  // 🔹 Stop Camera
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // 🔹 Capture Image
  const handleCapture = () => {
  const canvas = canvasRef.current;
  const video = videoRef.current;

  if (!video || video.readyState !== 4) {
    alert("Camera not ready!");
    return;
  }

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const image = canvas.toDataURL("image/png");   // ← changed to PNG
  setCapturedImage(image);
};
  const IncreaseCount= async()=>{
    try{
      
      const res = await fetch("http://localhost:3000/teacher/attendance",{
        method: "POST",
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
      section,
      subject,
      })
      });
    }
  catch (err) {
      console.error(err);
      alert("❌ Failed to send");
    }
  }
  
    const generatePDF = async () => {
      try {
        const res = await fetch("http://localhost:3000/teacher/report", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject,
            section,
          }),
        });

        const data = await res.json(); // attendance data

        const doc = new jsPDF();

        // Title
        doc.setFontSize(18);
        doc.text("Attendance Report", 14, 20);

        doc.setFontSize(12);
        doc.text(`Subject: ${subject}`, 14, 30);
        doc.text(`Section: ${section}`, 14, 38);

        console.log(data);

        // Table
        const tableData = data.map((s) => [
          s.S_ID,
          s.S_Name,
          s.no_of_present,
          s.no_of_classes-s.no_of_present,
          s.no_of_classes,
          
        ]);

        autoTable(doc, {
          startY: 45,
          head: [["Student ID", "Name", "Present", "Absent", "Total"]],
          body: tableData,
        });

        doc.save("attendance_report.pdf");
      } catch (err) {
        console.error(err);
        alert("❌ Failed to generate report");
      }
    };
 
   
  

  // 🔹 Cleanup on unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div style={css.wrapper}>
      
      {/* LEFT SIDE */}
      <aside style={css.sidebar}>
        <h2>Attendance</h2>

        <button
          style={{ ...css.btn, background: "#27ae60" }}
          onClick={async () => {
            await IncreaseCount(); 
            await setStarted(true);
            await startCamera();
          }}
          disabled={started}
        >
          ▶ Start Attendance
        </button>

        <button
          style={{ ...css.btn, background: "#e74c3c" }}
          onClick={() => {
            setStarted(false);
            stopCamera();
          }}
          disabled={!started}
        >
          ■ Stop Attendance
        </button>


        <button
        style={{ ...css.btn, background: "#2c3e50" }}
        onClick={generatePDF}
      >
        📄 Generate Report
        </button>
      </aside>

      {/* RIGHT SIDE */}
      <main style={css.main}>
        <h1>Live Attendance Camera</h1>

        <div style={css.cameraBox}>
          {started ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={css.video}
            />
          ) : (
            <div style={css.placeholder}>
              Camera will start after clicking "Start Attendance"
            </div>
          )}
        </div>

        {/* Buttons */}
        <div style={css.btnGroup}>
          <button
            style={css.captureBtn}
            onClick={handleCapture}
            disabled={!started}
          >
            📸 Capture
          </button>

           <button
  style={css.sendBtn}
  onClick={async () => {
    try {
      const res = await fetch("http://localhost:3000/attendance/match", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: capturedImage, // or any data you want to send
          subject: subject,
          section: section,
          
        }),
      });

      const data = await res.json();
console.log(data);


setStudents((prev) => {
  const count = prev.filter(s => s.id === data.student_id).length;

  if (count < 1) {
    return [...prev, { id: data.student_id, score: data.score }];
  }

  return prev;
});

if (!markedStudents.has(data.student_id)) {
  try {
    await fetch("http://localhost:3000/teacher/increase-attendance", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: data.student_id,
        subject: subject,
        section: section,
      }),
    });

    // mark as already counted
    setMarkedStudents((prev) => new Set(prev).add(data.student_id));

    console.log("✅ Attendance increased for:", data.student_id);

  } catch (err) {
    console.error("❌ Failed to increase attendance", err);
  }
}


    } catch (err) {
      console.error(err);
      alert("❌ Failed to send");
    }
  }}

  disabled={!capturedImage}
>
  📤 Send
</button>

          {/* Retake Button */}
          {capturedImage && (
            <button
              style={css.retakeBtn}
              onClick={() => setCapturedImage(null)}
            >
              🔄 Retake
            </button>
          )}
        </div>

        {/* Preview */}
        {capturedImage && (
          <img src={capturedImage} alt="preview" style={css.preview} />
        )}

        <canvas
          ref={canvasRef}
          width="300"
          height="200"
          style={{ display: "none" }}
        />
      </main>
      {students.length > 0 && (
  <div style={{ marginTop: "20px", width: "300px" }}>
    <h3>📋 Attendance Log</h3>

    {students.map((s, index) => (
      <div
        key={index}
        style={{
          padding: "8px",
          margin: "5px 0",
          background: "#f1f1f1",
          borderRadius: "6px",
        }}
      >
        <strong>ID:</strong> {s.id} <br />
        <small>Score: {s.score}</small>
      </div>
    ))}
  </div>
)}
    </div>
  );
}

const css = {
  wrapper: {
    display: "flex",
    height: "100vh",
    fontFamily: "sans-serif",
  },

  sidebar: {
    width: "250px",
    background: "#fff",
    padding: "20px",
    borderRight: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  btn: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  cameraBox: {
    marginTop: "30px",
    width: "500px",
    height: "350px",
    borderRadius: "12px",
    overflow: "hidden",
    background: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  placeholder: {
    color: "#aaa",
    fontSize: "16px",
  },

  btnGroup: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  },

  captureBtn: {
    padding: "10px 16px",
    background: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  sendBtn: {
    padding: "10px 16px",
    background: "#185FA5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  retakeBtn: {
    padding: "10px 16px",
    background: "#f39c12",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  preview: {
    marginTop: "20px",
    width: "200px",
    borderRadius: "8px",
  },
};