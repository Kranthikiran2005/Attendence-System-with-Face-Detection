import { useRef, useState, useEffect } from "react";

export default function CameraAttendancePage() {
  const [started, setStarted] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 🔹 Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  // 🔹 Stop Camera
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  // 🔹 Capture only
  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!video) return;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, 300, 200);

    const image = canvas.toDataURL("image/jpeg");
    setCapturedImage(image);
  };

  // 🔹 Send only
  const handleSend = async () => {
    if (!capturedImage) {
      alert("Capture image first!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/check_attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: capturedImage,
        }),
      });

      const data = await res.json();
      console.log("Response:", data);
      alert("✅ Attendance sent");

    } catch (err) {
      console.error(err);
      alert("❌ Failed to send");
    }
  };

  // cleanup
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
          onClick={() => {
            setStarted(true);
            startCamera();
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
      </aside>

      {/* RIGHT SIDE */}
      <main style={css.main}>
        <h1>Live Attendance Camera</h1>

        <div style={css.cameraBox}>
          {started ? (
            <video ref={videoRef} autoPlay style={css.video} />
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
            onClick={handleSend}
            disabled={!capturedImage}
          >
            📤 Send
          </button>
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

  preview: {
    marginTop: "20px",
    width: "200px",
    borderRadius: "8px",
  },
};w