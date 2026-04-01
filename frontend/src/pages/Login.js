import React, { useState } from 'react';

function Login() {
   
  const [showLogin, setShowLogin] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  
  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMsg, setLoginMsg] = useState('');
  
  // Register form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regMsg, setRegMsg] = useState('');
  
  // Load users from localStorage
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [];
  });

  const saveUsers = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
    
    if (user) {
      setLoggedInUser(user);
      setLoginMsg('');
    } else {
      setLoginMsg('Invalid email or password');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (!regName || !regEmail || !regPassword) {
      setRegMsg('Please fill all fields');
      return;
    }
    
    if (users.find(u => u.email === regEmail)) {
      setRegMsg('Email already exists');
      return;
    }
    
    const newUser = {
      name: regName,
      email: regEmail,
      password: regPassword
    };
    
    saveUsers([...users, newUser]);
    setRegMsg('Registration successful! Please login');
    setRegName('');
    setRegEmail('');
    setRegPassword('');
    
    setTimeout(() => {
      setShowLogin(true);
      setRegMsg('');
    }, 1500);
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
          <p>Email: {loggedInUser.email}</p>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.tabs}>
          <button 
            style={{...styles.tabBtn, ...(showLogin ? styles.activeTab : {})}}
            onClick={() => {
              setShowLogin(true);
              setLoginMsg('');
              setRegMsg('');
            }}
          >
            Login
          </button>
          <button 
            style={{...styles.tabBtn, ...(!showLogin ? styles.activeTab : {})}}
            onClick={() => {
              setShowLogin(false);
              setLoginMsg('');
              setRegMsg('');
            }}
          >
            Register
          </button>
        </div>

        {showLogin ? (
          <form onSubmit={handleLogin} style={styles.form}>
            <h2>Student Login</h2>
            {loginMsg && <div style={{...styles.msg, ...styles.errorMsg}}>{loginMsg}</div>}
            
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
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
            
            <button type="submit" style={styles.submitBtn}>Login</button>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={styles.form}>
            <h2>Student Register</h2>
            {regMsg && (
              <div style={{
                ...styles.msg,
                ...(regMsg.includes('successful') ? styles.successMsg : styles.errorMsg)
              }}>
                {regMsg}
              </div>
            )}
            
            <input
              type="text"
              placeholder="Full Name"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              style={styles.input}
              required
            />
            
            <input
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              style={styles.input}
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              style={styles.input}
              required
            />
            
            <button type="submit" style={styles.submitBtn}>Register</button>
          </form>
        )}
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
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #eee'
  },
  tabBtn: {
    flex: 1,
    padding: '15px',
    fontSize: '16px',
    fontWeight: 'bold',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#666'
  },
  activeTab: {
    color: '#667eea',
    borderBottom: '2px solid #667eea'
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
  successMsg: {
    background: '#efe',
    color: '#3a6',
    border: '1px solid #cfc'
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