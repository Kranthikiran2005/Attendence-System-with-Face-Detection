import { useRef, useState } from "react";

export default function CameraPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [image, setImage] = useState(null);

  // Start camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  // Capture image
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL("image/png");
    setImage(dataUrl);
  };

  // Send to backend
  const sendImage = async () => {
    try {
      const S_ID=119;
      const res = await fetch("http://localhost:3000/attendance/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image, S_ID }),
      });

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>📷 Camera</h2>

      <video ref={videoRef} autoPlay style={{ width: "300px" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <br /><br />

      <button onClick={startCamera}>Start Camera</button>
      <button onClick={captureImage}>Capture</button>
      <button onClick={sendImage}>Send</button>

      {image && (
        <>
          <h3>Captured Image:</h3>
          <img src={image} alt="captured" width="200" />
        </>
      )}
    </div>
  );
}