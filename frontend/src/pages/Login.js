import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Login() {

  const [loggedInUser, setLoggedInUser] = useState(null);

  // Login form
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMsg, setLoginMsg] = useState('');
  const token=localStorage.getItem("token");
  const location=useLocation();
  //const role=location.state?.role;
  const navigate=useNavigate();
  const role=localStorage.getItem("role");
 useEffect(() => {

  if (token) {
    if (role === "teacher") navigate("/teacher");
    else if (role === "student") navigate("/student");
  }
}, []);

  const [users] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [];
  });

  
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("HI1");
    console.log("Entered handle Login");
    console.log(role);

    if (role ==="student"){
      try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          loginId: loginId,
          loginPassword: loginPassword,
          role: "student"
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginMsg(data.message);
        return;
      }

      // success
      setLoggedInUser(data.user);
      
      setLoginMsg("");
      console.log(data.token);
      console.log("HI2");
      localStorage.setItem("token",data.token);
      localStorage.setItem("user",data.user_name);
      localStorage.setItem("id", data.id);
      navigate("/student");
    } catch (err) {
      setLoginMsg("Server error");
      console.error(err);
    }
    }
    else if(role === "teacher"){
      try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          loginId: loginId,
          loginPassword: loginPassword,
          role: "teacher"
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginMsg(data.message);
        return;
      }

      // success
      setLoggedInUser(data.user);
      
      setLoginMsg("");

      localStorage.setItem("token",data.token);
      localStorage.setItem("user",data.user_name);
      localStorage.setItem("id", data.id);
      navigate("/teacher");
    } catch (err) {
      setLoginMsg("Server error");
      console.error(err);
    }
    }
    
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  // Dashboard after login
  if (loggedInUser) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Welcome {loggedInUser.name}! 🎓</h2>
          <p>Login ID: {loggedInUser.loginId}</p>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <form onSubmit={handleLogin} style={styles.form}>
          <h2>Login</h2>

          {loginMsg && (
            <div style={{ ...styles.msg, ...styles.errorMsg }}>
              {loginMsg}
            </div>
          )}

          <input
            type="text"
            placeholder="Login ID"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.submitBtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  card: {
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '380px',
    overflow: 'hidden'
  },
  form: {
    padding: '30px'
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px'
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  msg: {
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
    textAlign: 'center',
    fontSize: '14px'
  },
  errorMsg: {
    background: '#fee',
    color: '#c33',
    border: '1px solid #fcc'
  },
  logoutBtn: {
    marginTop: '20px',
    padding: '10px 20px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

export default Login;