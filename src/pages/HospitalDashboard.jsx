import { useState } from "react";

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
  success: "#10B981",
  danger: "#EF4444",
};

// ── MOCK DATA ─────────────────────────────────────────────────────────────────
const hospital = {
  nome: "Hospital São Lucas",
  cnpj: "12.345.678/0001-90",
  responsavel: "Adm. Carla Nogueira",
  avatar: "SL",
};

const medicosVinculados = [
  { id: 1, nome: "Dr. Rafael Andrade", crm: "CRM-SP 183.442", especialidades: ["Clínica Médica", "Medicina de Emergência"], setor: "Pronto-Socorro", status: "Ativo", turnoAtual: "07:00–19:00", saida: "19:00" },
  { id: 2, nome: "Dra. Juliana Paz", crm: "CRM-SP 156.338", especialidades: ["Medicina de Emergência"], setor: "Emergência", status: "Ativo", turnoAtual: "19:00–07:00", saida: "07:00" },
  { id: 3, nome: "Dr. Caio Menezes", crm: "CRM-SP 201.774", especialidades: ["Clínica Médica"], setor: "UTI", status: "Ativo", turnoAtual: "07:00–19:00", saida: "19:00" },
  { id: 4, nome: "Dr. Lucas Ferreira", crm: "CRM-SP 174.221", especialidades: ["Pediatria"], setor: "Pediatria", status: "Pendente", turnoAtual: "—", saida: "—" },
  { id: 5, nome: "Dra. Ana Costa", crm: "CRM-SP 198.005", especialidades: ["Cardiologia", "Clínica Médica"], setor: "UTI", status: "Ativo", turnoAtual: "07:00–19:00", saida: "19:00" },
  { id: 6, nome: "Dr. Marcos Vinicius", crm: "CRM-SP 167.890", especialidades: ["Anestesiologia"], setor: "Centro Cirúrgico", status: "Ativo", turnoAtual: "—", saida: "—" },
];

const escala = [
  { id: 1, medico: "Dr. Rafael Andrade", medicoId: 1, setor: "Pronto-Socorro", especialidade: "Clínica Médica", data: "2026-06-02", inicio: "07:00", fim: "19:00", horas: 12, valor: 1800, status: "Confirmado", turno: "Diurno" },
  { id: 2, medico: "Dra. Juliana Paz", medicoId: 2, setor: "Emergência", especialidade: "Medicina de Emergência", data: "2026-06-02", inicio: "19:00", fim: "07:00", horas: 12, valor: 2100, status: "Escalado", turno: "Noturno" },
  { id: 3, medico: "Dr. Caio Menezes", medicoId: 3, setor: "UTI", especialidade: "Clínica Médica", data: "2026-06-03", inicio: "07:00", fim: "19:00", horas: 12, valor: 2400, status: "Escalado", turno: "Diurno" },
  { id: 4, medico: null, medicoId: null, setor: "Pediatria", especialidade: "Pediatria", data: "2026-06-03", inicio: "07:00", fim: "19:00", horas: 12, valor: 1900, status: "Em aberto", turno: "Diurno" },
  { id: 5, medico: "Dra. Ana Costa", medicoId: 5, setor: "UTI", especialidade: "Cardiologia", data: "2026-06-04", inicio: "07:00", fim: "19:00", horas: 12, valor: 2600, status: "Confirmado", turno: "Diurno" },
  { id: 6, medico: null, medicoId: null, setor: "Pronto-Socorro", especialidade: "Clínica Médica", data: "2026-06-05", inicio: "19:00", fim: "07:00", horas: 12, valor: 2000, status: "Em aberto", turno: "Noturno" },
  { id: 7, medico: "Dr. Rafael Andrade", medicoId: 1, setor: "Pronto-Socorro", especialidade: "Clínica Médica", data: "2026-06-07", inicio: "07:00", fim: "19:00", horas: 12, valor: 1800, status: "Escalado", turno: "Diurno" },
  { id: 8, medico: null, medicoId: null, setor: "Emergência", especialidade: "Medicina de Emergência", data: "2026-06-08", inicio: "07:00", fim: "19:00", horas: 12, valor: 1950, status: "Em aberto", turno: "Diurno" },
  { id: 9, medico: "Dr. Caio Menezes", medicoId: 3, setor: "UTI", especialidade: "Clínica Médica", data: "2026-06-09", inicio: "19:00", fim: "07:00", horas: 12, valor: 2400, status: "Escalado", turno: "Noturno" },
  { id: 10, medico: "Dra. Ana Costa", medicoId: 5, setor: "Cardiologia", especialidade: "Cardiologia", data: "2026-06-10", inicio: "07:00", fim: "19:00", horas: 12, valor: 2600, status: "Confirmado", turno: "Diurno" },
];

const solicitacoes = [
  { id: 1, tipo: "candidatura", medico: "Dr. Bruno Alves", crm: "CRM-SP 210.334", especialidade: "Clínica Médica", avatar: "BA", plantao: { setor: "Pronto-Socorro", data: "2026-06-05", inicio: "19:00", fim: "07:00", valor: 2000 } },
  { id: 2, tipo: "candidatura", medico: "Dra. Fernanda Lima", crm: "CRM-SP 189.221", especialidade: "Medicina de Emergência", avatar: "FL", plantao: { setor: "Emergência", data: "2026-06-08", inicio: "07:00", fim: "19:00", valor: 1950 } },
  { id: 3, tipo: "troca", medicoOrigem: "Dr. Rafael Andrade", avatarOrigem: "RA", medicoDestino: "Dr. Caio Menezes", avatarDestino: "CM", plantao: { setor: "Pronto-Socorro", data: "2026-06-22", inicio: "07:00", fim: "19:00", valor: 1800 } },
];

const cobertura = [
  { especialidade: "Clínica Médica", total: 4, cobertos: 4 },
  { especialidade: "Medicina de Emergência", total: 3, cobertos: 2 },
  { especialidade: "Cardiologia", total: 2, cobertos: 2 },
  { especialidade: "Pediatria", total: 2, cobertos: 0 },
  { especialidade: "UTI", total: 3, cobertos: 3 },
  { especialidade: "Anestesiologia", total: 1, cobertos: 1 },
];

const alertas = [
  { tipo: "danger", msg: "Plantão de Pediatria em 03/06 sem cobertura — publicar no marketplace?" },
  { tipo: "danger", msg: "Plantão de Emergência em 08/06 sem médico atribuído." },
  { tipo: "warning", msg: "Solicitação de troca pendente: Rafael → Caio (22/06)." },
  { tipo: "info", msg: "2 candidaturas recebidas para plantões em aberto." },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
const statusColor = {
  "Confirmado": C.success,
  "Escalado": C.accent,
  "Em aberto": C.danger,
  "Realizado": C.muted,
  "Cancelado": C.danger,
};

function Badge({ label, color }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 99,
      background: `${color}15`, color, fontSize: 12, fontWeight: 700,
      border: `1px solid ${color}30`,
    }}>{label}</span>
  );
}

function StatCard({ icon, label, value, sub, color = C.primary }) {
  return (
    <div style={{
      background: C.card, borderRadius: 16, padding: "24px",
      border: `1px solid ${C.border}`, flex: 1, minWidth: 0,
      boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: `${color}12`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20,
        }}>{icon}</div>
        <span style={{ color: C.muted, fontSize: 13, fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function AvatarCircle({ initials, color = C.primary, size = 40 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: Math.round(size * 0.28),
      background: color, color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 800, fontSize: size * 0.35, flexShrink: 0,
    }}>{initials}</div>
  );
}

// ── TAB: DASHBOARD ────────────────────────────────────────────────────────────
function TabDashboard() {
  const agora = medicosVinculados.filter(m => m.status === "Ativo" && m.turnoAtual !== "—");
  const emAberto = escala.filter(p => p.status === "Em aberto").length;
  const custo = escala.reduce((s, p) => s + p.valor, 0);
  const especialidadesCob = cobertura.filter(c => c.cobertos > 0).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Stats */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <StatCard icon="👨‍⚕️" label="Médicos agora" value={agora.length} sub="em plantão ativo" color={C.primary} />
        <StatCard icon="🩺" label="Especialidades cobertas" value={`${especialidadesCob}/${cobertura.length}`} sub="neste momento" color={C.success} />
        <StatCard icon="⚠️" label="Plantões em aberto" value={emAberto} sub="sem médico atribuído" color={C.danger} />
        <StatCard icon="💰" label="Custo previsto (Jun)" value={`R$ ${custo.toLocaleString("pt-BR")}`} sub={`${escala.length} plantões no mês`} color={C.accent} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
        {/* Médicos em plantão agora */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Médicos em plantão agora</span>
              <Badge label={`${agora.length} ativos`} color={C.success} />
            </div>
            {agora.map((m, i) => (
              <div key={m.id} style={{
                padding: "16px 24px",
                borderBottom: i < agora.length - 1 ? `1px solid ${C.border}` : "none",
                display: "flex", alignItems: "center", gap: 14,
                transition: "background 0.15s", cursor: "default",
              }}
                onMouseEnter={e => e.currentTarget.style.background = `${C.primary}04`}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <AvatarCircle initials={m.nome.split(" ").slice(1, 3).map(n => n[0]).join("")} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: C.text, fontSize: 14 }}>{m.nome}</div>
                  <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{m.setor} · {m.especialidades[0]}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontWeight: 600, color: C.text, fontSize: 13 }}>{m.turnoAtual}</div>
                  <div style={{ color: C.muted, fontSize: 12 }}>saída {m.saida}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Cobertura por especialidade */}
          <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Cobertura por especialidade</span>
            </div>
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
              {cobertura.map(c => {
                const pct = c.total === 0 ? 0 : (c.cobertos / c.total) * 100;
                const cor = c.cobertos === 0 ? C.danger : c.cobertos < c.total ? C.warning : C.success;
                return (
                  <div key={c.especialidade}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{c.especialidade}</span>
                      <span style={{ fontSize: 12, color: cor, fontWeight: 700 }}>{c.cobertos}/{c.total}</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: C.border, overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 99, background: cor, width: `${pct}%`, transition: "width 0.6s" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Alertas */}
        <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden", alignSelf: "start" }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Alertas operacionais</span>
          </div>
          {alertas.map((a, i) => {
            const cor = a.tipo === "danger" ? C.danger : a.tipo === "warning" ? C.warning : C.accent;
            return (
              <div key={i} style={{
                padding: "16px 24px",
                borderBottom: i < alertas.length - 1 ? `1px solid ${C.border}` : "none",
                display: "flex", gap: 12, alignItems: "flex-start",
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: cor, marginTop: 5, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{a.msg}</span>
                  {a.tipo === "danger" && (
                    <div style={{ marginTop: 8 }}>
                      <button style={{
                        padding: "5px 12px", borderRadius: 7, border: `1px solid ${C.danger}30`,
                        background: `${C.danger}08`, color: C.danger, fontSize: 11, fontWeight: 700, cursor: "pointer",
                      }}>Publicar no marketplace</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── TAB: ESCALA ───────────────────────────────────────────────────────────────
function TabEscala() {
  const emAberto = escala.filter(p => p.status === "Em aberto");
  const semanas = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const setorColor = {
    "Pronto-Socorro": C.accent,
    "Emergência": C.danger,
    "UTI": "#8B5CF6",
    "Pediatria": "#EC4899",
    "Cardiologia": C.success,
    "Centro Cirúrgico": C.warning,
    "Ambulatório": C.primary,
  };

  const escalaByDia = escala.reduce((acc, p) => {
    const dia = parseInt(p.data.split("-")[2]);
    if (!acc[dia]) acc[dia] = [];
    acc[dia].push(p);
    return acc;
  }, {});

  const diasSemana = [2, 3, 4, 5, 6, 7, 8];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button style={{
            padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.border}`,
            background: C.card, color: C.muted, fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>← Mai</button>
          <span style={{ fontWeight: 800, color: C.text, fontSize: 16 }}>Junho 2026</span>
          <button style={{
            padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.border}`,
            background: C.card, color: C.muted, fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>Jul →</button>
        </div>
        <button style={{
          padding: "10px 20px", borderRadius: 9, border: "none",
          background: C.primary, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
        }}>+ Novo plantão</button>
      </div>

      {/* Grade semanal */}
      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: `1px solid ${C.border}` }}>
          {diasSemana.map((dia, i) => (
            <div key={dia} style={{
              padding: "12px 8px", textAlign: "center",
              borderRight: i < 6 ? `1px solid ${C.border}` : "none",
              background: `${C.primary}04`,
            }}>
              <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase" }}>{semanas[i]}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.primary, marginTop: 2 }}>{String(dia).padStart(2, "0")}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", minHeight: 200 }}>
          {diasSemana.map((dia, i) => {
            const ps = escalaByDia[dia] || [];
            return (
              <div key={dia} style={{
                padding: "10px 8px", minHeight: 160,
                borderRight: i < 6 ? `1px solid ${C.border}` : "none",
                display: "flex", flexDirection: "column", gap: 4,
              }}>
                {ps.map(p => {
                  const cor = p.status === "Em aberto" ? C.danger : (setorColor[p.setor] || C.accent);
                  return (
                    <div key={p.id} style={{
                      background: `${cor}15`, borderLeft: `3px solid ${cor}`,
                      borderRadius: 6, padding: "5px 7px",
                      cursor: "pointer", transition: "background 0.15s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = `${cor}25`}
                      onMouseLeave={e => e.currentTarget.style.background = `${cor}15`}
                    >
                      <div style={{ fontSize: 10, fontWeight: 700, color: cor }}>{p.setor}</div>
                      <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>
                        {p.medico ? p.medico.split(" ")[1] : "⚠️ Em aberto"}
                      </div>
                      <div style={{ fontSize: 9, color: C.muted2 }}>{p.inicio}–{p.fim}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Plantões em aberto */}
      {emAberto.length > 0 && (
        <div style={{ background: C.card, borderRadius: 16, border: `1.5px solid ${C.danger}30`, overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}`, background: `${C.danger}06`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>🚨</span>
              <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Plantões em aberto</span>
            </div>
            <Badge label={`${emAberto.length} sem médico`} color={C.danger} />
          </div>
          {emAberto.map((p, i) => (
            <div key={p.id} style={{
              padding: "18px 24px",
              borderBottom: i < emAberto.length - 1 ? `1px solid ${C.border}` : "none",
              display: "flex", alignItems: "center", gap: 16,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: C.text, fontSize: 14 }}>{p.setor} — {p.especialidade}</div>
                <div style={{ color: C.muted, fontSize: 13, marginTop: 3 }}>{p.data.split("-").reverse().join("/")} · {p.inicio}–{p.fim} · {p.horas}h · {p.turno}</div>
              </div>
              <span style={{ fontWeight: 800, color: C.primary }}>R$ {p.valor.toLocaleString("pt-BR")}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{
                  padding: "7px 14px", borderRadius: 8, border: `1px solid ${C.accent}30`,
                  background: `${C.accent}08`, color: C.accent, fontSize: 12, fontWeight: 700, cursor: "pointer",
                }}>Atribuir médico</button>
                <button style={{
                  padding: "7px 14px", borderRadius: 8, border: "none",
                  background: C.danger, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
                }}>Publicar marketplace</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── TAB: MARKETPLACE ──────────────────────────────────────────────────────────
function TabMarketplace() {
  const [acoes, setAcoes] = useState({});

  const candidaturas = solicitacoes.filter(s => s.tipo === "candidatura");
  const trocas = solicitacoes.filter(s => s.tipo === "troca");

  const agir = (id, acao) => setAcoes(a => ({ ...a, [id]: acao }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Candidaturas recebidas */}
        <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Candidaturas recebidas</span>
            <Badge label={`${candidaturas.length} pendentes`} color={C.warning} />
          </div>
          {candidaturas.map((s, i) => {
            const acao = acoes[s.id];
            return (
              <div key={s.id} style={{
                padding: "20px 24px",
                borderBottom: i < candidaturas.length - 1 ? `1px solid ${C.border}` : "none",
              }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                  <AvatarCircle initials={s.avatar} color={C.primary} size={42} />
                  <div>
                    <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{s.medico}</div>
                    <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{s.crm} · {s.especialidade}</div>
                  </div>
                </div>
                <div style={{ background: C.bg, borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
                  <div style={{ fontWeight: 600, color: C.text, fontSize: 13 }}>{s.plantao.setor}</div>
                  <div style={{ color: C.muted, fontSize: 12, marginTop: 3 }}>
                    {s.plantao.data.split("-").reverse().join("/")} · {s.plantao.inicio}–{s.plantao.fim} · R$ {s.plantao.valor.toLocaleString("pt-BR")}
                  </div>
                </div>
                {acao ? (
                  <div style={{
                    padding: "8px 14px", borderRadius: 8, textAlign: "center",
                    background: acao === "aceito" ? `${C.success}12` : `${C.danger}10`,
                    color: acao === "aceito" ? C.success : C.danger,
                    fontWeight: 700, fontSize: 13,
                    border: `1px solid ${acao === "aceito" ? C.success : C.danger}30`,
                  }}>
                    {acao === "aceito" ? "✓ Candidatura aceita" : "✗ Candidatura recusada"}
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => agir(s.id, "aceito")} style={{
                      flex: 1, padding: "9px", borderRadius: 8, border: "none",
                      background: C.success, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
                    }}>Aceitar</button>
                    <button onClick={() => agir(s.id, "recusado")} style={{
                      flex: 1, padding: "9px", borderRadius: 8,
                      border: `1px solid ${C.danger}30`, background: `${C.danger}08`,
                      color: C.danger, fontWeight: 700, fontSize: 13, cursor: "pointer",
                    }}>Recusar</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Trocas pendentes */}
        <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Trocas pendentes de aprovação</span>
            <Badge label={`${trocas.length} pendente`} color={C.warning} />
          </div>
          {trocas.map((s, i) => {
            const acao = acoes[`t${s.id}`];
            return (
              <div key={s.id} style={{
                padding: "20px 24px",
                borderBottom: i < trocas.length - 1 ? `1px solid ${C.border}` : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <AvatarCircle initials={s.avatarOrigem} color={C.primary} size={38} />
                  <div style={{ color: C.muted, fontSize: 20 }}>→</div>
                  <AvatarCircle initials={s.avatarDestino} color={C.accent} size={38} />
                  <div style={{ marginLeft: 4 }}>
                    <div style={{ fontWeight: 600, color: C.text, fontSize: 13 }}>{s.medicoOrigem}</div>
                    <div style={{ color: C.muted, fontSize: 12 }}>→ {s.medicoDestino}</div>
                  </div>
                </div>
                <div style={{ background: C.bg, borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
                  <div style={{ fontWeight: 600, color: C.text, fontSize: 13 }}>{s.plantao.setor}</div>
                  <div style={{ color: C.muted, fontSize: 12, marginTop: 3 }}>
                    {s.plantao.data.split("-").reverse().join("/")} · {s.plantao.inicio}–{s.plantao.fim} · R$ {s.plantao.valor.toLocaleString("pt-BR")}
                  </div>
                </div>
                {acao ? (
                  <div style={{
                    padding: "8px 14px", borderRadius: 8, textAlign: "center",
                    background: acao === "aprovado" ? `${C.success}12` : `${C.danger}10`,
                    color: acao === "aprovado" ? C.success : C.danger,
                    fontWeight: 700, fontSize: 13,
                    border: `1px solid ${acao === "aprovado" ? C.success : C.danger}30`,
                  }}>
                    {acao === "aprovado" ? "✓ Troca aprovada" : "✗ Troca rejeitada"}
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => agir(`t${s.id}`, "aprovado")} style={{
                      flex: 1, padding: "9px", borderRadius: 8, border: "none",
                      background: C.success, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
                    }}>Aprovar</button>
                    <button onClick={() => agir(`t${s.id}`, "rejeitado")} style={{
                      flex: 1, padding: "9px", borderRadius: 8,
                      border: `1px solid ${C.danger}30`, background: `${C.danger}08`,
                      color: C.danger, fontWeight: 700, fontSize: 13, cursor: "pointer",
                    }}>Rejeitar</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── TAB: FINANCEIRO ───────────────────────────────────────────────────────────
function TabFinanceiro() {
  const total = escala.reduce((s, p) => s + p.valor, 0);
  const realizado = escala.filter(p => p.status === "Confirmado").reduce((s, p) => s + p.valor, 0);
  const previsto = total - realizado;

  const porMedico = escala.filter(p => p.medico).reduce((acc, p) => {
    if (!acc[p.medico]) acc[p.medico] = { valor: 0, count: 0 };
    acc[p.medico].valor += p.valor;
    acc[p.medico].count += 1;
    return acc;
  }, {});

  const porSetor = escala.reduce((acc, p) => {
    if (!acc[p.setor]) acc[p.setor] = { valor: 0, count: 0 };
    acc[p.setor].valor += p.valor;
    acc[p.setor].count += 1;
    return acc;
  }, {});

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <StatCard icon="💰" label="Custo total (Jun)" value={`R$ ${total.toLocaleString("pt-BR")}`} sub={`${escala.length} plantões no mês`} color={C.primary} />
        <StatCard icon="✅" label="Custo realizado" value={`R$ ${realizado.toLocaleString("pt-BR")}`} sub="plantões confirmados" color={C.success} />
        <StatCard icon="⏳" label="Custo previsto restante" value={`R$ ${previsto.toLocaleString("pt-BR")}`} sub="ainda não confirmados" color={C.warning} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Por médico */}
        <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Por médico</span>
          </div>
          {Object.entries(porMedico).sort((a, b) => b[1].valor - a[1].valor).map(([nome, d], i, arr) => (
            <div key={nome} style={{
              padding: "16px 24px",
              borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 600, color: C.text, fontSize: 13 }}>{nome}</div>
                  <div style={{ color: C.muted, fontSize: 12, marginTop: 1 }}>{d.count} plantões</div>
                </div>
                <span style={{ fontWeight: 800, color: C.primary }}>R$ {d.valor.toLocaleString("pt-BR")}</span>
              </div>
              <div style={{ height: 5, borderRadius: 99, background: C.border, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`, width: `${(d.valor / total) * 100}%`, transition: "width 0.6s" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Por setor */}
        <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Por setor</span>
          </div>
          {Object.entries(porSetor).sort((a, b) => b[1].valor - a[1].valor).map(([setor, d], i, arr) => (
            <div key={setor} style={{
              padding: "16px 24px",
              borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 600, color: C.text, fontSize: 13 }}>{setor}</div>
                  <div style={{ color: C.muted, fontSize: 12, marginTop: 1 }}>{d.count} plantões</div>
                </div>
                <span style={{ fontWeight: 800, color: C.accent }}>R$ {d.valor.toLocaleString("pt-BR")}</span>
              </div>
              <div style={{ height: 5, borderRadius: 99, background: C.border, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 99, background: C.accent, width: `${(d.valor / total) * 100}%`, transition: "width 0.6s" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extrato */}
      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Extrato completo</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: `${C.primary}04` }}>
                {["Médico", "Data", "Setor", "Turno", "Horas", "Valor", "Status"].map(h => (
                  <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {escala.map((p, i) => (
                <tr key={p.id} style={{ borderTop: `1px solid ${C.border}` }}
                  onMouseEnter={e => e.currentTarget.style.background = `${C.primary}03`}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "14px 20px", fontSize: 13, fontWeight: 600, color: C.text }}>{p.medico || <span style={{ color: C.danger }}>Em aberto</span>}</td>
                  <td style={{ padding: "14px 20px", fontSize: 13, color: C.muted, whiteSpace: "nowrap" }}>{p.data.split("-").reverse().join("/")}</td>
                  <td style={{ padding: "14px 20px", fontSize: 13, color: C.muted }}>{p.setor}</td>
                  <td style={{ padding: "14px 20px", fontSize: 13, color: C.muted }}>{p.turno}</td>
                  <td style={{ padding: "14px 20px", fontSize: 13, color: C.muted }}>{p.horas}h</td>
                  <td style={{ padding: "14px 20px", fontSize: 13, fontWeight: 700, color: C.primary }}>R$ {p.valor.toLocaleString("pt-BR")}</td>
                  <td style={{ padding: "14px 20px" }}><Badge label={p.status} color={statusColor[p.status] || C.muted} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── TAB: MÉDICOS ──────────────────────────────────────────────────────────────
function TabMedicos() {
  const [busca, setBusca] = useState("");
  const filtrados = medicosVinculados.filter(m =>
    m.nome.toLowerCase().includes(busca.toLowerCase()) ||
    m.especialidades.some(e => e.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.muted, fontSize: 16 }}>🔍</span>
          <input
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar por nome ou especialidade..."
            style={{
              width: "100%", padding: "11px 16px 11px 40px",
              borderRadius: 10, border: `1.5px solid ${C.border}`,
              background: C.card, color: C.text, fontSize: 14,
              outline: "none", boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = C.primary}
            onBlur={e => e.target.style.borderColor = C.border}
          />
        </div>
        <button style={{
          padding: "11px 20px", borderRadius: 10, border: "none",
          background: C.primary, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
          whiteSpace: "nowrap",
        }}>+ Adicionar médico</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {filtrados.map(m => (
          <div key={m.id} style={{
            background: C.card, borderRadius: 16, border: `1px solid ${C.border}`,
            padding: "24px", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
            transition: "box-shadow 0.2s, transform 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = ""; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <AvatarCircle initials={m.nome.split(" ").slice(1, 3).map(n => n[0]).join("")} size={44} />
                <div>
                  <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{m.nome}</div>
                  <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{m.crm}</div>
                </div>
              </div>
              <Badge label={m.status} color={m.status === "Ativo" ? C.success : C.warning} />
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Especialidades</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {m.especialidades.map(e => (
                  <span key={e} style={{
                    padding: "4px 10px", borderRadius: 99,
                    background: `${C.primary}10`, border: `1px solid ${C.primary}20`,
                    color: C.primary, fontSize: 12, fontWeight: 600,
                  }}>{e}</span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>Setor atual</div>
                <div style={{ fontSize: 13, color: C.text, fontWeight: 600, marginTop: 2 }}>{m.setor}</div>
              </div>
              <button style={{
                padding: "7px 14px", borderRadius: 8, border: `1px solid ${C.border}`,
                background: "transparent", color: C.muted, fontSize: 12, fontWeight: 600, cursor: "pointer",
                transition: "all 0.15s",
              }}
                onMouseEnter={e => { e.target.style.borderColor = C.primary; e.target.style.color = C.primary; }}
                onMouseLeave={e => { e.target.style.borderColor = C.border; e.target.style.color = C.muted; }}
              >Ver perfil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard", icon: "🏥", label: "Dashboard" },
  { id: "escala", icon: "📋", label: "Escala" },
  { id: "marketplace", icon: "🛒", label: "Marketplace", badge: solicitacoes.length },
  { id: "financeiro", icon: "💰", label: "Financeiro" },
  { id: "medicos", icon: "👥", label: "Médicos" },
];

function Sidebar({ aba, setAba, onLogout }) {
  return (
    <aside style={{
      width: 240, flexShrink: 0, background: C.card,
      borderRight: `1px solid ${C.border}`,
      display: "flex", flexDirection: "column",
      height: "100vh", position: "sticky", top: 0,
    }}>
      <div style={{ padding: "24px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9, background: C.primary,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
        }}>⚕️</div>
        <span style={{ fontWeight: 900, fontSize: 18, color: C.primary }}>Click</span>
      </div>

      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10, background: C.accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 800, fontSize: 14, flexShrink: 0,
        }}>{hospital.avatar}</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, color: C.text, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{hospital.nome}</div>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 1 }}>{hospital.responsavel}</div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "12px 12px" }}>
        {navItems.map(item => {
          const ativo = aba === item.id;
          return (
            <button key={item.id} onClick={() => setAba(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 12,
              padding: "11px 12px", borderRadius: 10, border: "none",
              background: ativo ? `${C.primary}12` : "transparent",
              color: ativo ? C.primary : C.muted,
              fontWeight: ativo ? 700 : 500, fontSize: 14,
              cursor: "pointer", textAlign: "left", marginBottom: 4,
              transition: "all 0.15s",
            }}
              onMouseEnter={e => !ativo && (e.currentTarget.style.background = `${C.primary}06`)}
              onMouseLeave={e => !ativo && (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{item.icon}</span>
              {item.label}
              {item.badge && (
                <span style={{
                  marginLeft: "auto", background: C.danger, color: "#fff",
                  borderRadius: 99, fontSize: 10, fontWeight: 700,
                  padding: "1px 6px",
                }}>{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "16px 12px", borderTop: `1px solid ${C.border}` }}>
        <button onClick={onLogout} style={{
          width: "100%", padding: "10px 12px", borderRadius: 10,
          border: "none", background: "transparent",
          color: C.muted, fontWeight: 500, fontSize: 14, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 12,
          transition: "all 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = `${C.danger}08`; e.currentTarget.style.color = C.danger; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.muted; }}
        >
          <span style={{ fontSize: 16 }}>🚪</span> Sair
        </button>
      </div>
    </aside>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
const titulos = {
  dashboard: "Dashboard operacional",
  escala: "Gestão de escala",
  marketplace: "Marketplace",
  financeiro: "Financeiro",
  medicos: "Médicos",
};

export default function HospitalDashboard({ onLogout }) {
  const [aba, setAba] = useState("dashboard");

  const conteudo = {
    dashboard: <TabDashboard />,
    escala: <TabEscala />,
    marketplace: <TabMarketplace />,
    financeiro: <TabFinanceiro />,
    medicos: <TabMedicos />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <Sidebar aba={aba} setAba={setAba} onLogout={onLogout} />

      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div style={{
          padding: "20px 32px", borderBottom: `1px solid ${C.border}`,
          background: C.card, display: "flex", justifyContent: "space-between", alignItems: "center",
          position: "sticky", top: 0, zIndex: 10,
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.text }}>{titulos[aba]}</h1>
            <p style={{ margin: 0, fontSize: 13, color: C.muted, marginTop: 2 }}>Hospital São Lucas · Junho 2026</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {solicitacoes.length > 0 && (
              <div style={{
                padding: "8px 16px", borderRadius: 8,
                background: `${C.warning}12`, border: `1px solid ${C.warning}30`,
                color: C.warning, fontSize: 13, fontWeight: 700,
              }}>
                ⚠️ {solicitacoes.length} aprovações pendentes
              </div>
            )}
            <button style={{
              padding: "8px 18px", borderRadius: 8, border: "none",
              background: C.primary, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}>+ Novo plantão</button>
          </div>
        </div>

        <div style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>
          {conteudo[aba]}
        </div>
      </main>
    </div>
  );
}
