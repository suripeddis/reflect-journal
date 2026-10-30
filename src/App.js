import { useState } from "react";

const moods = ["calm", "anxious", "grateful", "tired", "hopeful", "proud"];

const sampleEntries = [
  { date: "Apr 12 · 9:41 pm", group: "week", mood: "grateful", sentiment: "positive", preview: "Had a really productive session today. Finally got the Lambda function working after debugging for two hours — felt so good when it clicked.", summary: "Reflective and productive mood, focus on problem-solving and persistence." },
  { date: "Apr 11 · 11:02 pm", group: "week", mood: "anxious", sentiment: "negative", preview: "Feeling overwhelmed with everything on my plate. The internship, school, research — it's a lot all at once.", summary: "Stress and capacity concerns, multiple competing priorities." },
  { date: "Apr 10 · 8:15 pm", group: "week", mood: "hopeful", sentiment: "positive", preview: "Started the AWS project today. It's intimidating but exciting.", summary: "Anticipation and growth mindset, motivated by new challenge." },
  { date: "Apr 5 · 10:30 pm", group: "last", mood: "calm", sentiment: "neutral", preview: "Quiet day. Worked through some LeetCode problems.", summary: "Steady focus, mild uncertainty around specific technical concepts." },
];

const groups = [
  { id: "week", label: "this week" },
  { id: "last", label: "last week" },
];

const sentimentStyle = (s) => ({
  positive: { background: "#D8EDD8", color: "#2D5A2D" },
  negative: { background: "#F0DDD8", color: "#7A2A20" },
  neutral:  { background: "#E8E0D4", color: "#6B5040" },
}[s]);

export default function App() {
  const [tab, setTab] = useState("write");
  const [entryText, setEntryText] = useState("");
  const [mood, setMood] = useState(null);
  const [saved, setSaved] = useState(false);
  const [openGroups, setOpenGroups] = useState({ week: true });

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  const wordCount = entryText.trim().split(/\s+/).filter(Boolean).length;

  const handleSave = () => {
    if (!entryText.trim()) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Lato:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #E8DDD0; font-family: 'Lato', sans-serif; }
      `}</style>

      <div style={{ background: "#E8DDD0", minHeight: "100vh", paddingBottom: 60 }}>

        {/* topbar */}
        <div style={{ background: "#DDD0C0", borderBottom: "1px solid #BFB09A", padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#3D2E1E" }}>
            HuskiesReflect
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["write", "entries", "insights"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                fontSize: 12, padding: "5px 18px", borderRadius: 20,
                border: "1px solid #BFB09A", cursor: "pointer",
                background: tab === t ? "#9B7D5A" : "transparent",
                color: tab === t ? "#FAF6EE" : "#7A6048",
              }}>{t}</button>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#9B7D5A", fontStyle: "italic" }}>{today}</div>
        </div>

        <div style={{ maxWidth: 740, margin: "40px auto 0", padding: "0 20px" }}>

          {/* write tab */}
          {tab === "write" && (
            <div style={{ display: "flex", position: "relative" }}>
              <div style={{ position: "absolute", top: 5, left: 47, right: -5, bottom: -5, background: "#C0B8A8", borderRadius: "0 6px 6px 0" }} />
              <div style={{ position: "absolute", top: 3, left: 47, right: -3, bottom: -3, background: "#D0C8B8", borderRadius: "0 6px 6px 0" }} />

              {/* spine */}
              <div style={{ width: 48, background: "#C8B49A", borderRadius: "6px 0 0 6px", border: "1px solid #B0A08A", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 0", gap: 20, flexShrink: 0, position: "relative", zIndex: 2 }}>
                {[...Array(9)].map((_, i) => (
                  <div key={i} style={{ width: 22, height: 22, borderRadius: "50%", border: "3px solid #7A6A54", background: "#E8DDD0", position: "relative", zIndex: 3 }}>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 8, height: 8, borderRadius: "50%", background: "#7A6A54" }} />
                  </div>
                ))}
              </div>

              {/* page */}
              <div style={{ flex: 1, background: "#FAF6EE", border: "1px solid #D0C4B0", borderLeft: "none", borderRadius: "0 6px 6px 0", padding: "28px 36px", position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, paddingBottom: 14, borderBottom: "2px solid #C8B49A" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#3D2E1E" }}>today's entry</div>
                  <div style={{ fontSize: 12, color: "#9B7D5A", fontStyle: "italic" }}>{today}</div>
                </div>

                <div style={{ fontSize: 11, color: "#9B7D5A", marginBottom: 8, letterSpacing: "0.06em" }}>how are you feeling?</div>
                <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
                  {moods.map(m => (
                    <button key={m} onClick={() => setMood(m)} style={{
                      fontSize: 11, padding: "4px 12px", borderRadius: 14,
                      border: "1px solid #C8B49A", cursor: "pointer",
                      background: mood === m ? "#9B7D5A" : "#F0E8DC",
                      color: mood === m ? "#FAF6EE" : "#7A6048",
                    }}>{m}</button>
                  ))}
                </div>

                <textarea
                  value={entryText}
                  onChange={e => setEntryText(e.target.value)}
                  placeholder="what's on your mind today..."
                  style={{
                    width: "100%", border: "none", background: "transparent",
                    resize: "none", fontSize: 18, color: "#3D2E1E",
                    fontFamily: "'Caveat', cursive", lineHeight: "32px",
                    outline: "none", minHeight: 256, padding: "4px 0",
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #E4D8C8 31px, #E4D8C8 32px)",
                    backgroundAttachment: "local",
                  }}
                />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, paddingTop: 14, borderTop: "1px solid #E4D8C8" }}>
                  <div style={{ fontSize: 11, color: "#B0A090", fontStyle: "italic" }}>
                    {wordCount === 0 ? "start writing..." : `${wordCount} word${wordCount === 1 ? "" : "s"}`}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    {saved && <span style={{ fontSize: 12, color: "#6B8C5A", fontStyle: "italic" }}>entry saved!</span>}
                    <button onClick={handleSave} style={{
                      fontSize: 13, padding: "8px 24px", borderRadius: 20,
                      border: "1px solid #9B7D5A", background: "#9B7D5A",
                      color: "#FAF6EE", cursor: "pointer",
                      fontFamily: "'Playfair Display', serif",
                    }}>save entry</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* entries tab */}
          {tab === "entries" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 28 }}>
                {[["24", "total entries"], ["18", "positive days"], ["12", "day streak"]].map(([val, lbl]) => (
                  <div key={lbl} style={{ background: "#F0E8DC", borderRadius: 8, padding: "14px 16px", border: "1px solid #D0C4B0" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#3D2E1E" }}>{val}</div>
                    <div style={{ fontSize: 11, color: "#9B7D5A", marginTop: 2 }}>{lbl}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 11, color: "#9B7D5A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>past entries</div>

              {groups.map(g => {
                const gEntries = sampleEntries.filter(e => e.group === g.id);
                const isOpen = openGroups[g.id];
                return (
                  <div key={g.id} style={{ marginBottom: 12 }}>
                    <div onClick={() => setOpenGroups(p => ({ ...p, [g.id]: !p[g.id] }))} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 18px", background: "#F0E8DC", borderRadius: 8, border: "1px solid #D0C4B0", cursor: "pointer", marginBottom: 2 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: "#3D2E1E" }}>{g.label}</span>
                        <span style={{ fontSize: 11, color: "#9B7D5A", background: "#DDD0C0", padding: "2px 8px", borderRadius: 10 }}>{gEntries.length} entries</span>
                      </div>
                      <span style={{ fontSize: 10, color: "#9B7D5A", transition: "transform 0.2s", display: "inline-block", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                    </div>
                    {isOpen && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "8px 0 4px" }}>
                        {gEntries.map((entry, i) => (
                          <div key={i} style={{ background: "#FAF6EE", border: "1px solid #D0C4B0", borderLeft: "3px solid #C8B49A", borderRadius: "0 8px 8px 0", padding: "14px 16px", cursor: "pointer" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                              <span style={{ fontSize: 11, color: "#B0A090", fontStyle: "italic" }}>{entry.date}</span>
                              <div style={{ display: "flex", gap: 5 }}>
                                <span style={{ fontSize: 10, padding: "2px 9px", borderRadius: 10, ...sentimentStyle(entry.sentiment) }}>{entry.sentiment}</span>
                                <span style={{ fontSize: 10, padding: "2px 9px", borderRadius: 10, background: "#E8E0D4", color: "#6B5040" }}>{entry.mood}</span>
                              </div>
                            </div>
                            <div style={{ fontSize: 14, color: "#5A4430", fontFamily: "'Caveat', cursive", lineHeight: 1.6 }}>{entry.preview}</div>
                            <div style={{ fontSize: 11, color: "#9B7D5A", marginTop: 7, paddingTop: 7, borderTop: "1px dashed #DDD0C0", fontStyle: "italic" }}>{entry.summary}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* insights tab */}
          {tab === "insights" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 28 }}>
                {[["74%", "positive sentiment"], ["5.2", "avg entries/week"], ["calm", "most common mood"]].map(([val, lbl]) => (
                  <div key={lbl} style={{ background: "#F0E8DC", borderRadius: 8, padding: "14px 16px", border: "1px solid #D0C4B0" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#3D2E1E" }}>{val}</div>
                    <div style={{ fontSize: 11, color: "#9B7D5A", marginTop: 2 }}>{lbl}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 11, color: "#9B7D5A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>weekly reflection</div>
              <div style={{ background: "#FAF6EE", border: "1px solid #D0C4B0", borderRadius: 8, padding: "18px 20px", marginBottom: 20 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: "#3D2E1E", marginBottom: 8 }}>week of april 7–13</div>
                <div style={{ fontSize: 14, color: "#5A4430", fontFamily: "'Caveat', cursive", lineHeight: 1.7, fontSize: 16 }}>
                  This week you wrote about technical growth and occasional overwhelm. A recurring theme is persistence through frustration — you mentioned "it finally clicked" twice. Your most energized entries were written late at night after solving a hard problem.
                </div>
              </div>

              <div style={{ fontSize: 11, color: "#9B7D5A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>recurring themes</div>
              <div style={{ background: "#FAF6EE", border: "1px solid #D0C4B0", borderRadius: 8, padding: "18px 20px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[["problem solving", "positive"], ["self doubt", "neutral"], ["persistence", "positive"], ["overwhelm", "neutral"], ["growth", "positive"], ["late nights", "neutral"], ["gratitude", "positive"]].map(([theme, s]) => (
                    <span key={theme} style={{ fontSize: 12, padding: "5px 14px", borderRadius: 10, ...sentimentStyle(s) }}>{theme}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}