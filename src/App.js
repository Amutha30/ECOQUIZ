import React, { useState, useEffect } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// Default export React component (single-file prototype)
export default function App() {
  const categories = [
    { id: "save-water", title: "Save Water", color: "#2f855a" },
    { id: "waste-seg", title: "Waste Segregation", color: "#276749" },
    { id: "air-pollution", title: "Air Pollution", color: "#285e61" },
    { id: "no-plastic", title: "Don't Use Plastic", color: "#1f6f5b" },
  ];

  // sample quiz data: each category has two questions
  const quizBank = {
    "save-water": [
      {
        id: 1,
        q: "Which action saves the most water at home?",
        options: [
          { id: "a", text: "Taking short showers", correct: true },
          { id: "b", text: "Keeping tap running while brushing", correct: false },
          { id: "c", text: "Washing car daily with hose", correct: false },
          { id: "d", text: "Watering plants during noon", correct: false },
        ],
      },
      {
        id: 2,
        q: "What is a good way to reuse water?",
        options: [
          { id: "a", text: "Throwing it away", correct: false },
          { id: "b", text: "Using greywater for gardening", correct: true },
          { id: "c", text: "Mixing with chemicals", correct: false },
          { id: "d", text: "Boiling it again", correct: false },
        ],
      },
    ],

    "waste-seg": [
      {
        id: 1,
        q: "Where should a banana peel go?",
        options: [
          { id: "a", text: "Dry Waste", correct: false },
          { id: "b", text: "Wet Waste", correct: true },
          { id: "c", text: "Recyclable", correct: false },
          { id: "d", text: "Hazardous", correct: false },
        ],
      },
      {
        id: 2,
        q: "Which of these is recyclable?",
        options: [
          { id: "a", text: "Glass bottle", correct: true },
          { id: "b", text: "Food scraps", correct: false },
          { id: "c", text: "Used tissue", correct: false },
          { id: "d", text: "Ceramic plate", correct: false },
        ],
      },
    ],

    "air-pollution": [
      {
        id: 1,
        q: "Which action reduces air pollution?",
        options: [
          { id: "a", text: "Using public transport", correct: true },
          { id: "b", text: "Burning leaves", correct: false },
          { id: "c", text: "Idling car engines", correct: false },
          { id: "d", text: "Using more plastics", correct: false },
        ],
      },
      {
        id: 2,
        q: "Green cover helps air quality by...",
        options: [
          { id: "a", text: "Absorbing CO2", correct: true },
          { id: "b", text: "Increasing smoke", correct: false },
          { id: "c", text: "Producing plastic", correct: false },
          { id: "d", text: "Blocking sunlight entirely", correct: false },
        ],
      },
    ],

    "no-plastic": [
      {
        id: 1,
        q: "A simple alternative to single-use plastic bag is:",
        options: [
          { id: "a", text: "Cloth bag", correct: true },
          { id: "b", text: "More plastic bags", correct: false },
          { id: "c", text: "Leaving items loose", correct: false },
          { id: "d", text: "Paper cup for every use", correct: false },
        ],
      },
      {
        id: 2,
        q: "Which plastic causes major ocean harm?",
        options: [
          { id: "a", text: "Microplastics", correct: true },
          { id: "b", text: "Glass", correct: false },
          { id: "c", text: "Wood", correct: false },
          { id: "d", text: "Metal", correct: false },
        ],
      },
    ],
  };

  // state: current screen: 'dashboard' | category id | 'score'
  const [screen, setScreen] = useState("dashboard");
  const [activeCategory, setActiveCategory] = useState(null);
  const [score, setScore] = useState(0);
const [particlesOptions, setParticlesOptions] = useState(null);

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

const triggerLeaves = (isCorrect) => {
  setParticlesOptions({
    particles: {
      number: { value: 0 },
      color: { value: isCorrect ? "#16a34a" : "#8B4513" }, // green / brown
      shape: { type: "circle" },
      size: { value: { min: 4, max: 8 } },
      move: { enable: true, speed: 3, outModes: "destroy" },
      opacity: { value: 0.8 },
    },
    emitters: {
      direction: "top",
      rate: { delay: 0.1, quantity: 12 },
      size: { width: 0, height: 0 },
      position: { x: 50, y: 50 },
    },
  });

  setTimeout(() => setParticlesOptions(null), 2000);
};

useEffect(() => {
  window.triggerLeaves = triggerLeaves;
}, []);

  useEffect(() => {
    // inject forest-inspired CSS into the document (keeps this component self-contained)
    const css = `
      :root{
        --forest-dark: #093327;
        --forest-mid: #136a4a;
        --forest-light: #2bb673;
        --leaf: #88d498;
        --bg1: linear-gradient(180deg, #e6fff2 0%, #dff7ea 40%, #e8fff8 100%);
        --card: rgba(255,255,255,0.9);
        --glass: rgba(255,255,255,0.06);
      }
      *{box-sizing:border-box;font-family: 'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;}
      body, #root { margin:0; padding:0; height:100%; }
      .app-shell{
        min-height:100vh; background: var(--bg1);
        background-image: radial-gradient(circle at 10% 10%, rgba(23,70,45,0.06), transparent 10%),
                          radial-gradient(circle at 90% 80%, rgba(6,90,63,0.05), transparent 8%);
        padding:24px; display:flex; align-items:center; justify-content:center;
      }
      .container{ width:100%; max-width:1100px; margin:0 auto; }
      .header{ display:flex; align-items:center; gap:16px; margin-bottom:18px; }
      .logo{ width:64px; height:64px; border-radius:12px; background:linear-gradient(135deg,var(--forest-mid),var(--forest-light)); box-shadow:0 6px 18px rgba(16,24,18,0.12); display:flex; align-items:center; justify-content:center; color:white; font-weight:700; font-size:20px; }
      .title{ font-size:22px; font-weight:700; color:var(--forest-dark); }
      .subtitle{ color:#2f6b53; font-size:14px; }

      /* Dashboard grid */
      .grid{ display:grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap:20px; }
      .card{
        background: linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.9));
        border-radius:12px; padding:28px; min-height:160px; display:flex; flex-direction:column; justify-content:space-between; box-shadow: 0 10px 30px rgba(14,40,30,0.06);
        transition: transform .28s ease, box-shadow .28s ease;
        border: 1px solid rgba(10,50,30,0.03);
      }
      .card:hover{ transform: translateY(-8px) scale(1.01); box-shadow: 0 20px 40px rgba(10,45,25,0.09);} 
      .card .cat-title{ font-size:18px; font-weight:700; color:var(--forest-dark);}
      .card .cat-desc{ color:#4b6c5c; margin-top:8px; font-size:13px; }
      .card .leaf-emoji{ font-size:34px; }

      /* Quiz screen */
      .quiz-shell{ display:flex; flex-direction:column; gap:18px; padding:18px; }
      .question-card{ background: var(--card); border-radius:12px; padding:18px; box-shadow: 0 8px 18px rgba(8,40,30,0.06);} 
      .q-text{ font-size:18px; font-weight:600; color:var(--forest-dark); }
      .options{ display:flex; flex-direction:column; gap:12px; margin-top:12px; }

      .opt-btn{
        padding:12px 14px; border-radius:12px; border:1px solid rgba(20,60,40,0.06); cursor:pointer; text-align:left; font-weight:600; font-size:15px; background:linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.8));
        transition: transform .12s ease, box-shadow .12s ease; display:flex; align-items:center; justify-content:space-between;
      }
      .opt-btn:hover{ transform: translateY(-4px); box-shadow: 0 8px 20px rgba(12,40,26,0.06); }
      .opt-btn.disabled{ opacity:0.8; pointer-events:none; }

      .correct{ border-left:6px solid #16a34a; }
      .wrong{ border-left:6px solid #ef4444; }

      .next-row{ display:flex; gap:12px; align-items:center; justify-content:space-between; margin-top:12px; }
      .btn{ padding:10px 16px; border-radius:999px; border:none; cursor:pointer; font-weight:700; }
      .btn-primary{ background: linear-gradient(90deg,var(--forest-mid),var(--forest-light)); color:white; }
      .btn-ghost{ background:transparent; border:1px solid rgba(20,60,40,0.08); color:var(--forest-dark); }

      /* score screen */
      .score-card{ padding:22px; border-radius:14px; background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(245,255,250,0.95)); text-align:center; box-shadow: 0 12px 28px rgba(10,40,30,0.06); }
      .score-num{ font-size:48px; font-weight:800; color:var(--forest-mid); }

      /* responsive */
      @media (max-width:640px){ .title{ font-size:18px; } .card{ padding:18px; } }
    `;
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  function startCategory(catId) {
    setActiveCategory(catId);
    setScore(0);
    setScreen(catId);
  }

  function finishQuiz(finalScore) {
    setScore(finalScore);
    setScreen("score");
  }

  function backToDashboard() {
    setActiveCategory(null);
    setScore(0);
    setScreen("dashboard");
  }

  return (
    <div className="app-shell">
      <div className="container">
        <header className="header">
          <div className="logo">EQ</div>
          <div>
            <div className="title">EcoQuiz — Gamified Environmental Learning</div>
            <div className="subtitle">Forest themed, AR-ready quiz platform for schools & colleges</div>
          </div>
        </header>

        {screen === "dashboard" && (
          <main>
            <section style={{ marginBottom: 18 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0b4f3a" }}>Choose a topic</h2>
              <p style={{ margin: "6px 0 0", color: "#2f6b53" }}>Tap any card to start a short interactive quiz.</p>
            </section>

            <section className="grid">
              {categories.map((c, idx) => (
                <div
                  key={c.id}
                  className="card"
                  role="button"
                  onClick={() => startCategory(c.id)}
                  style={{ borderTop: `6px solid ${c.color}`, cursor: "pointer" }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div className="cat-title">{c.title}</div>
                      <div className="leaf-emoji">🍃</div>
                    </div>
                    <div className="cat-desc">Short interactive quiz with 2 questions.</div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ fontSize: 12, color: "#3b6a54" }}>Play • Learn • Earn</div>
                  </div>
                </div>
              ))}
            </section>
          </main>
        )}

        {screen && screen !== "dashboard" && screen !== "score" && (
          <SubQuiz
            categoryId={activeCategory}
            data={quizBank[activeCategory]}
            onFinish={finishQuiz}
            onBack={backToDashboard}
          />
        )}

        {screen === "score" && (
          <div style={{ marginTop: 20 }}>
            <ScoreDisplay score={score} onBack={backToDashboard} category={activeCategory} />
          </div>
        )}
      </div>
      {particlesOptions && (
        <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />
      )}
    </div>
  );
}


// ---------- SubQuiz Component ----------
function SubQuiz({ categoryId, data, onFinish, onBack }) {
  const [index, setIndex] = useState(0);
  const [localScore, setLocalScore] = useState(0);

  useEffect(() => {
    setIndex(0);
    setLocalScore(0);
  }, [categoryId]);

  function handleAnswer(correct) {
    setLocalScore((s) => s + (correct ? 10 : 0));
    // small delay to show feedback then move to next
    setTimeout(() => {
      if (index + 1 < data.length) setIndex((i) => i + 1);
      else onFinish(localScore + (correct ? 10 : 0));
    }, 700);
  }

  return (
    <div className="quiz-shell">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h3 style={{ margin: 0, color: "var(--forest-dark)", fontSize: 18 }}>{categoryId && categoryId.replace(/-/g, " ")}</h3>
          <div style={{ color: "#3b6a54", fontSize: 13 }}>{`Question ${index + 1} of ${data.length}`}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost" onClick={onBack}>Back</button>
          <div style={{ alignSelf: "center", color: "#2f6b53", fontWeight: 700 }}>Score: {localScore}</div>
        </div>
      </div>

      <div className="question-card">
        <QuestionCard question={data[index]} onAnswer={handleAnswer} />
      </div>

    </div>
  );
}

// ---------- QuestionCard Component ----------
function QuestionCard({ question, onAnswer }) {
  const [chosen, setChosen] = useState(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setChosen(null);
    setLocked(false);
  }, [question]);

 function selectOption(option) {
  if (locked) return;
  setChosen(option.id);
  setLocked(true);
  onAnswer(option.correct);

  // trigger leaves
  if (window.triggerLeaves) {
    window.triggerLeaves(option.correct);
  }
}


  return (
    <div>
      <div className="q-text">{question.q}</div>
      <div className="options">
        {question.options.map((opt) => {
          const cls = [];
          if (locked) {
            if (opt.id === chosen && opt.correct) cls.push("correct");
            if (opt.id === chosen && !opt.correct) cls.push("wrong");
            if (opt.correct && opt.id !== chosen) cls.push("correct");
          }

          return (
            <div
              key={opt.id}
              className={`opt-btn ${locked ? "disabled" : ""} ${cls.join(" ")}`}
              onClick={() => selectOption(opt)}
              role="button"
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width:36, height:36, borderRadius:8, display:"grid", placeItems:"center", background:"rgba(34,139,64,0.08)", fontWeight:800 }}>
                  {opt.id.toUpperCase()}
                </div>
                <div>{opt.text}</div>
              </div>

              <div style={{ minWidth:42 }}>
                {locked && opt.id === chosen && opt.correct && <span>✅</span>}
                {locked && opt.id === chosen && !opt.correct && <span>❌</span>}
                {locked && opt.correct && opt.id !== chosen && <span style={{ opacity:0.6 }}>✔︎</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- ScoreDisplay Component ----------
function ScoreDisplay({ score, onBack, category }) {
  const badge = score >= 15 ? "Earth Saver" : score >= 10 ? "Eco Learner" : "Green Starter";

  return (
    <div className="score-card">
      <div style={{ fontSize: 14, color: "#2f6b53", fontWeight: 700 }}>{category && category.replace(/-/g, " ")}</div>
      <div style={{ marginTop: 10 }}>
        <div className="score-num">{score}</div>
        <div style={{ color: "#3b6a54", marginTop: 6, fontWeight:700 }}>{badge}</div>
      </div>

      <p style={{ color: "#2f6b53", marginTop: 10 }}>Great job! Keep learning and applying these habits in real life.</p>

      <div style={{ marginTop: 12, display: "flex", gap: 10, justifyContent: "center" }}>
        <button className="btn btn-primary" onClick={onBack}>Back to Dashboard</button>
        <button className="btn btn-ghost" onClick={() => alert('Share feature coming soon!')}>Share</button>
      </div>

      <div style={{ marginTop: 12, color: "#276749", fontSize: 13 }}>
        Tip: This UI is AR-ready — you can add a 3D plant/tree growth animation when answers are correct.
      </div>
    </div>
  );
}

/*
  AR Integration Notes (where to add WebAR / AR.js):

  1) AR Tree Growth: After a correct answer (in QuestionCard.selectOption), you can fire a function
     that opens an AR view. That function could route to a new component (e.g., <ARScene />) which
     uses A-Frame + AR.js or Three.js + WebXR to render a 3D sapling that grows. Place the AR scene
     in a modal or a separate route.

  2) AR Waste Segregation: Replace the QuestionCard for waste segregation with an AR-based component
     that renders virtual bins using marker-based AR (MindAR.js) or markerless AR (8thWall / WebXR).

  3) Where to plug-in: The SubQuiz component is the logical place to swap a QuestionCard with an
     <ARQuestionCard /> that uses camera feed and WebAR libraries.

  Recommended libraries & approach for later integration:
    - A-Frame + AR.js (quick WebAR, marker-based)
    - MindAR.js (lightweight marker-based WebAR)
    - Three.js + WebXR (for advanced markerless experiences)
    - 8thWall (commercial, most robust markerless WebAR)

  Keep state management modular: when integrating AR, keep quiz state in React and let AR components
  communicate via callbacks (e.g., onARSuccess -> award points).
*/
