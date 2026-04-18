// Register.jsx
import { useRef, useState, useEffect } from "react";
import "../styles/register.css";
import { useLocation,useNavigate } from "react-router-dom";

const USER_REGEX = /^[0-9]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NAME_REGEX = /^.{2,50}$/;
const REGISTER_URL = 'http://localhost:3000/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate=useNavigate();

    const [name, setName] = useState('');
    const [validName2, setValidName2] = useState(false);

    const [section, setSection] = useState('');

    const [user_id, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => { userRef.current.focus(); }, []);

    useEffect(() => { setValidName2(NAME_REGEX.test(name)); }, [name]);
    useEffect(() => { setValidName(USER_REGEX.test(user_id)); }, [user_id]);
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);
    useEffect(() => { setErrMsg(''); }, [name, section, user_id, pwd, matchPwd]);

    const location = useLocation();
    const [role, setRole] = useState(location.state?.role || '');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!NAME_REGEX.test(name) || !USER_REGEX.test(user_id) || !PWD_REGEX.test(pwd)) {
            setErrMsg("Invalid Entry");
            return;
        }

        if(role==="Teacher"){
            setSection("None");
        }

        try {
            const response = await fetch(REGISTER_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, section, user_id, pwd, role }),
                credentials: "include"
            });
            if (!response.ok) {
                throw new Error(response.status === 409 ? "Username Taken" : "Registration Failed");
            }
            if(role==="Student"){
                navigate("/student", { 
                state: { role: "Student" } 
            });
            }
            if(role==="Teacher"){
                navigate("/teacher", { 
                state: { role: "Teacher" } });
            }
            
            setSuccess(true);
            setName(''); setSection(''); setUser(''); setPwd(''); setMatchPwd('');
        } catch (err) {
            setErrMsg(err.message);
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section className="container">
                    <h1>Success!</h1>
                    <a href="#">Sign In</a>
                </section>
            ) : (
                <section className="container">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>

                        {/* FULL NAME */}
                        <label>
                            Full Name
                            <span className={validName2 ? "valid" : "hide"}>✔</span>
                            <span className={!validName2 && name ? "invalid" : "hide"}>✖</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p className={!validName2 && name ? "instructions" : "offscreen"}>
                            ℹ 2–50 characters
                        </p>
                        
                        {/* ROLE */}
                        <label>Role</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="">Select Role</option>
                                <option value="Student">Student</option>
                                <option value="Teacher">Teacher</option>
                                </select>
                        {/* SECTION */}
                       {role === "Student" && (
                        <>
                        <label>Section</label>
                        <input
                        type="text"
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                            placeholder="e.g. CS-A"
                            />
                        </>
                        )}
                        
                        
                        {/* USERNAME */}
                        <label>
                            Username
                            <span className={validName ? "valid" : "hide"}>✔</span>
                            <span className={!validName && user_id ? "invalid" : "hide"}>✖</span>
                        </label>
                        <input
                            type="text"
                            ref={userRef}
                            value={user_id}
                            onChange={(e) => setUser(e.target.value)}
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p className={userFocus && user_id && !validName ? "instructions" : "offscreen"}>
                            ℹ 4–24 chars, start with letter
                        </p>

                        {/* PASSWORD */}
                        <label>
                            Password
                            <span className={validPwd ? "valid" : "hide"}>✔</span>
                            <span className={!validPwd && pwd ? "invalid" : "hide"}>✖</span>
                        </label>
                        <input
                            type="password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            ℹ Must include upper, lower, number, special char
                        </p>


                        {/* CONFIRM */}
                        <label>
                            Confirm Password
                            <span className={validMatch ? "valid" : "hide"}>✔</span>
                            <span className={!validMatch && matchPwd ? "invalid" : "hide"}>✖</span>
                        </label>
                        <input
                            type="password"
                            value={matchPwd}
                            onChange={(e) => setMatchPwd(e.target.value)}
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            ℹ Must match password
                        </p>

                        <button disabled={!validName2 || !validName || !validPwd || !validMatch}>
                            Sign Up
                        </button>
                    </form>
                </section>
            )}
        </>
    );
};

export default Register;