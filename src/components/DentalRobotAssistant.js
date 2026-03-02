import { useEffect, useState, useRef } from "react";
const messages = [
    "Hello! I'm D3, your AI dental assistant. Ready to help!",
    "Time for your smile check-up! I'm here for you.",
    "Advanced diagnostics at your service, 24/7.",
    "Let's keep your smile healthy and bright!",
    "Booking your appointment is just one click away.",
    "ADA Accredited · 15,000+ Happy Patients served!"
];
const DentalRobotAssistant = () => {

  const [msgIdx, setMsgIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [blinking, setBlinking] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [mouthLevel, setMouthLevel] = useState([3,5,7,5,3,2,4]);
  const [pulseData, setPulseData] = useState(0);

  useEffect(() => {
    let i = 0;
    setTypedText("");
    setIsTyping(true);
    const typing = setInterval(() => {
      i++;
      setTypedText(messages[msgIdx].slice(0, i));
      if (i >= messages[msgIdx].length) {
        clearInterval(typing);
        setIsTyping(false);
      }
    }, 36);
    return () => clearInterval(typing);
  }, [msgIdx]);

  useEffect(() => {
    const interval = setInterval(() => setMsgIdx(p => (p + 1) % messages.length), 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blinkLoop = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 160);
    }, 3200 + Math.random() * 2000);
    return () => clearInterval(blinkLoop);
  }, []);

  useEffect(() => {
    const scanLoop = setInterval(() => {
      setScanning(true);
      setTimeout(() => setScanning(false), 1800);
    }, 6000);
    return () => clearInterval(scanLoop);
  }, []);

  useEffect(() => {
    const mouthAnim = setInterval(() => {
      setMouthLevel([
        Math.floor(Math.random() * 8) + 2,
        Math.floor(Math.random() * 10) + 3,
        Math.floor(Math.random() * 12) + 4,
        Math.floor(Math.random() * 10) + 3,
        Math.floor(Math.random() * 8) + 2,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 9) + 3,
      ]);
    }, 120);
    return () => clearInterval(mouthAnim);
  }, []);

  useEffect(() => {
    let t = 0;
    const pulse = setInterval(() => {
      t += 0.08;
      setPulseData(t);
    }, 50);
    return () => clearInterval(pulse);
  }, []);

  const generateHeartbeat = (t) => {
    const pts = [];
    for (let x = 0; x <= 400; x += 4) {
      const phase = (x / 400) * 6 + t;
      let y = 20;
      const local = phase % (Math.PI * 2);
      if (local > 1.2 && local < 1.5) y = 20 - 28;
      else if (local > 1.5 && local < 1.7) y = 20 + 16;
      else if (local > 1.7 && local < 1.9) y = 20 - 10;
      else if (local > 1.9 && local < 2.1) y = 20;
      else y = 20 + Math.sin(phase * 0.8) * 2;
      pts.push(`${x},${y}`);
    }
    return pts.join(" ");
  };

  return (
    <>
      <div style={styles.page}>
        {/* Background grid */}
        <div style={styles.grid} />

        {/* Ambient glow blobs */}
        <div style={styles.blob1} />
        <div style={styles.blob2} />

        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <span style={styles.headerDot} />
            <span style={styles.headerDot2} />
            <span style={styles.headerDot3} />
            <span style={styles.headerTitle}>D3 · DENTAL AI SYSTEM v2.4</span>
          </div>

          {/* Robot Scene */}
          <div style={styles.scene}>

            {/* Orbit rings */}
            <div style={styles.orbitOuter}>
              <div style={{...styles.orbitRing, ...styles.orbitRing1}}>
                <div style={styles.orbitDot} />
              </div>
              <div style={{...styles.orbitRing, ...styles.orbitRing2}}>
                <div style={{...styles.orbitDot, background:"#00d4ff"}} />
              </div>
            </div>

            {/* Robot body */}
            <div style={styles.robotWrap}>
              {/* Scan beam */}
              {scanning && <div style={styles.scanBeam} />}

              {/* Antenna */}
              <div style={styles.antennaBase}>
                <div style={styles.antennaStick} />
                <div style={styles.antennaBall} />
              </div>

              {/* HEAD */}
              <div style={styles.head}>
                {/* Ear ports */}
                <div style={{...styles.ear, left:-14}}>
                  <div style={styles.earInner} />
                </div>
                <div style={{...styles.ear, right:-14}}>
                  <div style={styles.earInner} />
                </div>

                {/* Medical cross */}
                <div style={styles.crossBadge}>✚</div>

                {/* VISOR */}
                <div style={styles.visor}>
                  {/* Scan line inside visor */}
                  {scanning && <div style={styles.visorScan} />}

                  {/* Eyes */}
                  <div style={styles.eyeRow}>
                    <div style={styles.eyeOuter}>
                      <div style={{
                        ...styles.eyeInner,
                        transform: blinking ? "scaleY(0.05)" : "scaleY(1)",
                        transition: "transform 0.07s"
                      }}>
                        <div style={styles.pupil} />
                        <div style={styles.eyeGlow} />
                      </div>
                    </div>
                    <div style={styles.eyeOuter}>
                      <div style={{
                        ...styles.eyeInner,
                        transform: blinking ? "scaleY(0.05)" : "scaleY(1)",
                        transition: "transform 0.07s"
                      }}>
                        <div style={styles.pupil} />
                        <div style={styles.eyeGlow} />
                      </div>
                    </div>
                  </div>

                  {/* Mouth bars */}
                  <div style={styles.mouthRow}>
                    {mouthLevel.map((h, i) => (
                      <div key={i} style={{
                        ...styles.mouthBar,
                        height: `${h}px`,
                        background: i === 3 ? "#1a9e50" : i % 2 === 0 ? "#2db865" : "#157a3c",
                        transition: "height 0.1s ease",
                        boxShadow: `0 0 ${h/2}px #4abe6a88`
                      }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* NECK */}
              <div style={styles.neck}>
                {[0,1,2].map(i => <div key={i} style={styles.neckRing} />)}
              </div>

              {/* BODY */}
              <div style={styles.body}>
                {/* Left arm */}
                <div style={{...styles.arm, left:-48}}>
                  <div style={styles.shoulder} />
                  <div style={styles.forearm} />
                  <div style={styles.hand}>
                    <div style={styles.finger} />
                    <div style={styles.finger} />
                    <div style={styles.finger} />
                  </div>
                </div>

                {/* Right arm - with tool */}
                <div style={{...styles.arm, right:-48}}>
                  <div style={styles.shoulder} />
                  <div style={styles.forearm} />
                  <div style={{...styles.hand, background:"#d4f0e0"}}>
                    <span style={styles.toolEmoji}>🔬</span>
                  </div>
                </div>

                {/* Chest panel */}
                <div style={styles.chestPanel}>
                  {/* Heartbeat */}
                  <svg viewBox="0 0 400 40" style={styles.heartbeatSvg} preserveAspectRatio="none">
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="blur"/>
                        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                    </defs>
                    <polyline
                      points={generateHeartbeat(pulseData)}
                      stroke="#1a9e50"
                      strokeWidth="2.5"
                      fill="none"
                      filter="url(#glow)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Status dots */}
                  <div style={styles.statusRow}>
                    {["#1a9e50","#0abf7a","#f59e0b"].map((c,i) => (
                      <div key={i} style={{
                        ...styles.statusDot,
                        background: c,
                        boxShadow: `0 0 8px ${c}`,
                        animationDelay: `${i * 0.4}s`
                      }} />
                    ))}
                    <span style={styles.statusText}>SYSTEMS NOMINAL</span>
                  </div>
                </div>

                {/* Power button */}
                <div style={styles.powerBtn}>
                  <div style={styles.powerRing} />
                  <div style={styles.powerIcon}>⏻</div>
                </div>
              </div>

              {/* LEGS */}
              <div style={styles.legsRow}>
                {[0,1].map(i => (
                  <div key={i} style={styles.leg}>
                    <div style={styles.legInner} />
                    <div style={styles.foot} />
                  </div>
                ))}
              </div>

              {/* Shadow */}
              <div style={styles.shadow} />
            </div>

            {/* Robot label */}
            <div style={styles.robotLabel}>D3-CARE ASSISTANT · ONLINE</div>
          </div>

          {/* Speech bubble at bottom */}
          <div style={styles.bubbleWrap}>
            <div style={styles.bubble}>
              <div style={styles.bubbleIcon}>🦷</div>
              <p style={styles.bubbleText}>
                {typedText}
                {isTyping && <span style={styles.cursor} />}
              </p>
            </div>
          </div>

          {/* Footer status bar */}
          <div style={styles.footer}>
            <span style={styles.footerBadge}>● LIVE</span>
            <span style={styles.footerText}>ADA Accredited · Neural Diagnostics Active</span>
            <span style={styles.footerBadge2}>15,000+ Patients</span>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;500;700;900&family=Space+Mono:wght@400;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes shadowPulse {
          0%,100% { transform: scaleX(1); opacity: 0.5; }
          50% { transform: scaleX(0.7); opacity: 0.25; }
        }
        @keyframes orbitSpin1 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbitSpin2 {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 6px currentColor; }
          50% { box-shadow: 0 0 18px currentColor; }
        }
        @keyframes scanSlide {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes antennaPulse {
          0%,100% { box-shadow: 0 0 8px #4abe6a; transform: scale(1); }
          50% { box-shadow: 0 0 20px #4abe6a, 0 0 40px #4abe6a44; transform: scale(1.2); }
        }
        @keyframes statusDotPulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes blob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(40px,-30px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.95); }
        }
        @keyframes blob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(-30px,40px) scale(1.05); }
          66% { transform: translate(20px,-20px) scale(0.9); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .robot-float { animation: float 4s ease-in-out infinite; }
        .orbit-ring-1-anim { animation: orbitSpin1 12s linear infinite; }
        .orbit-ring-2-anim { animation: orbitSpin2 18s linear infinite; }
        .antenna-anim { animation: antennaPulse 2s ease-in-out infinite; }
        .status-dot-anim { animation: statusDotPulse 1.5s ease-in-out infinite; }
        .blink-anim { animation: blink 0.8s infinite; }
        .cursor-anim { animation: blink 0.7s infinite; }
      `}</style>

      {/* Apply JS-controlled animations */}
      <style>{`
        #robot-wrap { animation: float 4s ease-in-out infinite; }
        #shadow { animation: shadowPulse 4s ease-in-out infinite; }
        #orbit1 { animation: orbitSpin1 12s linear infinite; }
        #orbit2 { animation: orbitSpin2 18s linear infinite; }
        #antenna-ball { animation: antennaPulse 2s ease-in-out infinite; }
        .sdot { animation: statusDotPulse 1.5s ease-in-out infinite; }
        #scan-beam { animation: scanSlide 1.8s linear; }
        #visor-scan { animation: scanSlide 1.8s linear; }
        #blob1 { animation: blob1 10s ease-in-out infinite; }
        #blob2 { animation: blob2 14s ease-in-out infinite; }
        #cursor { animation: blink 0.7s infinite; }
      `}</style>
    </>
  );
};

const GREEN = "#1a9e50";
const DARKGREEN = "#157a3c";
const LIGHTGREEN = "#e8f7ee";
const CYAN = "#0abf7a";
const METAL = "#c8e6d4";
const METAL2 = "#a8d4bc";

const styles = {
  page: {
    minHeight: "100vh",
    background: `radial-gradient(ellipse at 40% 30%, #d4f0e0 0%, #edf8f2 40%, #f5fdf8 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Exo 2', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(26,158,80,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(26,158,80,0.06) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
    pointerEvents: "none",
  },
  blob1: {
    id: "blob1",
    position: "absolute",
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(26,158,80,0.1) 0%, transparent 70%)",
    top: "10%",
    left: "10%",
    animation: "blob1 10s ease-in-out infinite",
    pointerEvents: "none",
  },
  blob2: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(10,191,122,0.08) 0%, transparent 70%)",
    bottom: "10%",
    right: "10%",
    animation: "blob2 14s ease-in-out infinite",
    pointerEvents: "none",
  },
  card: {
    background: "linear-gradient(160deg, #ffffff 0%, #f0fbf4 100%)",
    border: "1px solid rgba(26,158,80,0.2)",
    borderRadius: 24,
    width: 480,
    padding: "0 0 0 0",
    boxShadow: "0 8px 60px rgba(26,158,80,0.12), 0 2px 20px rgba(26,158,80,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
    overflow: "hidden",
    position: "relative",
  },
  header: {
    background: "rgba(26,158,80,0.06)",
    borderBottom: "1px solid rgba(26,158,80,0.12)",
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  headerDot: {
    width: 10, height: 10, borderRadius: "50%",
    background: "#ff5f57", display: "inline-block"
  },
  headerDot2: {
    width: 10, height: 10, borderRadius: "50%",
    background: "#febc2e", display: "inline-block"
  },
  headerDot3: {
    width: 10, height: 10, borderRadius: "50%",
    background: "#28c840", display: "inline-block"
  },
  headerTitle: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 10,
    color: "#1a9e50",
    letterSpacing: 3,
    marginLeft: 8,
    opacity: 0.8,
  },
  scene: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 0 20px",
    position: "relative",
    gap: 12,
  },
  orbitOuter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
  },
  orbitRing: {
    position: "absolute",
    borderRadius: "50%",
    border: "1px solid",
  },
  orbitRing1: {
    width: 280, height: 280,
    top: -140, left: -140,
    borderColor: "rgba(26,158,80,0.12)",
    animation: "orbitSpin1 12s linear infinite",
  },
  orbitRing2: {
    width: 350, height: 350,
    top: -175, left: -175,
    borderColor: "rgba(10,191,122,0.08)",
    animation: "orbitSpin2 18s linear infinite",
  },
  orbitDot: {
    width: 8, height: 8,
    borderRadius: "50%",
    background: GREEN,
    position: "absolute",
    top: -4, left: "50%",
    boxShadow: `0 0 10px ${GREEN}`,
  },
  robotWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "float 4s ease-in-out infinite",
    position: "relative",
  },
  scanBeam: {
    position: "absolute",
    top: 0, left: -20, right: -20,
    height: 3,
    background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`,
    boxShadow: `0 0 20px ${GREEN}`,
    animation: "scanSlide 1.8s linear forwards",
    zIndex: 10,
    pointerEvents: "none",
  },
  antennaBase: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: -2,
  },
  antennaStick: {
    width: 4, height: 28,
    background: `linear-gradient(to top, ${METAL}, ${GREEN})`,
    borderRadius: 2,
  },
  antennaBall: {
    width: 14, height: 14,
    borderRadius: "50%",
    background: GREEN,
    boxShadow: `0 0 12px ${GREEN}, 0 0 24px ${GREEN}44`,
    animation: "antennaPulse 2s ease-in-out infinite",
    marginTop: -8,
  },
  head: {
    width: 140,
    height: 120,
    background: `linear-gradient(160deg, #e0f5ea 0%, #c8ecd6 50%, #b8e4ca 100%)`,
    borderRadius: "28px 28px 20px 20px",
    position: "relative",
    border: `1px solid rgba(26,158,80,0.25)`,
    boxShadow: `0 4px 24px rgba(26,158,80,0.12), inset 0 1px 0 rgba(255,255,255,0.8)`,
  },
  ear: {
    position: "absolute",
    top: 28,
    width: 18, height: 40,
    background: `linear-gradient(180deg, #d0eedc, #b8e0c8)`,
    borderRadius: 6,
    border: `1px solid rgba(26,158,80,0.2)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  earInner: {
    width: 6, height: 24,
    background: GREEN,
    borderRadius: 3,
    opacity: 0.5,
    boxShadow: `0 0 6px ${GREEN}`,
  },
  crossBadge: {
    position: "absolute",
    top: 8, right: 12,
    color: "#ff4444",
    fontSize: 14,
    fontWeight: 900,
    textShadow: "0 0 8px #ff4444",
  },
  visor: {
    position: "absolute",
    top: 22, left: 14, right: 14, bottom: 14,
    background: "linear-gradient(160deg, #e8faf0 0%, #d4f0e2 100%)",
    borderRadius: 14,
    border: `1px solid rgba(26,158,80,0.2)`,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    boxShadow: `inset 0 0 20px rgba(26,158,80,0.08)`,
  },
  visorScan: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: 2,
    background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`,
    boxShadow: `0 0 10px ${GREEN}`,
    animation: "scanSlide 1.8s linear forwards",
    zIndex: 10,
  },
  eyeRow: {
    display: "flex",
    gap: 16,
  },
  eyeOuter: {
    width: 32, height: 32,
    borderRadius: "50%",
    background: "rgba(74,190,106,0.1)",
    border: `1px solid rgba(74,190,106,0.3)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0 0 12px rgba(74,190,106,0.2)`,
  },
  eyeInner: {
    width: 22, height: 22,
    borderRadius: "50%",
    background: `radial-gradient(circle at 35% 35%, #90ffb0, ${GREEN} 50%, ${DARKGREEN})`,
    boxShadow: `0 0 12px ${GREEN}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  pupil: {
    width: 8, height: 8,
    borderRadius: "50%",
    background: "#000d05",
    position: "absolute",
  },
  eyeGlow: {
    width: 4, height: 4,
    borderRadius: "50%",
    background: "white",
    position: "absolute",
    top: 4, left: 5,
    opacity: 0.8,
  },
  mouthRow: {
    display: "flex",
    gap: 3,
    alignItems: "flex-end",
    height: 16,
    padding: "0 6px",
  },
  mouthBar: {
    width: 5,
    borderRadius: 2,
    minHeight: 3,
  },
  neck: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    marginTop: -1,
  },
  neckRing: {
    width: 36, height: 7,
    background: `linear-gradient(90deg, #b8e0c8, #d4f0e0, #b8e0c8)`,
    borderRadius: 4,
    border: `1px solid rgba(26,158,80,0.15)`,
  },
  body: {
    width: 150,
    height: 160,
    background: `linear-gradient(160deg, #e0f5ea 0%, #c8ecd6 60%, #b8e4ca 100%)`,
    borderRadius: "16px 16px 22px 22px",
    position: "relative",
    border: `1px solid rgba(26,158,80,0.2)`,
    boxShadow: `0 4px 24px rgba(26,158,80,0.1), inset 0 1px 0 rgba(255,255,255,0.7)`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    gap: 8,
  },
  arm: {
    position: "absolute",
    top: 14,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  shoulder: {
    width: 22, height: 22,
    borderRadius: "50%",
    background: `radial-gradient(circle, #d4f0e0, #b8e0c8)`,
    border: `1px solid rgba(26,158,80,0.2)`,
  },
  forearm: {
    width: 14, height: 50,
    background: `linear-gradient(180deg, #d0eedc, #b8e0c8)`,
    borderRadius: 6,
    border: `1px solid rgba(26,158,80,0.15)`,
  },
  hand: {
    width: 28, height: 28,
    borderRadius: 8,
    background: `linear-gradient(135deg, #c8ecd6, #a8d4bc)`,
    border: `1px solid rgba(26,158,80,0.2)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    overflow: "hidden",
  },
  finger: {
    width: 4, height: 14,
    borderRadius: 2,
    background: GREEN,
    opacity: 0.5,
  },
  toolEmoji: { fontSize: 14 },
  chestPanel: {
    width: "100%",
    background: "rgba(255,255,255,0.6)",
    borderRadius: 10,
    border: `1px solid rgba(26,158,80,0.2)`,
    padding: "8px 10px",
    gap: 6,
    display: "flex",
    flexDirection: "column",
    backdropFilter: "blur(4px)",
  },
  heartbeatSvg: {
    width: "100%",
    height: 32,
  },
  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 6, height: 6,
    borderRadius: "50%",
    animation: "statusDotPulse 1.5s ease-in-out infinite",
  },
  statusText: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 7,
    color: DARKGREEN,
    letterSpacing: 1,
    opacity: 0.8,
    marginLeft: 2,
  },
  powerBtn: {
    width: 28, height: 28,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.7)",
    border: `2px solid ${GREEN}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0 0 12px ${GREEN}33`,
    cursor: "pointer",
    position: "absolute",
    bottom: 12,
    right: 14,
  },
  powerRing: {
    position: "absolute",
    inset: -4,
    borderRadius: "50%",
    border: `1px solid ${GREEN}44`,
    animation: "antennaPulse 3s ease-in-out infinite",
  },
  powerIcon: { fontSize: 12, color: GREEN },
  legsRow: {
    display: "flex",
    gap: 16,
    marginTop: -4,
  },
  leg: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  legInner: {
    width: 28, height: 48,
    background: `linear-gradient(180deg, #d0eedc, #b8e0c8)`,
    borderRadius: "6px 6px 0 0",
    border: `1px solid rgba(26,158,80,0.15)`,
  },
  foot: {
    width: 36, height: 14,
    background: `linear-gradient(90deg, #c0e8d0, #a8d4bc)`,
    borderRadius: "4px 4px 8px 8px",
    border: `1px solid rgba(26,158,80,0.15)`,
    marginTop: -2,
  },
  shadow: {
    width: 130, height: 18,
    background: "radial-gradient(ellipse, rgba(26,158,80,0.15) 0%, transparent 70%)",
    borderRadius: "50%",
    marginTop: 6,
    animation: "shadowPulse 4s ease-in-out infinite",
  },
  robotLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 10,
    color: DARKGREEN,
    letterSpacing: 3,
    opacity: 0.6,
    marginTop: 6,
  },
  bubbleWrap: {
    padding: "0 24px 24px",
  },
  bubble: {
    background: "rgba(255,255,255,0.8)",
    border: "1px solid rgba(26,158,80,0.2)",
    borderRadius: 16,
    padding: "14px 18px",
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    boxShadow: "0 4px 20px rgba(26,158,80,0.08)",
    backdropFilter: "blur(8px)",
  },
  bubbleIcon: { fontSize: 20, flexShrink: 0, marginTop: 2 },
  bubbleText: {
    color: "#1a3d28",
    fontSize: 14,
    lineHeight: 1.6,
    fontWeight: 400,
    minHeight: 24,
    fontFamily: "'Exo 2', sans-serif",
  },
  cursor: {
    display: "inline-block",
    width: 2, height: 14,
    background: GREEN,
    marginLeft: 2,
    verticalAlign: "middle",
    animation: "blink 0.7s infinite",
  },
  footer: {
    borderTop: "1px solid rgba(26,158,80,0.1)",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "rgba(26,158,80,0.04)",
  },
  footerBadge: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 9,
    color: GREEN,
    letterSpacing: 1,
    animation: "blink 2s infinite",
  },
  footerBadge2: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 9,
    color: CYAN,
    letterSpacing: 1,
  },
  footerText: {
    fontFamily: "'Space Mono', monospace",
    fontSize: 9,
    color: "rgba(26,158,80,0.5)",
    letterSpacing: 1,
  },
};

export default DentalRobotAssistant;