import { useState, useMemo, useRef, useEffect } from "react";

/* ─── Team metadata ─────────────────────────────────────────────────── */
const TEAM_META = {
  RCB:  { name: "Royal Challengers Bengaluru", color: "#C8102E" },
  SRH:  { name: "Sunrisers Hyderabad",          color: "#FF8200" },
  MI:   { name: "Mumbai Indians",               color: "#005DA0" },
  KKR:  { name: "Kolkata Knight Riders",        color: "#3A225D" },
  RR:   { name: "Rajasthan Royals",             color: "#E83B8E" },
  CSK:  { name: "Chennai Super Kings",          color: "#F9CD05" },
  PBKS: { name: "Punjab Kings",                 color: "#ED1B24" },
  GT:   { name: "Gujarat Titans",               color: "#1C2B78" },
  LSG:  { name: "Lucknow Super Giants",         color: "#A72056" },
  DC:   { name: "Delhi Capitals",               color: "#17479E" },
};

/* ─── Full match list ───────────────────────────────────────────────── */
const MATCHES = [
  {id:1,  date:"2026-03-28",time:"19:30",home:"RCB", away:"SRH", venue:"M. Chinnaswamy Stadium, Bengaluru"},
  {id:2,  date:"2026-03-29",time:"19:30",home:"MI",  away:"KKR", venue:"Wankhede Stadium, Mumbai"},
  {id:3,  date:"2026-03-30",time:"19:30",home:"RR",  away:"CSK", venue:"Barsapara Cricket Stadium, Guwahati"},
  {id:4,  date:"2026-03-31",time:"19:30",home:"PBKS",away:"GT",  venue:"Maharaja Yadavindra Singh Stadium, Mullanpur"},
  {id:5,  date:"2026-04-01",time:"19:30",home:"LSG", away:"DC",  venue:"Ekana Cricket Stadium, Lucknow"},
  {id:6,  date:"2026-04-02",time:"19:30",home:"KKR", away:"SRH", venue:"Eden Gardens, Kolkata"},
  {id:7,  date:"2026-04-03",time:"19:30",home:"CSK", away:"PBKS",venue:"MA Chidambaram Stadium, Chennai"},
  {id:8,  date:"2026-04-04",time:"15:30",home:"DC",  away:"MI",  venue:"Arun Jaitley Stadium, Delhi"},
  {id:9,  date:"2026-04-04",time:"19:30",home:"GT",  away:"RR",  venue:"Narendra Modi Stadium, Ahmedabad"},
  {id:10, date:"2026-04-05",time:"15:30",home:"SRH", away:"LSG", venue:"Rajiv Gandhi International Stadium, Hyderabad"},
  {id:11, date:"2026-04-05",time:"19:30",home:"RCB", away:"CSK", venue:"M. Chinnaswamy Stadium, Bengaluru"},
  {id:12, date:"2026-04-06",time:"19:30",home:"KKR", away:"PBKS",venue:"Eden Gardens, Kolkata"},
  {id:13, date:"2026-04-07",time:"19:30",home:"RR",  away:"MI",  venue:"Barsapara Cricket Stadium, Guwahati"},
  {id:14, date:"2026-04-08",time:"19:30",home:"DC",  away:"GT",  venue:"Arun Jaitley Stadium, Delhi"},
  {id:15, date:"2026-04-09",time:"19:30",home:"KKR", away:"LSG", venue:"Eden Gardens, Kolkata"},
  {id:16, date:"2026-04-10",time:"19:30",home:"RR",  away:"RCB", venue:"Barsapara Cricket Stadium, Guwahati"},
  {id:17, date:"2026-04-11",time:"15:30",home:"PBKS",away:"SRH", venue:"Mullanpur Stadium, New Chandigarh"},
  {id:18, date:"2026-04-11",time:"19:30",home:"CSK", away:"DC",  venue:"MA Chidambaram Stadium, Chennai"},
  {id:19, date:"2026-04-12",time:"15:30",home:"LSG", away:"GT",  venue:"Ekana Cricket Stadium, Lucknow"},
  {id:20, date:"2026-04-12",time:"19:30",home:"MI",  away:"RCB", venue:"Wankhede Stadium, Mumbai"},
  {id:21, date:"2026-04-13",time:"19:30",home:"SRH", away:"RR",  venue:"Rajiv Gandhi International Stadium, Hyderabad"},
  {id:22, date:"2026-04-14",time:"19:30",home:"CSK", away:"KKR", venue:"MA Chidambaram Stadium, Chennai"},
  {id:23, date:"2026-04-15",time:"19:30",home:"RCB", away:"LSG", venue:"M. Chinnaswamy Stadium, Bengaluru"},
  {id:24, date:"2026-04-16",time:"19:30",home:"MI",  away:"PBKS",venue:"Wankhede Stadium, Mumbai"},
  {id:25, date:"2026-04-17",time:"19:30",home:"GT",  away:"KKR", venue:"Narendra Modi Stadium, Ahmedabad"},
  {id:26, date:"2026-04-18",time:"15:30",home:"RCB", away:"DC",  venue:"M. Chinnaswamy Stadium, Bengaluru"},
  {id:27, date:"2026-04-18",time:"19:30",home:"SRH", away:"CSK", venue:"Rajiv Gandhi International Stadium, Hyderabad"},
  {id:28, date:"2026-04-19",time:"15:30",home:"KKR", away:"RR",  venue:"Eden Gardens, Kolkata"},
  {id:29, date:"2026-04-19",time:"19:30",home:"PBKS",away:"LSG", venue:"Mullanpur Stadium, New Chandigarh"},
  {id:30, date:"2026-04-20",time:"19:30",home:"GT",  away:"MI",  venue:"Narendra Modi Stadium, Ahmedabad"},
  {id:31, date:"2026-04-21",time:"19:30",home:"SRH", away:"DC",  venue:"Rajiv Gandhi International Stadium, Hyderabad"},
  {id:32, date:"2026-04-22",time:"19:30",home:"LSG", away:"RR",  venue:"Ekana Cricket Stadium, Lucknow"},
  {id:33, date:"2026-04-23",time:"19:30",home:"MI",  away:"CSK", venue:"Wankhede Stadium, Mumbai"},
  {id:34, date:"2026-04-24",time:"19:30",home:"RCB", away:"GT",  venue:"M. Chinnaswamy Stadium, Bengaluru"},
  {id:35, date:"2026-04-25",time:"15:30",home:"DC",  away:"PBKS",venue:"Arun Jaitley Stadium, Delhi"},
  {id:36, date:"2026-04-25",time:"19:30",home:"RR",  away:"SRH", venue:"Sawai Mansingh Stadium, Jaipur"},
  {id:37, date:"2026-04-26",time:"15:30",home:"GT",  away:"CSK", venue:"Narendra Modi Stadium, Ahmedabad"},
  {id:38, date:"2026-04-26",time:"19:30",home:"LSG", away:"KKR", venue:"Ekana Cricket Stadium, Lucknow"},
  {id:39, date:"2026-04-27",time:"19:30",home:"DC",  away:"RCB", venue:"Arun Jaitley Stadium, Delhi"},
  {id:40, date:"2026-04-28",time:"19:30",home:"PBKS",away:"RR",  venue:"Mullanpur Stadium, New Chandigarh"},
  {id:41, date:"2026-04-29",time:"19:30",home:"MI",  away:"SRH", venue:"Wankhede Stadium, Mumbai"},
  {id:42, date:"2026-04-30",time:"19:30",home:"GT",  away:"RCB", venue:"Narendra Modi Stadium, Ahmedabad"},
  {id:43, date:"2026-05-01",time:"19:30",home:"RR",  away:"DC",  venue:"Sawai Mansingh Stadium, Jaipur"},
  {id:44, date:"2026-05-02",time:"19:30",home:"CSK", away:"MI",  venue:"MA Chidambaram Stadium, Chennai"},
  {id:45, date:"2026-05-03",time:"15:30",home:"SRH", away:"KKR", venue:"Rajiv Gandhi International Stadium, Hyderabad"},
  {id:46, date:"2026-05-03",time:"19:30",home:"GT",  away:"PBKS",venue:"Narendra Modi Stadium, Ahmedabad"},
  {id:47, date:"2026-05-04",time:"19:30",home:"MI",  away:"LSG", venue:"Wankhede Stadium, Mumbai"},
  {id:48, date:"2026-05-05",time:"19:30",home:"DC",  away:"CSK", venue:"Arun Jaitley Stadium, Delhi"},
  {id:49, date:"2026-05-06",time:"15:30",home:"SRH", away:"PBKS",venue:"Rajiv Gandhi International Stadium, Hyderabad"},
  {id:50, date:"2026-05-07",time:"19:30",home:"LSG", away:"RCB", venue:"Ekana Cricket Stadium, Lucknow"},
  {id:51, date:"2026-05-08",time:"19:30",home:"DC",  away:"KKR", venue:"Arun Jaitley Stadium, Delhi"},
  {id:52, date:"2026-05-09",time:"19:30",home:"RR",  away:"GT",  venue:"Sawai Mansingh Stadium, Jaipur"},
  {id:53, date:"2026-05-10",time:"15:30",home:"CSK", away:"LSG", venue:"MA Chidambaram Stadium, Chennai"},
  {id:54, date:"2026-05-10",time:"19:30",home:"RCB", away:"MI",  venue:"Nava Raipur Cricket Stadium, Raipur"},
  {id:55, date:"2026-05-11",time:"19:30",home:"PBKS",away:"DC",  venue:"HPCA Stadium, Dharamshala"},
  {id:56, date:"2026-05-12",time:"19:30",home:"GT",  away:"SRH", venue:"Narendra Modi Stadium, Ahmedabad"},
  {id:57, date:"2026-05-13",time:"19:30",home:"RCB", away:"KKR", venue:"Nava Raipur Cricket Stadium, Raipur"},
  {id:58, date:"2026-05-14",time:"19:30",home:"PBKS",away:"MI",  venue:"HPCA Stadium, Dharamshala"},
  {id:59, date:"2026-05-15",time:"19:30",home:"LSG", away:"CSK", venue:"Ekana Cricket Stadium, Lucknow"},
  {id:60, date:"2026-05-16",time:"19:30",home:"KKR", away:"GT",  venue:"Eden Gardens, Kolkata"},
  {id:61, date:"2026-05-17",time:"15:30",home:"PBKS",away:"RCB", venue:"HPCA Stadium, Dharamshala"},
  {id:62, date:"2026-05-17",time:"19:30",home:"DC",  away:"RR",  venue:"Arun Jaitley Stadium, Delhi"},
  {id:63, date:"2026-05-18",time:"19:30",home:"CSK", away:"SRH", venue:"MA Chidambaram Stadium, Chennai"},
  {id:64, date:"2026-05-19",time:"19:30",home:"RR",  away:"LSG", venue:"Sawai Mansingh Stadium, Jaipur"},
  {id:65, date:"2026-05-20",time:"19:30",home:"KKR", away:"MI",  venue:"Eden Gardens, Kolkata"},
  {id:66, date:"2026-05-21",time:"19:30",home:"CSK", away:"GT",  venue:"MA Chidambaram Stadium, Chennai"},
  {id:67, date:"2026-05-22",time:"19:30",home:"SRH", away:"RCB", venue:"Rajiv Gandhi International Stadium, Hyderabad"},
  {id:68, date:"2026-05-23",time:"19:30",home:"LSG", away:"PBKS",venue:"Ekana Cricket Stadium, Lucknow"},
  {id:69, date:"2026-05-24",time:"15:30",home:"MI",  away:"RR",  venue:"Wankhede Stadium, Mumbai"},
  {id:70, date:"2026-05-24",time:"19:30",home:"KKR", away:"DC",  venue:"Eden Gardens, Kolkata"},
  {id:71, date:"2026-05-27",time:"19:30",home:"TBD", away:"TBD", venue:"TBD", label:"Qualifier 1"},
  {id:72, date:"2026-05-28",time:"19:30",home:"TBD", away:"TBD", venue:"TBD", label:"Eliminator"},
  {id:73, date:"2026-05-30",time:"19:30",home:"TBD", away:"TBD", venue:"TBD", label:"Qualifier 2"},
  {id:74, date:"2026-05-31",time:"19:30",home:"TBD", away:"TBD", venue:"TBD", label:"🏆 IPL 2026 FINAL"},
];

/* ─── Calendar helpers ──────────────────────────────────────────────── */
const pad = (n) => String(n).padStart(2, "0");

function istToUtc(dateStr, timeStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [h, min]  = timeStr.split(":").map(Number);
  const utc = new Date(Date.UTC(y, m - 1, d, h - 5, min - 30)); // IST = UTC+5:30
  return utc;
}

function toCompact(dt) {
  return `${dt.getUTCFullYear()}${pad(dt.getUTCMonth()+1)}${pad(dt.getUTCDate())}T${pad(dt.getUTCHours())}${pad(dt.getUTCMinutes())}00Z`;
}

function matchTitle(m) {
  return m.label
    ? `IPL 2026 – ${m.label}`
    : `IPL 2026: ${TEAM_META[m.home]?.name || m.home} vs ${TEAM_META[m.away]?.name || m.away}`;
}

// ── Google Calendar direct URL ────────────────────────────────────────
function gcalUrl(match) {
  const start   = istToUtc(match.date, match.time);
  const end     = new Date(start.getTime() + 210 * 60 * 1000);
  const params  = new URLSearchParams({
    action:   "TEMPLATE",
    text:     matchTitle(match),
    dates:    `${toCompact(start)}/${toCompact(end)}`,
    details:  `Match #${match.id} | ${match.time} IST`,
    location: match.venue !== "TBD" ? match.venue : "India",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

// ── ICS blob download (Apple Calendar, Outlook, bulk) ─────────────────
function buildVEVENT(match) {
  const start = istToUtc(match.date, match.time);
  const end   = new Date(start.getTime() + 210 * 60 * 1000);
  return [
    "BEGIN:VEVENT",
    `DTSTART:${toCompact(start)}`,
    `DTEND:${toCompact(end)}`,
    `SUMMARY:${matchTitle(match)}`,
    `LOCATION:${match.venue !== "TBD" ? match.venue : "India"}`,
    `DESCRIPTION:Match #${match.id} | ${match.venue} | ${match.time} IST`,
    `UID:ipl2026-${match.id}@ipl2026schedule`,
    "END:VEVENT",
  ].join("\r\n");
}

function downloadICS(filename, events) {
  const body = [
    "BEGIN:VCALENDAR","VERSION:2.0",
    "PRODID:-//IPL 2026 Schedule//EN",
    "CALSCALE:GREGORIAN","METHOD:PUBLISH",
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([body], { type: "text/calendar;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement("a"), { href: url, download: filename });
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

const isIOS     = () => /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = () => /Android/.test(navigator.userAgent);

/* ─── CalendarPicker ────────────────────────────────────────────────── */
function CalendarPicker({ match, added, onAdd }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("touchstart", close); };
  }, []);

  const doGoogle = () => { window.open(gcalUrl(match), "_blank", "noopener"); onAdd(match.id); setOpen(false); };
  const doICS    = () => { downloadICS(`ipl2026-m${match.id}.ics`, [buildVEVENT(match)]); onAdd(match.id); setOpen(false); };

  // Smart single-tap behaviour by platform
  const mainTap = () => {
    if (isAndroid()) doGoogle();
    else if (isIOS()) doICS();
    else setOpen(o => !o);
  };

  const isFinal = match.label?.includes("FINAL");
  const btnBase = {
    border: "none", cursor: "pointer", transition: "background 0.18s",
    fontFamily: "inherit",
  };

  return (
    <div ref={ref} style={{ position: "relative", alignSelf: "flex-start" }}>
      <div style={{
        display: "flex", borderRadius: 9, overflow: "hidden",
        border: added ? "1px solid #4ade80" : "1px solid rgba(255,255,255,0.14)",
      }}>
        {/* Main action */}
        <button onClick={mainTap} style={{
          ...btnBase,
          padding: "8px 15px",
          background: added
            ? "rgba(74,222,128,0.12)"
            : isFinal ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.06)",
          color: added ? "#4ade80" : "#fff",
          fontSize: 12, fontWeight: 700, letterSpacing: 0.4,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          {added ? "✅ Added" : "📅 Add to Calendar"}
        </button>

        {/* Caret — always show so user can pick their app */}
        <button onClick={() => setOpen(o => !o)} style={{
          ...btnBase,
          padding: "8px 10px",
          background: added ? "rgba(74,222,128,0.08)" : "rgba(255,255,255,0.04)",
          color: added ? "#4ade80" : "rgba(255,255,255,0.4)",
          borderLeft: added ? "1px solid rgba(74,222,128,0.2)" : "1px solid rgba(255,255,255,0.1)",
          fontSize: 9,
        }} title="Choose calendar app">
          {open ? "▲" : "▼"}
        </button>
      </div>

      {/* Dropdown menu */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 200,
          background: "#091024", border: "1px solid rgba(255,255,255,0.13)",
          borderRadius: 10, overflow: "hidden", minWidth: 210,
          boxShadow: "0 16px 40px rgba(0,0,0,0.7)",
          animation: "pop 0.13s ease",
        }}>
          <MenuItem emoji="🟢" label="Google Calendar" hint="Opens in browser" onClick={doGoogle} />
          <MenuItem emoji="🍎" label="Apple Calendar"  hint="Downloads .ics → open to add" onClick={doICS} />
          <MenuItem emoji="🔵" label="Outlook / Other" hint="Downloads .ics file" onClick={doICS} last />
        </div>
      )}
    </div>
  );
}

function MenuItem({ emoji, label, hint, onClick, last }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: "100%", textAlign: "left", cursor: "pointer", fontFamily: "inherit",
        background: hover ? "rgba(255,255,255,0.07)" : "transparent",
        border: "none",
        borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.05)",
        padding: "11px 14px", display: "flex", alignItems: "center", gap: 10,
        transition: "background 0.12s",
      }}>
      <span style={{ fontSize: 20 }}>{emoji}</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{label}</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{hint}</div>
      </div>
    </button>
  );
}

/* ─── Helpers ───────────────────────────────────────────────────────── */
const MO = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DA = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const fmtDate = (s) => { const [y,m,d]=s.split("-").map(Number); return `${DA[new Date(y,m-1,d).getDay()]}, ${d} ${MO[m]}`; };
const monthLabel = (k) => { const [y,m]=k.split("-"); return `${MO[+m]} ${y}`; };

/* ─── TeamChip ──────────────────────────────────────────────────────── */
function TeamChip({ code }) {
  const t = TEAM_META[code];
  if (!t) return <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 700 }}>{code}</span>;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <div style={{
        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
        background: `linear-gradient(135deg,${t.color}ee,${t.color}77)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 900, color: "#fff",
        boxShadow: `0 0 0 2px ${t.color}44`,
      }}>{code.slice(0,2)}</div>
      <div>
        <div style={{ fontWeight: 800, fontSize: 13, color: "#fff", lineHeight: 1.1 }}>{code}</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{t.name.split(" ").slice(-1)[0]}</div>
      </div>
    </div>
  );
}

/* ─── MatchCard ─────────────────────────────────────────────────────── */
function MatchCard({ match, added, onAdd }) {
  const isPlayoff = !!match.label;
  const isFinal   = match.label?.includes("FINAL");
  return (
    <div
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 30px rgba(0,0,0,0.5)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}
      style={{
        background: isFinal?"linear-gradient(135deg,#1c0d00,#2d1500)":isPlayoff?"linear-gradient(135deg,#0d0d1a,#1a1a2e)":"rgba(255,255,255,0.035)",
        border: isFinal?"1.5px solid #d4af37":isPlayoff?"1.5px solid rgba(160,130,255,0.3)":"1px solid rgba(255,255,255,0.07)",
        borderRadius:14, padding:"14px 16px",
        display:"flex", flexDirection:"column", gap:10,
        position:"relative", overflow:"visible",
        transition:"transform 0.15s, box-shadow 0.15s",
      }}>
      {/* Left accent stripe */}
      {!isPlayoff&&<div style={{position:"absolute",left:0,top:0,bottom:0,width:3,borderRadius:"14px 0 0 14px",background:`linear-gradient(180deg,${TEAM_META[match.home]?.color||"#fff"},${TEAM_META[match.away]?.color||"#fff"})`}}/>}
      {isFinal&&<div style={{position:"absolute",left:0,top:0,bottom:0,width:3,borderRadius:"14px 0 0 14px",background:"linear-gradient(180deg,#d4af37,#f59e0b,#d4af37)"}}/>}
      {/* Badge */}
      <div style={{position:"absolute",top:11,right:13,fontSize:10,color:"rgba(255,255,255,0.18)",fontFamily:"monospace"}}>{isPlayoff?(isFinal?"🏆":"🎯"):`#${match.id}`}</div>

      {/* Date + time */}
      <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
        <span style={{fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:isFinal?"#d4af37":isPlayoff?"#a78bfa":"rgba(255,255,255,0.38)"}}>
          {isPlayoff?`${match.label} · `:""}{fmtDate(match.date)}
        </span>
        <span style={{fontSize:10,background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.45)",borderRadius:20,padding:"2px 8px",fontWeight:600}}>
          {match.time} IST
        </span>
      </div>

      {/* Teams */}
      {isPlayoff
        ? <div style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.45)"}}>{isFinal?"🏆 Grand Final — Teams TBD after playoffs":"Teams TBD"}</div>
        : <div style={{display:"flex",alignItems:"center",gap:10}}><TeamChip code={match.home}/><span style={{color:"rgba(255,255,255,0.22)",fontSize:11,fontStyle:"italic",flexShrink:0}}>vs</span><TeamChip code={match.away}/></div>
      }

      {/* Venue */}
      {match.venue!=="TBD"&&<div style={{fontSize:11,color:"rgba(255,255,255,0.28)",display:"flex",gap:5,alignItems:"flex-start"}}><span style={{flexShrink:0}}>📍</span><span style={{lineHeight:1.4}}>{match.venue}</span></div>}

      <CalendarPicker match={match} added={added} onAdd={onAdd} />
    </div>
  );
}

/* ─── App ───────────────────────────────────────────────────────────── */
export default function App() {
  const [filterTeam,setFilterTeam] = useState("ALL");
  const [search,setSearch]         = useState("");
  const [added,setAdded]           = useState({});
  const [allDone,setAllDone]       = useState(false);
  const [banner,setBanner]         = useState(true);

  const filtered = useMemo(()=>MATCHES.filter(m=>{
    if(m.label) return filterTeam==="ALL";
    const tOk = filterTeam==="ALL"||m.home===filterTeam||m.away===filterTeam;
    const q   = search.toLowerCase();
    const sOk = !q||[m.home,m.away,TEAM_META[m.home]?.name||"",TEAM_META[m.away]?.name||"",m.venue].some(s=>s.toLowerCase().includes(q));
    return tOk&&sOk;
  }),[filterTeam,search]);

  const grouped = useMemo(()=>{
    const g={};
    filtered.forEach(m=>{const k=m.date.slice(0,7);(g[k]=g[k]||[]).push(m);});
    return g;
  },[filtered]);

  const markAdded = (id) => setAdded(p=>({...p,[id]:true}));

  const handleExportAll = () => {
    downloadICS("ipl2026-schedule.ics", filtered.map(buildVEVENT));
    const ids={};filtered.forEach(m=>ids[m.id]=true);
    setAdded(p=>({...p,...ids}));
    setAllDone(true); setTimeout(()=>setAllDone(false),3500);
  };

  return (
    <div style={{minHeight:"100vh",background:"#080c14",paddingBottom:60}}>

      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#0b1f0b,#081420 50%,#150808)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"36px 20px 28px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(ellipse at 50% 80%,#22c55e18,transparent 60%)"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"inline-block",fontSize:11,letterSpacing:4,textTransform:"uppercase",color:"#f59e0b",fontWeight:700,marginBottom:10,border:"1px solid #f59e0b44",borderRadius:20,padding:"4px 14px"}}>TATA IPL 2026 · Season 19</div>
          <h1 style={{fontSize:"clamp(26px,6vw,40px)",fontWeight:900,letterSpacing:-1,marginTop:8,lineHeight:1}}>🏏 IPL 2026 Schedule</h1>
          <p style={{marginTop:10,fontSize:13,color:"rgba(255,255,255,0.4)"}}>28 March – 31 May · 10 Teams · 74 Matches</p>
        </div>
      </div>

      {/* Info banner */}
      {banner&&(
        <div style={{maxWidth:760,margin:"14px auto 0",padding:"0 16px"}}>
          <div style={{background:"rgba(59,130,246,0.1)",border:"1px solid rgba(59,130,246,0.25)",borderRadius:10,padding:"10px 14px",display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{fontSize:18,flexShrink:0}}>💡</span>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:700,color:"#93c5fd",marginBottom:4}}>How calendar adding works</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.45)",lineHeight:1.65}}>
                <b style={{color:"rgba(255,255,255,0.65)"}}>Android:</b> Tap "Add to Calendar" → opens Google Calendar directly in browser.<br/>
                <b style={{color:"rgba(255,255,255,0.65)"}}>iPhone:</b> Tap "Add to Calendar" → downloads .ics → tap the file → opens Apple Calendar.<br/>
                <b style={{color:"rgba(255,255,255,0.65)"}}>Desktop:</b> Use the <b>▼</b> dropdown to choose Google, Apple, or Outlook.
              </div>
            </div>
            <button onClick={()=>setBanner(false)} style={{background:"none",border:"none",color:"rgba(255,255,255,0.3)",fontSize:16,cursor:"pointer",padding:0,flexShrink:0,fontFamily:"inherit"}}>✕</button>
          </div>
        </div>
      )}

      {/* Controls */}
      <div style={{padding:"16px 16px 0",maxWidth:760,margin:"0 auto"}}>
        <div style={{position:"relative",marginBottom:12}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search team or venue…"
            style={{width:"100%",padding:"11px 16px 11px 38px",borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#fff",fontSize:13,outline:"none"}}/>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:14,opacity:0.4}}>🔍</span>
        </div>

        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
          {["ALL",...Object.keys(TEAM_META)].map(code=>{
            const active=filterTeam===code;
            const t=TEAM_META[code];
            return <button key={code} onClick={()=>setFilterTeam(active&&code!=="ALL"?"ALL":code)} style={{padding:"5px 13px",borderRadius:20,fontSize:11,fontWeight:700,border:active?`2px solid ${t?.color||"#f59e0b"}`:"1px solid rgba(255,255,255,0.12)",background:active?`${t?.color||"#f59e0b"}28`:"transparent",color:active?(t?.color||"#f59e0b"):"rgba(255,255,255,0.45)",cursor:"pointer",transition:"all 0.15s",fontFamily:"inherit"}}>{code}</button>;
          })}
        </div>

        <button onClick={handleExportAll} style={{width:"100%",padding:13,borderRadius:11,marginBottom:24,background:allDone?"linear-gradient(135deg,#052e16,#14532d)":"linear-gradient(135deg,#065f46,#047857)",border:allDone?"1px solid #4ade80":"1px solid #059669",color:allDone?"#4ade80":"#fff",fontSize:14,fontWeight:700,cursor:"pointer",letterSpacing:0.4,display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all 0.25s",fontFamily:"inherit"}}>
          {allDone?`✅ Exported! Open the .ics file to import all matches`:`📅 Export All ${filtered.length} Matches (.ics)`}
        </button>
      </div>

      {/* Match list */}
      <div style={{padding:"0 16px",maxWidth:760,margin:"0 auto"}}>
        {Object.entries(grouped).map(([key,matches])=>(
          <div key={key} style={{marginBottom:30}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
              <span style={{fontSize:11,letterSpacing:3,textTransform:"uppercase",fontWeight:700,color:"#f59e0b",flexShrink:0}}>{monthLabel(key)}</span>
              <div style={{flex:1,height:1,background:"rgba(245,158,11,0.18)"}}/>
              <span style={{fontSize:10,color:"rgba(255,255,255,0.2)",flexShrink:0}}>{matches.length} {matches.length===1?"match":"matches"}</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {matches.map(m=><MatchCard key={m.id} match={m} added={!!added[m.id]} onAdd={markAdded}/>)}
            </div>
          </div>
        ))}
        {filtered.length===0&&<div style={{textAlign:"center",padding:"60px 20px",color:"rgba(255,255,255,0.25)",fontSize:14}}>🏏 No matches found.</div>}
      </div>

      <div style={{textAlign:"center",padding:"32px 20px 0",fontSize:11,color:"rgba(255,255,255,0.18)",letterSpacing:0.5,lineHeight:1.8}}>
        All times in IST · Schedule subject to change per BCCI<br/>Playoff venues TBD · Built with ❤️ for cricket fans
      </div>

      <style>{`
        @keyframes pop { from { opacity:0; transform:translateY(-5px) scale(0.97) } to { opacity:1; transform:none } }
        input::placeholder { color:rgba(255,255,255,0.25); }
        *{-webkit-tap-highlight-color:transparent;}
      `}</style>
    </div>
  );
}
