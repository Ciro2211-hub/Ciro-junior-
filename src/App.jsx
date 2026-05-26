import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#F8FAFC",
  card: "#FFFFFF",
  border: "#E5E7EB",
  primary: "#0F4C5C",
  accent: "#3A86FF",
  text: "#0F1A2A",
  muted: "#6B7280",
  muted2: "#9CA3AF",
  warning: "#F59E0B",
};

function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = "up", style = {} }) {
  const [ref, visible] = useReveal();

  const transforms = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    scale: "scale(0.92)",
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Navbar({ onLogin }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? "rgba(248,250,252,0.95)" : "rgba(248,250,252,0.7)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
        padding: "0 32px",
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        boxShadow: scrolled ? "0 2px 16px rgba(15,76,92,0.06)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          height: 64,
          gap: 32,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: C.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            ⚕️
          </div>
          <span
            style={{
              fontWeight: 900,
              fontSize: 20,
              color: C.primary,
              letterSpacing: -0.5,
            }}
          >
            Click
          </span>
        </div>

        <div style={{ display: "flex", gap: 28, marginLeft: 24 }}>
          {["Funcionalidades", "Para médicos", "Para hospitais", "Preços"].map(
            (item) => (
              <a
                key={item}
                href="#"
                style={{
                  color: C.muted,
                  fontSize: 14,
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = C.primary)}
                onMouseLeave={(e) => (e.target.style.color = C.muted)}
              >
                {item}
              </a>
            )
          )}
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <button
            onClick={onLogin}
            style={{
              padding: "9px 20px",
              borderRadius: 8,
              border: `1.5px solid ${C.border}`,
              background: "transparent",
              color: C.primary,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              transition: "border-color 0.2s",
            }}
          >
            Entrar
          </button>
          <button
            style={{
              padding: "9px 20px",
              borderRadius: 8,
              border: "none",
              background: C.primary,
              color: "#fff",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 700,
              transition: "opacity 0.2s",
            }}
          >
            Solicitar acesso
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero({ onLogin }) {
  return (
    <section
      style={{
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        background: `linear-gradient(160deg, ${C.primary}08 0%, ${C.bg} 50%, ${C.accent}08 100%)`,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          top: -250,
          right: -250,
          background: `radial-gradient(circle, ${C.accent}12 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          bottom: -150,
          left: -150,
          background: `radial-gradient(circle, ${C.primary}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 760, position: "relative" }}>
        <div
          style={{
            animation: "fadeDown 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 18px",
            borderRadius: 999,
            background: `${C.primary}10`,
            border: `1px solid ${C.primary}20`,
            color: C.primary,
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: C.accent,
              display: "inline-block",
            }}
          />
          Gestão médica simples, rápida e confiável
        </div>

        <h1
          style={{
            animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both",
            fontSize: "clamp(36px, 5.5vw, 64px)",
            fontWeight: 900,
            margin: "0 0 24px",
            lineHeight: 1.1,
            color: C.text,
            letterSpacing: -1,
          }}
        >
          Gestão de escalas médicas{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            sem caos
          </span>
        </h1>

        <p
          style={{
            animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s both",
            fontSize: 19,
            color: C.muted,
            lineHeight: 1.7,
            margin: "0 0 48px",
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Previsibilidade na escala, controle financeiro automático e zero furo
          de plantão. Tudo numa plataforma só.
        </p>

        <div
          style={{
            animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s both",
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 64,
          }}
        >
          <button
            style={{
              padding: "15px 36px",
              borderRadius: 10,
              border: "none",
              background: C.primary,
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: `0 8px 24px ${C.primary}30`,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = `0 12px 32px ${C.primary}40`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "";
              e.target.style.boxShadow = `0 8px 24px ${C.primary}30`;
            }}
          >
            Solicitar acesso gratuito
          </button>
          <button
            onClick={onLogin}
            style={{
              padding: "15px 36px",
              borderRadius: 10,
              border: `1.5px solid ${C.border}`,
              background: C.card,
              color: C.text,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.borderColor = C.primary)}
            onMouseLeave={(e) => (e.target.style.borderColor = C.border)}
          >
            Já tenho conta →
          </button>
        </div>

        <div
          style={{
            animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.7s both",
            display: "flex",
            gap: 48,
            justifyContent: "center",
            flexWrap: "wrap",
            paddingTop: 32,
            borderTop: `1px solid ${C.border}`,
          }}
        >
          {[
            { n: "2.400+", l: "Médicos ativos" },
            { n: "87", l: "Hospitais parceiros" },
            { n: "98%", l: "Escalas sem furo" },
          ].map((s) => (
            <div key={s.n} style={{ textAlign: "center" }}>
              <div
                style={{ fontSize: 28, fontWeight: 800, color: C.primary }}
              >
                {s.n}
              </div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problema() {
  const problemas = [
    {
      icon: "📋",
      titulo: "Escalas no WhatsApp",
      desc: "Planilhas desatualizadas, mensagens perdidas e ninguém sabe quem está escalado de verdade.",
    },
    {
      icon: "🔄",
      titulo: "Trocas desorganizadas",
      desc: "Médico precisa trocar plantão e vira um caos de ligações, mensagens e mal-entendidos.",
    },
    {
      icon: "💸",
      titulo: "Sem controle financeiro",
      desc: "Médico não sabe quanto vai receber. Hospital não sabe quanto vai gastar.",
    },
    {
      icon: "🚨",
      titulo: "Furos de escala",
      desc: "Plantão descoberto tarde. Corre contra o tempo pra resolver sem solução estruturada.",
    },
  ];

  return (
    <section style={{ padding: "96px 24px", background: C.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: 999,
              background: `${C.warning}15`,
              color: C.warning,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 20,
              border: `1px solid ${C.warning}30`,
            }}
          >
            O problema
          </span>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: C.text,
              margin: "0 0 16px",
              letterSpacing: -0.5,
            }}
          >
            A gestão de escalas ainda é um caos
          </h2>
          <p
            style={{
              color: C.muted,
              fontSize: 17,
              maxWidth: 480,
              margin: "0 auto 56px",
            }}
          >
            A maioria dos hospitais ainda gerencia escalas com planilhas e
            grupos de WhatsApp.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {problemas.map((p, i) => (
            <Reveal key={i} delay={i * 100} direction="up">
              <div
                style={{
                  background: C.card,
                  borderRadius: 16,
                  padding: "28px 24px",
                  border: `1px solid ${C.border}`,
                  textAlign: "left",
                  borderTop: `3px solid ${C.warning}`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "transform 0.25s, box-shadow 0.25s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.04)";
                }}
              >
                <div style={{ fontSize: 34, marginBottom: 16 }}>{p.icon}</div>
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: 17,
                    fontWeight: 700,
                    color: C.text,
                  }}
                >
                  {p.titulo}
                </h3>
                <p
                  style={{
                    color: C.muted,
                    fontSize: 14,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solucao() {
  const solucoes = [
    {
      icon: "🗓️",
      titulo: "Escala centralizada",
      desc: "Tudo num lugar só. Hospital cria, médico visualiza. Sem planilha, sem WhatsApp.",
    },
    {
      icon: "🛒",
      titulo: "Marketplace de plantões",
      desc: "Furou a escala? Hospital publica. Médicos habilitados se candidatam em minutos.",
    },
    {
      icon: "💰",
      titulo: "Financeiro automático",
      desc: "Sistema calcula quanto cada médico recebe. Hospital sabe o custo total em tempo real.",
    },
  ];

  return (
    <section style={{ padding: "96px 24px", background: C.primary }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            A solução
          </span>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 16px",
              letterSpacing: -0.5,
            }}
          >
            Uma plataforma que resolve tudo
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 17,
              maxWidth: 480,
              margin: "0 auto 56px",
            }}
          >
            Do lançamento da escala ao pagamento, tudo automatizado e
            transparente.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {solucoes.map((s, i) => (
            <Reveal key={i} delay={i * 120} direction="up">
              <div
                style={{
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 20,
                  padding: "36px 28px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  textAlign: "left",
                  transition: "background 0.25s, transform 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = "";
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    marginBottom: 20,
                  }}
                >
                  {s.icon}
                </div>
                <h3
                  style={{
                    margin: "0 0 12px",
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {s.titulo}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParaQuem() {
  const checks = {
    medico: [
      "Visualize todos seus plantões do mês",
      "Saiba exatamente quanto vai receber",
      "Troque plantões com 1 clique",
      "Candidate-se a plantões extras",
      "Receba alertas de alterações na escala",
    ],
    hospital: [
      "Crie e gerencie escalas mensais",
      "Veja cobertura por horário e especialidade",
      "Publique plantões urgentes no marketplace",
      "Controle o custo total da escala",
      "Aprove trocas e substituições com 1 clique",
    ],
  };

  return (
    <section style={{ padding: "96px 24px", background: C.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: 999,
              background: `${C.accent}12`,
              color: C.accent,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 20,
              border: `1px solid ${C.accent}25`,
            }}
          >
            Para quem é
          </span>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: C.text,
              margin: 0,
              letterSpacing: -0.5,
            }}
          >
            Feito pra quem vive a escala
          </h2>
        </Reveal>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
        >
          <Reveal direction="left">
            <div
              style={{
                background: C.card,
                borderRadius: 22,
                padding: "40px 36px",
                border: `1.5px solid ${C.primary}20`,
                boxShadow: `0 4px 24px ${C.primary}10`,
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <div style={{ fontSize: 44, marginBottom: 16 }}>🩺</div>
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: C.primary,
                  marginBottom: 24,
                }}
              >
                Para o médico
              </h3>
              {checks.medico.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: `${C.primary}12`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        color: C.primary,
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </span>
                  </div>
                  <span style={{ color: C.muted, fontSize: 15 }}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right">
            <div
              style={{
                background: C.card,
                borderRadius: 22,
                padding: "40px 36px",
                border: `1.5px solid ${C.accent}25`,
                boxShadow: `0 4px 24px ${C.accent}10`,
                height: "100%",
                boxSizing: "border-box",
              }}
            >
              <div style={{ fontSize: 44, marginBottom: 16 }}>🏥</div>
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: C.accent,
                  marginBottom: 24,
                }}
              >
                Para o hospital
              </h3>
              {checks.hospital.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: `${C.accent}12`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{ color: C.accent, fontSize: 11, fontWeight: 700 }}
                    >
                      ✓
                    </span>
                  </div>
                  <span style={{ color: C.muted, fontSize: 15 }}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ComoFunciona() {
  const [lineRef, lineVisible] = useReveal();
  const passos = [
    {
      n: "01",
      titulo: "Hospital cria a escala",
      desc: "Lança os plantões do mês, define especialidades e atribui médicos em minutos.",
    },
    {
      n: "02",
      titulo: "Médico visualiza e confirma",
      desc: "Acessa o Click, vê todos seus plantões e confirma presença com 1 clique.",
    },
    {
      n: "03",
      titulo: "Sistema controla tudo",
      desc: "Trocas, candidaturas, financeiro e alertas — tudo automático e em tempo real.",
    },
  ];

  return (
    <section style={{ padding: "96px 24px", background: `${C.primary}04` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 72 }}>
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: 999,
              background: `${C.primary}10`,
              color: C.primary,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 20,
              border: `1px solid ${C.primary}20`,
            }}
          >
            Como funciona
          </span>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: C.text,
              margin: 0,
              letterSpacing: -0.5,
            }}
          >
            3 passos simples
          </h2>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            position: "relative",
          }}
        >
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              top: 34,
              left: "18%",
              right: "18%",
              height: 2,
              background: C.border,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`,
                width: lineVisible ? "100%" : "0%",
                transition: "width 1.2s cubic-bezier(0.22,1,0.36,1) 0.3s",
              }}
            />
          </div>

          {passos.map((p, i) => (
            <Reveal key={i} delay={i * 180} direction="up">
              <div style={{ textAlign: "center", position: "relative" }}>
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: 18,
                    background: C.card,
                    border: `2px solid ${C.border}`,
                    boxShadow: `0 4px 16px ${C.primary}10`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                    fontSize: 20,
                    fontWeight: 800,
                    color: C.primary,
                    position: "relative",
                    zIndex: 1,
                    transition:
                      "border-color 0.3s, box-shadow 0.3s, background 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = C.primary;
                    e.currentTarget.style.background = `${C.primary}08`;
                    e.currentTarget.style.boxShadow = `0 8px 24px ${C.primary}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = C.border;
                    e.currentTarget.style.background = C.card;
                    e.currentTarget.style.boxShadow = `0 4px 16px ${C.primary}10`;
                  }}
                >
                  {p.n}
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: C.text,
                    marginBottom: 10,
                  }}
                >
                  {p.titulo}
                </h3>
                <p
                  style={{
                    color: C.muted,
                    fontSize: 14,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [aberto, setAberto] = useState(null);
  const perguntas = [
    {
      p: "O sistema funciona para qualquer tipo de hospital?",
      r: "Sim. Funciona para hospitais, clínicas, UPAs e qualquer unidade de saúde que trabalhe com escalas médicas.",
    },
    {
      p: "O médico precisa instalar algum aplicativo?",
      r: "Não. O Click é 100% web, acessível pelo navegador em qualquer dispositivo — computador, tablet ou celular.",
    },
    {
      p: "Como funciona a aprovação de trocas de plantão?",
      r: "O médico solicita a troca, outro médico aceita, e o hospital aprova ou rejeita. Tudo registrado e rastreado na plataforma.",
    },
    {
      p: "O sistema calcula automaticamente o valor dos plantões?",
      r: "Sim. Com base nos plantões realizados, o Click calcula o valor bruto a receber por médico e o custo total por hospital.",
    },
  ];

  return (
    <section style={{ padding: "96px 24px", background: C.bg }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: 999,
              background: C.border,
              color: C.muted,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Dúvidas
          </span>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: C.text,
              margin: 0,
              letterSpacing: -0.5,
            }}
          >
            Perguntas frequentes
          </h2>
        </Reveal>

        {perguntas.map((item, i) => (
          <Reveal key={i} delay={i * 80}>
            <div
              style={{
                background: C.card,
                borderRadius: 12,
                marginBottom: 8,
                border: `1px solid ${aberto === i ? C.primary + "40" : C.border}`,
                overflow: "hidden",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition: "border-color 0.2s",
              }}
            >
              <button
                onClick={() => setAberto(aberto === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  background: "transparent",
                  border: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{ fontWeight: 600, fontSize: 15, color: C.text }}
                >
                  {item.p}
                </span>
                <span
                  style={{
                    color: C.primary,
                    fontSize: 22,
                    fontWeight: 300,
                    transition: "transform 0.3s",
                    transform: aberto === i ? "rotate(45deg)" : "none",
                    display: "block",
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: aberto === i ? "200px" : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <div
                  style={{
                    padding: "0 24px 20px",
                    color: C.muted,
                    fontSize: 15,
                    lineHeight: 1.7,
                  }}
                >
                  {item.r}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CTAFinal({ onLogin }) {
  return (
    <section style={{ padding: "80px 24px", background: C.bg }}>
      <Reveal direction="scale">
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            textAlign: "center",
            background: C.primary,
            borderRadius: 28,
            padding: "64px 40px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              borderRadius: "50%",
              top: -200,
              right: -100,
              background: `radial-gradient(circle, ${C.accent}25 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              bottom: -100,
              left: -50,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <h2
            style={{
              fontSize: 40,
              fontWeight: 900,
              margin: "0 0 16px",
              color: "#fff",
              letterSpacing: -1,
              position: "relative",
            }}
          >
            Chega de escala no WhatsApp
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 18,
              margin: "0 0 40px",
              lineHeight: 1.6,
              position: "relative",
            }}
          >
            Comece agora e veja a diferença na primeira semana.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              position: "relative",
            }}
          >
            <button
              style={{
                padding: "15px 36px",
                borderRadius: 10,
                border: "none",
                background: "#fff",
                color: C.primary,
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.target.style.transform = "")}
            >
              Solicitar acesso
            </button>
            <button
              onClick={onLogin}
              style={{
                padding: "15px 36px",
                borderRadius: 10,
                border: "1.5px solid rgba(255,255,255,0.3)",
                background: "transparent",
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.7)")
              }
              onMouseLeave={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.3)")
              }
            >
              Já tenho conta
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function LoginModal({ onClose, onLogin }) {
  const [perfil, setPerfil] = useState(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: 10,
    background: C.bg,
    border: `1.5px solid ${C.border}`,
    color: C.text,
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,26,42,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        padding: 24,
        backdropFilter: "blur(6px)",
        animation: "fadeIn 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: C.card,
          borderRadius: 24,
          padding: "40px 36px",
          border: `1px solid ${C.border}`,
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 32px 80px rgba(0,0,0,0.12)",
          animation: "slideUp 0.3s cubic-bezier(0.22,1,0.36,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: C.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
              }}
            >
              ⚕️
            </div>
            <span style={{ fontWeight: 900, fontSize: 18, color: C.primary }}>
              Click
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: C.muted,
              cursor: "pointer",
              fontSize: 24,
              lineHeight: 1,
              padding: "0 4px",
            }}
          >
            ×
          </button>
        </div>

        <h3
          style={{
            margin: "20px 0 4px",
            fontSize: 22,
            fontWeight: 700,
            color: C.text,
          }}
        >
          Entrar na plataforma
        </h3>
        <p style={{ color: C.muted, fontSize: 14, margin: "0 0 24px" }}>
          Selecione seu perfil e acesse sua conta
        </p>

        <p
          style={{
            fontSize: 12,
            color: C.muted,
            marginBottom: 8,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Perfil de acesso
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
            marginBottom: 24,
          }}
        >
          {[
            { id: "medico", label: "Médico", icon: "🩺", cor: C.primary },
            { id: "hospital", label: "Hospital", icon: "🏥", cor: C.accent },
            { id: "admin", label: "Admin", icon: "⚙️", cor: "#6B7280" },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPerfil(p.id)}
              style={{
                padding: "12px 8px",
                borderRadius: 10,
                cursor: "pointer",
                border: `2px solid ${perfil === p.id ? p.cor : C.border}`,
                background: perfil === p.id ? `${p.cor}10` : C.bg,
                color: perfil === p.id ? p.cor : C.muted,
                fontWeight: 700,
                fontSize: 12,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 5,
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 20 }}>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 18,
          }}
        >
          <input
            style={inputStyle}
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = C.primary)}
            onBlur={(e) => (e.target.style.borderColor = C.border)}
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = C.primary)}
            onBlur={(e) => (e.target.style.borderColor = C.border)}
          />
        </div>

        <button
          onClick={() => perfil && onLogin(perfil)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 10,
            border: "none",
            background: C.primary,
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer",
            boxShadow: `0 4px 16px ${C.primary}30`,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Entrar
        </button>

        <p
          style={{
            textAlign: "center",
            color: C.muted,
            fontSize: 13,
            margin: "16px 0 0",
          }}
        >
          <span
            style={{ color: C.accent, cursor: "pointer", fontWeight: 600 }}
          >
            Esqueci minha senha
          </span>
        </p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${C.border}`,
        padding: "32px 24px",
        background: C.card,
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 6,
            background: C.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
          }}
        >
          ⚕️
        </div>
        <span style={{ fontWeight: 800, color: C.primary, fontSize: 16 }}>
          Click
        </span>
      </div>
      <p style={{ margin: 0, color: C.muted2, fontSize: 13 }}>
        © 2026 Click · Todos os direitos reservados
      </p>
    </footer>
  );
}

const keyframes = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

export default function App() {
  const [modal, setModal] = useState(false);
  const [logado, setLogado] = useState(null);

  if (logado) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: C.bg,
          color: C.text,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 16,
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
          animation: "fadeIn 0.4s ease",
        }}
      >
        <style>{keyframes}</style>
        <div style={{ fontSize: 52 }}>
          {logado === "medico" ? "🩺" : logado === "hospital" ? "🏥" : "⚙️"}
        </div>
        <h2 style={{ margin: 0, color: C.primary, fontWeight: 800 }}>
          Bem-vindo ao painel{" "}
          {logado === "medico"
            ? "do médico"
            : logado === "hospital"
            ? "do hospital"
            : "admin"}
          !
        </h2>
        <p style={{ color: C.muted }}>Dashboard em construção...</p>
        <button
          onClick={() => setLogado(null)}
          style={{
            padding: "10px 24px",
            borderRadius: 8,
            border: `1px solid ${C.border}`,
            background: C.card,
            color: C.text,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← Voltar
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        background: C.bg,
        color: C.text,
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{keyframes}</style>
      <Navbar onLogin={() => setModal(true)} />
      <Hero onLogin={() => setModal(true)} />
      <Problema />
      <Solucao />
      <ParaQuem />
      <ComoFunciona />
      <FAQ />
      <CTAFinal onLogin={() => setModal(true)} />
      <Footer />
      {modal && (
        <LoginModal
          onClose={() => setModal(false)}
          onLogin={(p) => {
            setModal(false);
            setLogado(p);
          }}
        />
      )}
    </div>
  );
}
