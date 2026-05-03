import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password!");
    }
    setLoading(false);
  };

  return (
    <div style={s.bg}>
      <div style={s.card}>
        <div style={s.logo}>🎓</div>
        <h1 style={s.title}>AcadVault</h1>
        <p style={s.sub}>Student Portfolio Management System</p>
        {error && <div style={s.error}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div style={s.fieldWrap}>
            <label style={s.label}>EMAIL</label>
            <input style={s.input} type="email" placeholder="staff@college.edu"
              value={email} onChange={e => setEmail(e.target.value)} required/>
          </div>
          <div style={s.fieldWrap}>
            <label style={s.label}>PASSWORD</label>
            <input style={s.input} type="password" placeholder="Enter password"
              value={password} onChange={e => setPassword(e.target.value)} required/>
          </div>
          <button style={s.btn} type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>
        <p style={s.foot}>Only authorized staff can access this system</p>
      </div>
    </div>
  );
}

const s = {
  bg: {minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#0f172a,#1e3a5f)"},
  card: {background:"white",borderRadius:"20px",padding:"48px 40px",width:"380px",boxShadow:"0 25px 60px rgba(0,0,0,0.3)"},
  logo: {fontSize:"3rem",textAlign:"center"},
  title: {textAlign:"center",fontSize:"2rem",fontWeight:"800",color:"#1e3a5f",margin:"8px 0 4px"},
  sub: {textAlign:"center",color:"#94a3b8",fontSize:"0.85rem",marginBottom:"32px"},
  error: {background:"#fef2f2",border:"1px solid #fecaca",borderRadius:"8px",padding:"10px 14px",color:"#ef4444",fontSize:"0.9rem",marginBottom:"16px"},
  fieldWrap: {marginBottom:"16px"},
  label: {display:"block",fontSize:"0.75rem",fontWeight:"700",color:"#64748b",letterSpacing:"0.08em",marginBottom:"6px"},
  input: {width:"100%",padding:"12px 16px",borderRadius:"10px",border:"1.5px solid #e2e8f0",fontSize:"0.95rem",outline:"none",boxSizing:"border-box",fontFamily:"inherit"},
  btn: {width:"100%",padding:"14px",background:"linear-gradient(135deg,#3b82f6,#06b6d4)",color:"white",border:"none",borderRadius:"10px",fontSize:"1rem",fontWeight:"700",cursor:"pointer",marginTop:"8px"},
  foot: {textAlign:"center",color:"#cbd5e1",fontSize:"0.78rem",marginTop:"24px",marginBottom:"0"}
};