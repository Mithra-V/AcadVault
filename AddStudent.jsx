import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addDoc(collection(db, "students"), { name, department, createdAt: new Date() });
    navigate("/dashboard");
  };

  return (
    <div style={s.bg}>
      <div style={s.card}>
        <button style={s.back} onClick={() => navigate("/dashboard")}>← Back</button>
        <h2 style={s.title}>Add New Student</h2>
        <p style={s.sub}>Fill in the details below</p>
        <form onSubmit={handleAdd}>
          <div style={s.fieldWrap}>
            <label style={s.label}>STUDENT NAME</label>
            <input style={s.input} placeholder="Enter full name"
              value={name} onChange={e => setName(e.target.value)} required/>
          </div>
          <div style={s.fieldWrap}>
            <label style={s.label}>DEPARTMENT</label>
            <select style={s.input} value={department}
              onChange={e => setDepartment(e.target.value)} required>
              <option value="">Select Department</option>
              <option>EEE</option>
              <option>ECE</option>
              <option>CSE</option>
              <option>IT</option>
              <option>MECH</option>
              <option>CIVIL</option>
              <option>AIDS</option>
              <option>AIML</option>
            </select>
          </div>
          <button style={s.btn} type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Student →"}
          </button>
        </form>
      </div>
    </div>
  );
}

const s = {
  bg: {minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f0f4f8"},
  card: {background:"white",borderRadius:"20px",padding:"40px",width:"380px",boxShadow:"0 10px 40px rgba(0,0,0,0.1)"},
  back: {background:"transparent",border:"none",color:"#64748b",cursor:"pointer",fontSize:"0.9rem",padding:"0",marginBottom:"20px"},
  title: {margin:"0 0 4px",fontSize:"1.6rem",fontWeight:"800",color:"#0f172a"},
  sub: {color:"#94a3b8",fontSize:"0.85rem",marginBottom:"28px"},
  fieldWrap: {marginBottom:"16px"},
  label: {display:"block",fontSize:"0.75rem",fontWeight:"700",color:"#64748b",letterSpacing:"0.08em",marginBottom:"6px"},
  input: {width:"100%",padding:"12px 16px",borderRadius:"10px",border:"1.5px solid #e2e8f0",fontSize:"0.95rem",outline:"none",boxSizing:"border-box",fontFamily:"inherit"},
  btn: {width:"100%",padding:"14px",background:"linear-gradient(135deg,#3b82f6,#06b6d4)",color:"white",border:"none",borderRadius:"10px",fontSize:"1rem",fontWeight:"700",cursor:"pointer",marginTop:"8px"}
};