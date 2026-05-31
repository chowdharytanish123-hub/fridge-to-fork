import { useState, useEffect, useRef } from "react";

// ── Fonts & Global Styles ────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,300&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #F7F3ED;
    --cream-dark: #EDE7DD;
    --brown: #2C1810;
    --brown-mid: #5C3D2E;
    --brown-light: #9B7B6B;
    --green: #3D6B4F;
    --green-light: #D4E8DC;
    --green-bright: #5A9E72;
    --amber: #C4782A;
    --amber-light: #F5E6D0;
    --red: #B84040;
    --red-light: #F5DADA;
    --white: #FFFEFB;
    --shadow: 0 2px 20px rgba(44,24,16,0.08);
    --shadow-lg: 0 8px 40px rgba(44,24,16,0.14);
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--brown);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .serif { font-family: 'Fraunces', serif; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--cream-dark); }
  ::-webkit-scrollbar-thumb { background: var(--brown-light); border-radius: 2px; }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes pulse {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.05); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }
  @keyframes popIn {
    0%   { transform: scale(0.8); opacity: 0; }
    70%  { transform: scale(1.04); }
    100% { transform: scale(1); opacity: 1; }
  }

  .fade-up    { animation: fadeUp 0.5s ease both; }
  .fade-in    { animation: fadeIn 0.4s ease both; }
  .slide-in   { animation: slideIn 0.4s cubic-bezier(.22,1,.36,1) both; }
  .pop-in     { animation: popIn 0.4s cubic-bezier(.22,1,.36,1) both; }

  /* Shimmer skeleton */
  .skeleton {
    background: linear-gradient(90deg, var(--cream-dark) 25%, var(--cream) 50%, var(--cream-dark) 75%);
    background-size: 400px 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 8px;
  }

  /* Buttons */
  .btn-primary {
    background: var(--brown);
    color: var(--white);
    border: none;
    border-radius: 100px;
    padding: 14px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.01em;
  }
  .btn-primary:hover  { background: var(--brown-mid); transform: translateY(-1px); box-shadow: var(--shadow); }
  .btn-primary:active { transform: translateY(0); }

  .btn-secondary {
    background: transparent;
    color: var(--brown);
    border: 1.5px solid var(--brown-light);
    border-radius: 100px;
    padding: 12px 28px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-secondary:hover { border-color: var(--brown); background: var(--cream-dark); }

  .btn-green {
    background: var(--green);
    color: var(--white);
    border: none;
    border-radius: 100px;
    padding: 14px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-green:hover { background: var(--green-bright); transform: translateY(-1px); box-shadow: var(--shadow); }

  /* Tag / pill */
  .tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: var(--cream-dark);
    color: var(--brown-mid);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 500;
  }
  .tag-green  { background: var(--green-light); color: var(--green); }
  .tag-amber  { background: var(--amber-light); color: var(--amber); }
  .tag-red    { background: var(--red-light); color: var(--red); }
`;

// ── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_INGREDIENTS = [
  "Eggs", "Milk", "Cheddar cheese", "Spinach", "Onion",
  "Garlic", "Tomatoes", "Bell pepper", "Chicken breast", "Butter"
];

const MOCK_RECIPES = [
  {
    id: 1,
    name: "Spinach & Cheddar Omelette",
    time: "12 min",
    servings: 2,
    difficulty: "Easy",
    calories: 320,
    tags: ["Breakfast", "Vegetarian", "High protein"],
    emoji: "🍳",
    color: "#FFF3DC",
    ingredients: [
      { name: "Eggs", have: true },
      { name: "Spinach", have: true },
      { name: "Cheddar cheese", have: true },
      { name: "Butter", have: true },
      { name: "Salt & pepper", have: false },
    ],
    steps: [
      "Whisk 3 eggs with a pinch of salt and pepper.",
      "Melt butter in a non-stick pan over medium heat.",
      "Pour in eggs. When edges set, add spinach and cheese.",
      "Fold omelette in half and slide onto plate.",
    ],
  },
  {
    id: 2,
    name: "Garlic Tomato Chicken",
    time: "28 min",
    servings: 3,
    difficulty: "Medium",
    calories: 410,
    tags: ["Dinner", "High protein", "Gluten-free"],
    emoji: "🍗",
    color: "#FFECDC",
    ingredients: [
      { name: "Chicken breast", have: true },
      { name: "Tomatoes", have: true },
      { name: "Garlic", have: true },
      { name: "Onion", have: true },
      { name: "Olive oil", have: false },
      { name: "Italian herbs", have: false },
    ],
    steps: [
      "Season chicken with salt, pepper, and Italian herbs.",
      "Sear chicken in olive oil 5 min per side. Set aside.",
      "Sauté onion and garlic until soft, add diced tomatoes.",
      "Return chicken, simmer 15 min until cooked through.",
    ],
  },
  {
    id: 3,
    name: "Bell Pepper Frittata",
    time: "20 min",
    servings: 4,
    difficulty: "Easy",
    calories: 290,
    tags: ["Breakfast", "Lunch", "Vegetarian"],
    emoji: "🫑",
    color: "#DCEEDD",
    ingredients: [
      { name: "Eggs", have: true },
      { name: "Bell pepper", have: true },
      { name: "Onion", have: true },
      { name: "Cheddar cheese", have: true },
      { name: "Milk", have: true },
    ],
    steps: [
      "Preheat oven to 375°F. Sauté pepper and onion 5 min.",
      "Whisk eggs with milk, season generously.",
      "Pour eggs over vegetables in oven-safe pan.",
      "Sprinkle cheese, bake 12–15 min until set.",
    ],
  },
  {
    id: 4,
    name: "Creamy Tomato Soup",
    time: "25 min",
    servings: 2,
    difficulty: "Easy",
    calories: 220,
    tags: ["Lunch", "Vegetarian", "Comfort food"],
    emoji: "🍅",
    color: "#FFE0DC",
    ingredients: [
      { name: "Tomatoes", have: true },
      { name: "Onion", have: true },
      { name: "Garlic", have: true },
      { name: "Milk", have: true },
      { name: "Vegetable stock", have: false },
    ],
    steps: [
      "Roast tomatoes, onion, and garlic at 400°F for 20 min.",
      "Blend roasted vegetables until smooth.",
      "Stir in milk and season to taste.",
      "Reheat gently and serve with crusty bread.",
    ],
  },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MEALS = ["Breakfast", "Lunch", "Dinner"];

// ── Helpers ──────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const injectStyles = () => {
  if (!document.getElementById("mealplanner-styles")) {
    const el = document.createElement("style");
    el.id = "mealplanner-styles";
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
  }
};

// ── Sub-components ────────────────────────────────────────────────────────────

// Nav bar
function NavBar({ screen, setScreen, savedRecipes }) {
  const tabs = [
    { id: "scan",    icon: "📷", label: "Scan" },
    { id: "recipes", icon: "🍽", label: "Recipes" },
    { id: "planner", icon: "📅", label: "Planner" },
    { id: "list",    icon: "🛒", label: "Shop" },
  ];
  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "rgba(255,254,251,0.95)",
      backdropFilter: "blur(12px)",
      borderTop: "1px solid var(--cream-dark)",
      display: "flex", alignItems: "stretch",
      zIndex: 100,
      paddingBottom: "env(safe-area-inset-bottom, 0)",
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setScreen(t.id)} style={{
          flex: 1, background: "none", border: "none", cursor: "pointer",
          padding: "10px 0 8px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
          transition: "all 0.2s",
          position: "relative",
        }}>
          {t.id === "recipes" && savedRecipes.length > 0 && (
            <span style={{
              position: "absolute", top: 6, right: "calc(50% - 18px)",
              background: "var(--green)", color: "#fff",
              fontSize: 10, fontWeight: 600, width: 16, height: 16,
              borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            }}>{savedRecipes.length}</span>
          )}
          <span style={{ fontSize: 20 }}>{t.icon}</span>
          <span style={{
            fontSize: 10, fontWeight: screen === t.id ? 500 : 400,
            color: screen === t.id ? "var(--brown)" : "var(--brown-light)",
          }}>{t.label}</span>
          {screen === t.id && (
            <span style={{
              position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
              width: 20, height: 2, borderRadius: 2,
              background: "var(--green)",
            }} />
          )}
        </button>
      ))}
    </nav>
  );
}

// ── Screen: Onboarding ───────────────────────────────────────────────────────
function OnboardingScreen({ onDone }) {
  const [step, setStep] = useState(0);
  const [diet, setDiet] = useState([]);

  const slides = [
    {
      emoji: "📸",
      title: "Snap your fridge",
      sub: "Take a photo and our AI instantly identifies every ingredient you have.",
    },
    {
      emoji: "🍽️",
      title: "Get instant recipes",
      sub: "Personalised recipes based on exactly what you have — no more food waste.",
    },
    {
      emoji: "🛒",
      title: "Auto shopping list",
      sub: "Missing an ingredient? It's added to your list automatically.",
    },
  ];

  const DIETS = ["Vegetarian", "Vegan", "Gluten-free", "Dairy-free", "Keto", "Halal"];

  if (step === 3) {
    return (
      <div style={{
        minHeight: "100vh", background: "var(--cream)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "40px 28px", gap: 24,
      }}>
        <div style={{ fontSize: 64 }} className="pop-in">🥗</div>
        <div className="fade-up" style={{ textAlign: "center" }}>
          <h2 className="serif" style={{ fontSize: 30, fontWeight: 700, marginBottom: 8 }}>
            Any dietary needs?
          </h2>
          <p style={{ color: "var(--brown-light)", fontSize: 15 }}>
            We'll filter recipes to match. Select all that apply.
          </p>
        </div>
        <div className="fade-up" style={{
          display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 320,
          animationDelay: "0.1s",
        }}>
          {DIETS.map(d => (
            <button key={d} onClick={() => setDiet(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d])}
              style={{
                padding: "10px 18px", borderRadius: 100,
                border: diet.includes(d) ? "2px solid var(--green)" : "1.5px solid var(--cream-dark)",
                background: diet.includes(d) ? "var(--green-light)" : "var(--white)",
                color: diet.includes(d) ? "var(--green)" : "var(--brown-mid)",
                fontSize: 14, fontWeight: diet.includes(d) ? 500 : 400,
                cursor: "pointer", transition: "all 0.2s", fontFamily: "DM Sans, sans-serif",
              }}>
              {d}
            </button>
          ))}
        </div>
        <div className="fade-up" style={{ animationDelay: "0.2s", display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 320 }}>
          <button className="btn-green" style={{ width: "100%" }} onClick={onDone}>
            Let's start cooking →
          </button>
          <button className="btn-secondary" style={{ width: "100%" }} onClick={onDone}>
            Skip for now
          </button>
        </div>
      </div>
    );
  }

  const s = slides[step];
  return (
    <div style={{
      minHeight: "100vh", background: "var(--cream)",
      display: "flex", flexDirection: "column",
    }}>
      {/* Hero illustration area */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        background: step === 0 ? "#FFF3DC" : step === 1 ? "#DCEEDD" : "#EDE0F5",
        minHeight: 320, position: "relative", overflow: "hidden",
      }}>
        <div style={{ fontSize: 120, lineHeight: 1 }} className="pop-in" key={step}>{s.emoji}</div>
        {/* Decorative circles */}
        <div style={{
          position: "absolute", width: 200, height: 200, borderRadius: "50%",
          border: "1px solid rgba(44,24,16,0.06)",
          top: -40, left: -40,
        }} />
        <div style={{
          position: "absolute", width: 300, height: 300, borderRadius: "50%",
          border: "1px solid rgba(44,24,16,0.04)",
          bottom: -80, right: -80,
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: "40px 28px 48px", display: "flex", flexDirection: "column", gap: 24 }}>
        <div key={step} className="fade-up">
          <h1 className="serif" style={{ fontSize: 34, fontWeight: 700, marginBottom: 12, lineHeight: 1.2 }}>
            {s.title}
          </h1>
          <p style={{ fontSize: 16, color: "var(--brown-mid)", lineHeight: 1.6 }}>{s.sub}</p>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 6 }}>
          {slides.map((_, i) => (
            <div key={i} style={{
              width: i === step ? 20 : 6, height: 6, borderRadius: 3,
              background: i === step ? "var(--brown)" : "var(--cream-dark)",
              transition: "all 0.3s",
            }} />
          ))}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {step > 0 && (
            <button className="btn-secondary" onClick={() => setStep(s => s - 1)}>
              Back
            </button>
          )}
          <button className="btn-primary" style={{ flex: 1 }} onClick={() => setStep(s => s + 1)}>
            {step < 2 ? "Continue" : "Choose preferences →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Screen: Scan ─────────────────────────────────────────────────────────────
function ScanScreen({ onScanDone }) {
  const [phase, setPhase] = useState("idle"); // idle | scanning | done
  const [progress, setProgress] = useState(0);
  const [detected, setDetected] = useState([]);
  const fileRef = useRef();

  const startScan = async () => {
    setPhase("scanning");
    setProgress(0);
    for (let i = 0; i <= 100; i += 4) {
      await sleep(60);
      setProgress(i);
    }
    setDetected(MOCK_INGREDIENTS);
    setPhase("done");
  };

  if (phase === "done") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--cream)", paddingBottom: 80 }}>
        <div style={{
          background: "var(--green)", padding: "56px 28px 28px",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>Scan complete</span>
          <h2 className="serif" style={{ color: "var(--white)", fontSize: 28, fontWeight: 600 }}>
            {detected.length} ingredients found
          </h2>
        </div>

        <div style={{ padding: "24px 20px" }}>
          <p style={{ fontSize: 13, color: "var(--brown-light)", marginBottom: 16 }}>
            Tap to remove any wrong detections
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
            {detected.map((ing, i) => (
              <button key={ing} onClick={() => setDetected(d => d.filter(x => x !== ing))}
                className="fade-up"
                style={{
                  animationDelay: `${i * 0.04}s`,
                  padding: "8px 14px", borderRadius: 100,
                  border: "1.5px solid var(--green-light)",
                  background: "var(--green-light)", color: "var(--green)",
                  fontSize: 14, cursor: "pointer", fontFamily: "DM Sans, sans-serif",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                {ing} <span style={{ opacity: 0.6, fontSize: 12 }}>✕</span>
              </button>
            ))}
          </div>

          {/* Add manually */}
          <div style={{
            background: "var(--white)", borderRadius: 16,
            border: "1px solid var(--cream-dark)", padding: "14px 16px",
            display: "flex", gap: 10, marginBottom: 24,
          }}>
            <input placeholder="Add ingredient manually…" style={{
              flex: 1, border: "none", background: "none",
              fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "var(--brown)",
              outline: "none",
            }} onKeyDown={e => {
              if (e.key === "Enter" && e.target.value.trim()) {
                setDetected(d => [...d, e.target.value.trim()]);
                e.target.value = "";
              }
            }} />
            <span style={{ color: "var(--brown-light)", fontSize: 13 }}>↵ to add</span>
          </div>

          <button className="btn-green" style={{ width: "100%", fontSize: 16 }}
            onClick={() => onScanDone(detected)}>
            Find recipes with these →
          </button>

          <button className="btn-secondary" style={{ width: "100%", marginTop: 12 }}
            onClick={() => setPhase("idle")}>
            Scan again
          </button>
        </div>
      </div>
    );
  }

  if (phase === "scanning") {
    return (
      <div style={{
        minHeight: "100vh", background: "var(--cream)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 32, padding: 28,
      }}>
        <div style={{
          width: 120, height: 120, borderRadius: "50%",
          border: "3px solid var(--cream-dark)",
          borderTop: "3px solid var(--green)",
          animation: "spin 0.8s linear infinite",
        }} />
        <div style={{ textAlign: "center" }}>
          <h3 className="serif" style={{ fontSize: 24, marginBottom: 8 }}>Scanning your fridge…</h3>
          <p style={{ color: "var(--brown-light)", fontSize: 14 }}>
            AI is identifying your ingredients
          </p>
        </div>
        <div style={{ width: "100%", maxWidth: 280 }}>
          <div style={{
            height: 6, background: "var(--cream-dark)", borderRadius: 3, overflow: "hidden",
          }}>
            <div style={{
              height: "100%", borderRadius: 3,
              background: "var(--green)", width: `${progress}%`,
              transition: "width 0.1s linear",
            }} />
          </div>
          <p style={{ textAlign: "center", marginTop: 8, fontSize: 13, color: "var(--brown-light)" }}>
            {progress}%
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 280 }}>
          {["Detecting objects…", "Identifying ingredients…", "Checking freshness…"].map((msg, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              opacity: progress > i * 33 ? 1 : 0.3, transition: "opacity 0.3s",
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: "50%",
                background: progress > i * 33 ? "var(--green)" : "var(--cream-dark)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, color: "#fff", transition: "all 0.3s",
              }}>✓</div>
              <span style={{ fontSize: 13, color: "var(--brown-mid)" }}>{msg}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Idle
  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ padding: "56px 28px 24px" }}>
        <p style={{ fontSize: 13, color: "var(--brown-light)", marginBottom: 4 }}>
          Good morning 👋
        </p>
        <h1 className="serif" style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2 }}>
          What's in your<br />fridge today?
        </h1>
      </div>

      {/* Scan card */}
      <div style={{ padding: "0 20px 20px" }}>
        <button onClick={startScan} style={{
          width: "100%", background: "var(--brown)", borderRadius: 24,
          border: "none", cursor: "pointer",
          padding: "48px 24px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
          transition: "transform 0.2s",
          position: "relative", overflow: "hidden",
        }}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <div style={{
            position: "absolute", inset: 0, opacity: 0.04,
            backgroundImage: "radial-gradient(circle at 20% 80%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 36,
          }}>📷</div>
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <h3 style={{ color: "var(--white)", fontSize: 20, fontWeight: 500, marginBottom: 6, fontFamily: "DM Sans, sans-serif" }}>
              Scan your fridge
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
              Tap to take a photo or upload one
            </p>
          </div>
        </button>
      </div>

      {/* Quick demo */}
      <div style={{ padding: "0 20px" }}>
        <div style={{
          background: "var(--amber-light)", borderRadius: 16,
          padding: "16px 20px",
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <span style={{ fontSize: 28 }}>✨</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 500, color: "var(--amber)", marginBottom: 2 }}>
              Try with a demo photo
            </p>
            <p style={{ fontSize: 12, color: "var(--brown-mid)" }}>
              See how the AI identifies ingredients in seconds
            </p>
          </div>
          <button onClick={startScan} className="btn-primary" style={{
            marginLeft: "auto", padding: "8px 16px", fontSize: 13, flexShrink: 0,
          }}>
            Try
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ padding: "24px 20px", display: "flex", gap: 12 }}>
        {[
          { val: "4", label: "Recipes today", icon: "🍽️" },
          { val: "10", label: "Ingredients", icon: "🥦" },
          { val: "0", label: "Items needed", icon: "🛒" },
        ].map(s => (
          <div key={s.label} style={{
            flex: 1, background: "var(--white)", borderRadius: 16,
            border: "1px solid var(--cream-dark)", padding: "14px 12px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 500, fontFamily: "Fraunces, serif" }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "var(--brown-light)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Screen: Recipes ───────────────────────────────────────────────────────────
function RecipesScreen({ ingredients, savedRecipes, onSave, onAddToPlanner }) {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Breakfast", "Lunch", "Dinner", "Vegetarian", "High protein"];

  const visible = MOCK_RECIPES.filter(r =>
    filter === "All" || r.tags.includes(filter)
  );

  if (selected) {
    const r = selected;
    const missing = r.ingredients.filter(i => !i.have);
    const have = r.ingredients.filter(i => i.have);
    const isSaved = savedRecipes.includes(r.id);
    return (
      <div style={{ minHeight: "100vh", background: "var(--cream)", paddingBottom: 100 }} className="slide-in">
        {/* Hero */}
        <div style={{
          background: r.color, padding: "56px 24px 32px",
          display: "flex", flexDirection: "column", gap: 12, position: "relative",
        }}>
          <button onClick={() => setSelected(null)} style={{
            position: "absolute", top: 56, left: 24,
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,0.7)", border: "none", cursor: "pointer",
            fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
          }}>←</button>
          <div style={{ fontSize: 72, textAlign: "center" }}>{r.emoji}</div>
          <h2 className="serif" style={{ fontSize: 26, fontWeight: 700, textAlign: "center" }}>
            {r.name}
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            {r.tags.map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div style={{
          display: "flex", background: "var(--white)",
          borderBottom: "1px solid var(--cream-dark)",
        }}>
          {[
            { icon: "⏱️", val: r.time },
            { icon: "👥", val: `${r.servings} servings` },
            { icon: "🔥", val: `${r.calories} cal` },
            { icon: "📊", val: r.difficulty },
          ].map(s => (
            <div key={s.val} style={{
              flex: 1, padding: "14px 8px", textAlign: "center",
              borderRight: "1px solid var(--cream-dark)",
            }}>
              <div style={{ fontSize: 18 }}>{s.icon}</div>
              <div style={{ fontSize: 12, color: "var(--brown-mid)", marginTop: 2 }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Ingredients */}
          <section>
            <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 14 }}>Ingredients</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {r.ingredients.map(ing => (
                <div key={ing.name} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 16px", borderRadius: 12,
                  background: ing.have ? "var(--green-light)" : "var(--red-light)",
                }}>
                  <span style={{ fontSize: 16 }}>{ing.have ? "✅" : "❌"}</span>
                  <span style={{
                    fontSize: 14, color: ing.have ? "var(--green)" : "var(--red)",
                    fontWeight: ing.have ? 400 : 500,
                  }}>{ing.name}</span>
                  {!ing.have && <span className="tag-red tag" style={{ marginLeft: "auto", fontSize: 11 }}>Need to buy</span>}
                </div>
              ))}
            </div>
          </section>

          {/* Steps */}
          <section>
            <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 14 }}>Instructions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {r.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "var(--brown)", color: "var(--white)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 600, flexShrink: 0, marginTop: 1,
                  }}>{i + 1}</div>
                  <p style={{ fontSize: 14, color: "var(--brown-mid)", lineHeight: 1.6, paddingTop: 4 }}>{step}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CTA */}
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          padding: "16px 20px 32px",
          background: "rgba(247,243,237,0.95)", backdropFilter: "blur(12px)",
          display: "flex", gap: 10,
        }}>
          <button className="btn-secondary" style={{ flex: 1 }}
            onClick={() => { onSave(r.id); }}>
            {isSaved ? "✓ Saved" : "Save recipe"}
          </button>
          <button className="btn-green" style={{ flex: 2 }}
            onClick={() => { onAddToPlanner(r); setSelected(null); }}>
            Add to meal plan →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", paddingBottom: 80 }}>
      <div style={{ padding: "56px 20px 16px" }}>
        <h1 className="serif" style={{ fontSize: 28, fontWeight: 700 }}>
          {ingredients.length > 0 ? "Recipes for you" : "Explore recipes"}
        </h1>
        {ingredients.length > 0 && (
          <p style={{ color: "var(--brown-light)", fontSize: 14, marginTop: 4 }}>
            Based on {ingredients.length} ingredients scanned
          </p>
        )}
      </div>

      {/* Filters */}
      <div style={{ overflowX: "auto", padding: "0 20px 16px", display: "flex", gap: 8 }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            flexShrink: 0, padding: "8px 16px", borderRadius: 100,
            border: filter === f ? "2px solid var(--brown)" : "1.5px solid var(--cream-dark)",
            background: filter === f ? "var(--brown)" : "var(--white)",
            color: filter === f ? "var(--white)" : "var(--brown-mid)",
            fontSize: 13, cursor: "pointer", fontFamily: "DM Sans, sans-serif",
            fontWeight: filter === f ? 500 : 400, transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}>{f}</button>
        ))}
      </div>

      {/* Recipe cards */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        {visible.map((r, i) => (
          <button key={r.id} onClick={() => setSelected(r)} className="fade-up"
            style={{
              animationDelay: `${i * 0.07}s`,
              background: "var(--white)", borderRadius: 20,
              border: "1px solid var(--cream-dark)",
              padding: 0, cursor: "pointer", textAlign: "left",
              overflow: "hidden", transition: "transform 0.2s",
              fontFamily: "DM Sans, sans-serif",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            {/* Colored header */}
            <div style={{
              background: r.color, padding: "20px 20px 12px",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ fontSize: 48 }}>{r.emoji}</span>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 500, fontFamily: "Fraunces, serif", marginBottom: 4 }}>
                  {r.name}
                </h3>
                <div style={{ display: "flex", gap: 6 }}>
                  <span className="tag" style={{ fontSize: 11 }}>⏱️ {r.time}</span>
                  <span className="tag" style={{ fontSize: 11 }}>🔥 {r.calories} cal</span>
                </div>
              </div>
              {savedRecipes.includes(r.id) && (
                <span style={{ marginLeft: "auto", fontSize: 18 }}>🔖</span>
              )}
            </div>
            {/* Footer */}
            <div style={{
              padding: "12px 20px", display: "flex", alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {r.tags.slice(0, 2).map(t => (
                  <span key={t} className="tag tag-green" style={{ fontSize: 11 }}>{t}</span>
                ))}
              </div>
              <span style={{ fontSize: 13, color: "var(--green)", fontWeight: 500 }}>
                {r.ingredients.filter(x => x.have).length}/{r.ingredients.length} have →
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Screen: Planner ───────────────────────────────────────────────────────────
function PlannerScreen({ plannerData, onUpdatePlanner }) {
  const [selected, setSelected] = useState({ day: "Mon", meal: "Breakfast" });

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", paddingBottom: 80 }}>
      <div style={{ padding: "56px 20px 16px" }}>
        <h1 className="serif" style={{ fontSize: 28, fontWeight: 700 }}>This week</h1>
        <p style={{ color: "var(--brown-light)", fontSize: 14, marginTop: 4 }}>
          Tap a slot to assign a recipe
        </p>
      </div>

      {/* Day tabs */}
      <div style={{ overflowX: "auto", padding: "0 20px 16px", display: "flex", gap: 8 }}>
        {DAYS.map(d => (
          <button key={d} onClick={() => setSelected(s => ({ ...s, day: d }))} style={{
            flexShrink: 0, padding: "8px 16px", borderRadius: 100,
            border: selected.day === d ? "2px solid var(--brown)" : "1.5px solid var(--cream-dark)",
            background: selected.day === d ? "var(--brown)" : "var(--white)",
            color: selected.day === d ? "var(--white)" : "var(--brown-mid)",
            fontSize: 13, cursor: "pointer", fontFamily: "DM Sans, sans-serif",
            fontWeight: selected.day === d ? 500 : 400, transition: "all 0.2s",
          }}>{d}</button>
        ))}
      </div>

      {/* Meal slots */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {MEALS.map(meal => {
          const key = `${selected.day}-${meal}`;
          const assigned = plannerData[key];
          return (
            <div key={meal} style={{
              background: "var(--white)", borderRadius: 20,
              border: "1px solid var(--cream-dark)", overflow: "hidden",
            }}>
              <div style={{
                padding: "12px 16px", borderBottom: assigned ? "1px solid var(--cream-dark)" : "none",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--brown-mid)" }}>{meal}</span>
                {assigned && (
                  <button onClick={() => onUpdatePlanner(key, null)} style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 12, color: "var(--brown-light)",
                  }}>Remove</button>
                )}
              </div>
              {assigned ? (
                <div style={{
                  padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
                  background: assigned.color,
                }} className="fade-in">
                  <span style={{ fontSize: 32 }}>{assigned.emoji}</span>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 500, fontFamily: "Fraunces, serif" }}>
                      {assigned.name}
                    </p>
                    <p style={{ fontSize: 12, color: "var(--brown-mid)", marginTop: 2 }}>
                      {assigned.time} · {assigned.calories} cal
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{
                  padding: "20px 16px", textAlign: "center",
                  color: "var(--brown-light)", fontSize: 13,
                }}>
                  <span style={{ fontSize: 24, display: "block", marginBottom: 4, opacity: 0.4 }}>+</span>
                  No meal planned — add from recipes tab
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Weekly summary */}
      <div style={{ padding: "20px 20px" }}>
        <div style={{
          background: "var(--amber-light)", borderRadius: 16,
          padding: "16px 20px",
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 500, color: "var(--amber)", marginBottom: 8 }}>
            Weekly nutrition snapshot
          </h3>
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { label: "Avg calories", val: "340 / meal" },
              { label: "Meals planned", val: `${Object.keys(plannerData).length} / 21` },
            ].map(s => (
              <div key={s.label}>
                <p style={{ fontSize: 18, fontWeight: 500, fontFamily: "Fraunces, serif", color: "var(--brown)" }}>
                  {s.val}
                </p>
                <p style={{ fontSize: 11, color: "var(--brown-mid)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Screen: Shopping List ─────────────────────────────────────────────────────
function ShoppingScreen({ plannerData }) {
  const allMissing = [];
  MOCK_RECIPES.forEach(r => {
    r.ingredients.filter(i => !i.have).forEach(i => {
      if (!allMissing.find(x => x.name === i.name)) allMissing.push({ name: i.name, checked: false });
    });
  });

  const [items, setItems] = useState([
    ...allMissing,
    { name: "Olive oil", checked: false },
    { name: "Italian herbs", checked: false },
    { name: "Vegetable stock", checked: false },
    { name: "Salt & pepper", checked: false },
  ]);
  const [newItem, setNewItem] = useState("");

  const toggle = (i) => setItems(prev => prev.map((x, idx) => idx === i ? { ...x, checked: !x.checked } : x));
  const addItem = () => {
    if (newItem.trim()) {
      setItems(p => [...p, { name: newItem.trim(), checked: false }]);
      setNewItem("");
    }
  };
  const remaining = items.filter(i => !i.checked).length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", paddingBottom: 80 }}>
      <div style={{ padding: "56px 20px 20px" }}>
        <h1 className="serif" style={{ fontSize: 28, fontWeight: 700 }}>Shopping list</h1>
        <p style={{ color: "var(--brown-light)", fontSize: 14, marginTop: 4 }}>
          {remaining} items remaining
        </p>
      </div>

      {/* Progress */}
      <div style={{ padding: "0 20px 20px" }}>
        <div style={{ height: 6, background: "var(--cream-dark)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 3, background: "var(--green)",
            width: `${Math.round(((items.length - remaining) / items.length) * 100)}%`,
            transition: "width 0.4s ease",
          }} />
        </div>
        <p style={{ fontSize: 12, color: "var(--brown-light)", marginTop: 6 }}>
          {items.length - remaining} of {items.length} items checked off
        </p>
      </div>

      {/* Add item */}
      <div style={{ padding: "0 20px 16px" }}>
        <div style={{
          background: "var(--white)", borderRadius: 16,
          border: "1px solid var(--cream-dark)", padding: "12px 16px",
          display: "flex", gap: 10,
        }}>
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addItem()}
            placeholder="Add an item…"
            style={{
              flex: 1, border: "none", background: "none",
              fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "var(--brown)",
              outline: "none",
            }}
          />
          <button onClick={addItem} className="btn-primary" style={{ padding: "8px 16px", fontSize: 13 }}>
            Add
          </button>
        </div>
      </div>

      {/* Items */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Remaining */}
        {items.filter(i => !i.checked).map((item, idx) => (
          <button key={item.name + idx} onClick={() => toggle(items.indexOf(item))} className="fade-up"
            style={{
              animationDelay: `${idx * 0.04}s`,
              background: "var(--white)", borderRadius: 14,
              border: "1px solid var(--cream-dark)",
              padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
              cursor: "pointer", textAlign: "left", fontFamily: "DM Sans, sans-serif",
              transition: "all 0.2s",
            }}>
            <div style={{
              width: 22, height: 22, borderRadius: "50%",
              border: "2px solid var(--cream-dark)",
              flexShrink: 0,
            }} />
            <span style={{ fontSize: 15, color: "var(--brown)" }}>{item.name}</span>
          </button>
        ))}

        {/* Checked */}
        {items.filter(i => i.checked).length > 0 && (
          <>
            <p style={{ fontSize: 12, color: "var(--brown-light)", marginTop: 8, marginBottom: 4 }}>
              Checked off
            </p>
            {items.filter(i => i.checked).map((item, idx) => (
              <button key={item.name + idx + "c"} onClick={() => toggle(items.indexOf(item))}
                style={{
                  background: "var(--cream-dark)", borderRadius: 14,
                  border: "none", padding: "14px 16px",
                  display: "flex", alignItems: "center", gap: 12,
                  cursor: "pointer", textAlign: "left", fontFamily: "DM Sans, sans-serif",
                  opacity: 0.6,
                }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: "var(--green)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, color: "#fff", flexShrink: 0,
                }}>✓</div>
                <span style={{ fontSize: 15, textDecoration: "line-through", color: "var(--brown-light)" }}>
                  {item.name}
                </span>
              </button>
            ))}
          </>
        )}
      </div>

      {/* Share */}
      <div style={{ padding: "20px" }}>
        <button className="btn-secondary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span>📤</span> Share list
        </button>
      </div>
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [screen, setScreen] = useState("scan");
  const [ingredients, setIngredients] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [plannerData, setPlannerData] = useState({});

  useEffect(() => { injectStyles(); }, []);

  const handleScanDone = (ings) => {
    setIngredients(ings);
    setScreen("recipes");
  };

  const handleSave = (id) => {
    setSavedRecipes(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  };

  const handleAddToPlanner = (recipe) => {
    const days = ["Mon", "Tue", "Wed", "Thu"];
    const meals = ["Breakfast", "Lunch", "Dinner"];
    const day = days[Math.floor(Math.random() * days.length)];
    const meal = meals[Math.floor(Math.random() * meals.length)];
    const key = `${day}-${meal}`;
    setPlannerData(p => ({ ...p, [key]: recipe }));
    setScreen("planner");
  };

  const handleUpdatePlanner = (key, val) => {
    setPlannerData(p => {
      const next = { ...p };
      if (val === null) delete next[key]; else next[key] = val;
      return next;
    });
  };

  if (!onboarded) {
    return <OnboardingScreen onDone={() => setOnboarded(true)} />;
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", position: "relative", minHeight: "100vh" }}>
      {screen === "scan" && <ScanScreen onScanDone={handleScanDone} />}
      {screen === "recipes" && (
        <RecipesScreen
          ingredients={ingredients}
          savedRecipes={savedRecipes}
          onSave={handleSave}
          onAddToPlanner={handleAddToPlanner}
        />
      )}
      {screen === "planner" && (
        <PlannerScreen plannerData={plannerData} onUpdatePlanner={handleUpdatePlanner} />
      )}
      {screen === "list" && <ShoppingScreen plannerData={plannerData} />}
      <NavBar screen={screen} setScreen={setScreen} savedRecipes={savedRecipes} />
    </div>
  );
}
