import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getDocs(collection(db, "students")).then(snap => {
      setStudents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const filtered = students.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.department?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={s.page}>
      <div style={s.nav}>
        <div style={s.brand}>🎓 AcadVault</div>
        <div style={{display:"flex",gap:"10px"}}>
          <Link to="/add"><button style={s.addBtn}>+ Add Student</button></Link>
          <button style={s.logoutBtn} onClick={() => { signOut(auth); navigate("/"); }}>Logout</button>
        </div>
      </div>
      <div style={s.content}>
        <div style={s.header}>
          <div>
            <h2 style={s.heading}>Student Records</h2>
            <p style={s.count}>{filtered.length} students found</p>
          </div>
        </div>
        <input style={s.search} placeholder="🔍 Search by name or department..."
          value={search} onChange={e => setSearch(e.target.value)}/>
        {filtered.length === 0 && (
          <div style={s.empty}>
            <div style={{fontSize:"3rem"}}>📂</div>
            <p>No students yet. <Link to="/add" style={{color:"#3b82f6"}}>Add one!</Link></p>
          </div>
        )}
        {filtered.map(st => (
          <div key={st.id} style={s.card}>
            <div style={s.avatar}>{st.name?.[0]?.toUpperCase()}</div>
            <div style={{flex:1}}>
              <strong style={s.name}>{st.name}</strong>
              <p style={s.roll}>{st.rollNo || "No roll no"}</p>
            </div>
            <span style={s.tag}>{st.department}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  page: {minHeight:"100vh",background:"#f0f4f8"},
  nav: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 32px",background:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.08)"},
  brand: {fontSize:"1.3rem",fontWeight:"800",background:"linear-gradient(135deg,#3b82f6,#06b6d4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},
  content: {maxWidth:"700px",margin:"40px auto",padding:"0 20px"},
  header: {display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},
  heading: {margin:"0 0 4px",fontSize:"1.6rem",fontWeight:"800",color:"#0f172a"},
  count: {margin:0,color:"#94a3b8",fontSize:"0.9rem"},
  search: {width:"100%",padding:"12px 16px",borderRadius:"10px",border:"1.5px solid #e2e8f0",fontSize:"0.95rem",marginBottom:"20px",boxSizing:"border-box",outline:"none"},
  card: {display:"flex",alignItems:"center",gap:"16px",background:"white",padding:"16px 20px",borderRadius:"12px",marginBottom:"12px",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"},
  avatar: {width:"44px",height:"44px",borderRadius:"12px",background:"linear-gradient(135deg,#3b82f6,#06b6d4)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:"800",fontSize:"1.1rem",flexShrink:0},
  name: {fontSize:"1rem",color:"#0f172a"},
  roll: {margin:"2px 0 0",color:"#94a3b8",fontSize:"0.85rem"},
  tag: {background:"#eff6ff",color:"#3b82f6",padding:"4px 14px",borderRadius:"20px",fontSize:"0.8rem",fontWeight:"600",flexShrink:0},
  empty: {textAlign:"center",padding:"60px",color:"#94a3b8"},
  addBtn: {background:"linear-gradient(135deg,#3b82f6,#06b6d4)",color:"white",border:"none",borderRadius:"8px",padding:"10px 18px",cursor:"pointer",fontWeight:"700",fontSize:"0.9rem"},
  logoutBtn: {background:"transparent",border:"1.5px solid #e2e8f0",borderRadius:"8px",padding:"10px 18px",cursor:"pointer",fontSize:"0.9rem",color:"#64748b"}
};