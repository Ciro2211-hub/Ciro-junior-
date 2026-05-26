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
const medico = {
  nome: "Dr. Rafael Andrade",
  crm: "CRM-SP 183.442",
  especialidades: ["Clínica Médica", "Medicina de Emergência"],
  avatar: "RA",
};

const plantoes = [
  { id: 1, hospital: "Hospital São Lucas", setor: "Pronto-Socorro", especialidade: "Clínica Médica", data: "2026-06-02", inicio: "07:00", fim: "19:00", horas: 12, valor: 1800, status: "Confirmado", turno: "Diurno" },
  { id: 2, hospital: "UPA Leste", setor: "Emergência", especialidade: "Medicina de Emergência", data: "2026-06-05", inicio: "19:00", fim: "07:00", horas: 12, valor: 2100, status: "Escalado", turno: "Noturno" },
  { id: 3, hospital: "Hospital São Lucas", setor: "Pronto-Socorro", especialidade: "Clínica Médica", data: "2026-06-10", inicio: "07:00", fim: "19:00", horas: 12, valor: 1800, status: "Escalado", turno: "Diurno" },
  { id: 4, hospital: "Clínica Vida", setor: "Ambulatório", especialidade: "Clínica Médica", data: "2026-06-14", inicio: "08:00", fim: "14:00", horas: 6, valor: 900, status: "Confirmado", turno: "Diurno" },
  { id: 5, hospital: "UPA Leste", setor: "Emergência", especialidade: "Medicina de Emergência", data: "2026-06-18", inicio: "19:00", fim: "07:00", horas: 12, valor: 2100, status: "Escalado", turno: "Noturno" },
  { id: 6, hospital: "Hospital São Lucas", setor: "UTI", especialidade: "Clínica Médica", data: "2026-06-22", inicio: "07:00", fim: "19:00", horas: 12, valor: 2400, status: "Disponível para repasse", turno: "Diurno" },
  { id: 7, hospital: "Clínica Vida", setor: "Ambulatório", especialidade: "Clínica Médica", data: "2026-06-27", inicio: "08:00", fim: "14:00", horas: 6, valor: 900, status: "Escalado", turno: "Diurno" },
];

const marketplace = [
  { id: 1, hospital: "Hospital São Lucas", setor: "Pronto-Socorro", especialidade: "Clínica Médica", data: "2026-06-08", inicio: "19:00", fim: "07:00", horas: 12, valor: 2200, urgencia: "Alta", requisitos: "Mínimo 2 anos de PS" },
  { id: 2, hospital: "UPA Norte", setor: "Emergência", especialidade: "Medicina de Emergência", data: "2026-06-12", inicio: "07:00", fim: "19:00", horas: 12, valor: 1900, urgencia: "Normal", requisitos: "" },
  { id: 3, hospital: "Hospital Regional", setor: "Clínica Médica", especialidade: "Clínica Médica", data: "2026-06-15", inicio: "19:00", fim: "07:00", horas: 12, valor: 2000, urgencia: "Alta", requisitos: "ACLS obrigatório" },
  { id: 4, hospital: "UPA Leste", setor: "Emergência", especialidade: "Medicina de Emergência", data: "2026-06-20", inicio: "07:00", fim: "19:00", horas: 12, valor: 1950, urgencia: "Normal", requisitos: "" },
];

const trocas = [
  { id: 1, medico: "Dr. Caio Menezes", crm: "CRM-SP 201.774", hospital: "Hospital São Lucas", setor: "Pronto-Socorro", data: "2026-06-16", inicio: "07:00", fim: "19:00", valor: 1800, especialidade: "Clínica Médica" },
  { id: 2, medico: "Dra. Juliana Paz", crm: "CRM-SP 156.338", hospital: "UPA Leste", setor: "Emergência", data: "2026-06-21", inicio: "19:00", fim: "07:00", valor: 2100, especialidade: "Medicina de Emergência" },
];

const alertas = [
  { tipo: "info", msg: "Plantão em 2 dias — Hospital São Lucas, 02/06 às 07h." },
  { tipo: "warning", msg: "Confirme presença no plantão da UPA Leste até amanhã." },
  { tipo: "success", msg: "Troca aprovada pelo Hospital São Lucas para 22/06." },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
const statusColor = {
  "Confirmado": C.success,
  "Escalado": C.accent,
  "Realizado": C.muted,
  "Cancelado": C.danger,
  "Disponível para repasse": C.warning,
  "Em negociação": "#8B5CF6",
  "Aguardando aprovação": C.warning,
};

const urgenciaColor = { "Alta": C.danger, "Normal": C.accent };

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

// ── TABS ──────────────────────────────────────────────────────────────────────
function TabDashboard() {
  const proximo = plantoes[0];
  const totalMes = plantoes.reduce((s, p) => s + p.valor, 0);
  const totalHoras = plantoes.reduce((s, p) => s + p.horas, 0);
  const confirmados = plantoes.filter(p => p.status === "Confirmado").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Stats */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <StatCard icon="📅" label="Próximo plantão" value={`${proximo.data.split("-").reverse().slice(0, 2).join("/")} · ${proximo.inicio}`} sub={`${proximo.hospital} — ${proximo.setor}`} color={C.primary} />
        <StatCard icon="💰" label="Valor previsto (Jun)" value={`R$ ${totalMes.toLocaleString("pt-BR")}`} sub={`${plantoes.length} plantões · ${totalHoras}h`} color={C.success} />
        <StatCard icon="✅" label="Confirmados" value={confirmados} sub={`de ${plantoes.length} plantões`} color={C.accent} />
        <StatCard icon="⚠️" label="Alertas" value={alertas.length} sub="Requerem atenção" color={C.warning} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
        {/* Próximos plantões */}
        <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Próximos plantões</span>
            <span style={{ fontSize: 13, color: C.accent, fontWeight: 600, cursor: "pointer" }}>Ver todos</span>
          </div>
          {plantoes.slice(0, 5).map((p, i) => (
            <div key={p.id} style={{
              padding: "16px 24px", borderBottom: i < 4 ? `1px solid ${C.border}` : "none",
              display: "flex", alignItems: "center", gap: 16,
              transition: "background 0.15s", cursor: "pointer",
            }}
              onMouseEnter={e => e.currentTarget.style.background = `${C.primary}04`}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: p.turno === "Noturno" ? `${C.primary}12` : `${C.warning}12`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
              }}>
                {p.turno === "Noturno" ? "🌙" : "☀️"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: C.text, fontSize: 14, marginBottom: 3 }}>{p.hospital}</div>
                <div style={{ color: C.muted, fontSize: 13 }}>{p.setor} · {p.data.split("-").reverse().join("/")} · {p.inicio}–{p.fim}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontWeight: 700, color: C.primary, fontSize: 14 }}>R$ {p.valor.toLocaleString("pt-BR")}</div>
                <Badge label={p.status} color={statusColor[p.status] || C.muted} />
              </div>
            </div>
          ))}
        </div>

        {/* Alertas */}
        <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden", alignSelf: "start" }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Alertas</span>
          </div>
          {alertas.map((a, i) => {
            const cor = a.tipo === "success" ? C.success : a.tipo === "warning" ? C.warning : C.accent;
            return (
              <div key={i} style={{
                padding: "16px 24px", borderBottom: i < alertas.length - 1 ? `1px solid ${C.border}` : "none",
                display: "flex", gap: 12, alignItems: "flex-start",
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: cor, marginTop: 5, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{a.msg}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TabCalendario() {
  const [mesSel] = useState(5); // junho (0-indexed)
  const ano = 2026;
  const hoje = 26;

  const diasNoMes = new Date(ano, mesSel + 1, 0).getDate();
  const primeiroDia = new Date(ano, mesSel, 1).getDay();

  const plantaoPorDia = {};
  plantoes.forEach(p => {
    const dia = parseInt(p.data.split("-")[2]);
    if (!plantaoPorDia[dia]) plantaoPorDia[dia] = [];
    plantaoPorDia[dia].push(p);
  });

  const semanas = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Junho 2026</span>
          <div style={{ display: "flex", gap: 16 }}>
            {[{ cor: C.accent, l: "Diurno" }, { cor: C.primary, l: "Noturno" }, { cor: C.warning, l: "Repasse" }].map(l => (
              <div key={l.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: l.cor }} />
                <span style={{ fontSize: 12, color: C.muted }}>{l.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "20px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
            {semanas.map(s => (
              <div key={s} style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: C.muted, padding: "8px 0" }}>{s}</div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
            {Array.from({ length: primeiroDia }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: diasNoMes }).map((_, i) => {
              const dia = i + 1;
              const ps = plantaoPorDia[dia] || [];
              const isHoje = dia === hoje;
              return (
                <div key={dia} style={{
                  minHeight: 72, borderRadius: 10, padding: "6px",
                  background: isHoje ? `${C.primary}08` : "transparent",
                  border: isHoje ? `1.5px solid ${C.primary}30` : `1px solid ${C.border}`,
                  cursor: ps.length > 0 ? "pointer" : "default",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => ps.length > 0 && (e.currentTarget.style.background = `${C.primary}06`)}
                  onMouseLeave={e => e.currentTarget.style.background = isHoje ? `${C.primary}08` : "transparent"}
                >
                  <div style={{ fontSize: 12, fontWeight: isHoje ? 800 : 500, color: isHoje ? C.primary : C.text, marginBottom: 4 }}>{dia}</div>
                  {ps.map((p, pi) => {
                    const cor = p.status === "Disponível para repasse" ? C.warning : p.turno === "Noturno" ? C.primary : C.accent;
                    return (
                      <div key={pi} style={{
                        background: cor, borderRadius: 4, padding: "2px 4px",
                        fontSize: 10, color: "#fff", fontWeight: 600, marginBottom: 2,
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>{p.setor}</div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lista do mês */}
      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Todos os plantões de junho</span>
        </div>
        {plantoes.map((p, i) => (
          <div key={p.id} style={{
            padding: "16px 24px", borderBottom: i < plantoes.length - 1 ? `1px solid ${C.border}` : "none",
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{ width: 48, textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.primary }}>{p.data.split("-")[2]}</div>
              <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase" }}>jun</div>
            </div>
            <div style={{ width: 1, height: 36, background: C.border }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: C.text, fontSize: 14 }}>{p.hospital} — {p.setor}</div>
              <div style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>{p.inicio}–{p.fim} · {p.horas}h · {p.turno}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontWeight: 700, color: C.primary }}>R$ {p.valor.toLocaleString("pt-BR")}</span>
              <Badge label={p.status} color={statusColor[p.status] || C.muted} />
              {p.status === "Escalado" && (
                <button style={{
                  padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.warning}`,
                  background: `${C.warning}10`, color: C.warning,
                  fontSize: 12, fontWeight: 700, cursor: "pointer",
                }}>Repassar</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabFinanceiro() {
  const total = plantoes.reduce((s, p) => s + p.valor, 0);
  const totalHoras = plantoes.reduce((s, p) => s + p.horas, 0);
  const realizados = plantoes.filter(p => p.status === "Confirmado");
  const totalRealizado = realizados.reduce((s, p) => s + p.valor, 0);

  const porHospital = plantoes.reduce((acc, p) => {
    if (!acc[p.hospital]) acc[p.hospital] = { valor: 0, count: 0 };
    acc[p.hospital].valor += p.valor;
    acc[p.hospital].count += 1;
    return acc;
  }, {});

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Cards de resumo */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <StatCard icon="💰" label="Total previsto (Jun)" value={`R$ ${total.toLocaleString("pt-BR")}`} sub={`${plantoes.length} plantões · ${totalHoras}h`} color={C.success} />
        <StatCard icon="✅" label="Confirmado" value={`R$ ${totalRealizado.toLocaleString("pt-BR")}`} sub={`${realizados.length} plantões confirmados`} color={C.primary} />
        <StatCard icon="📊" label="Valor médio por plantão" value={`R$ ${Math.round(total / plantoes.length).toLocaleString("pt-BR")}`} sub="média do mês" color={C.accent} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Por hospital */}
        <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Por hospital</span>
          </div>
          {Object.entries(porHospital).map(([hosp, d], i, arr) => (
            <div key={hosp} style={{
              padding: "18px 24px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 600, color: C.text, fontSize: 14 }}>{hosp}</div>
                  <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{d.count} plantões</div>
                </div>
                <span style={{ fontWeight: 800, color: C.primary, fontSize: 15 }}>R$ {d.valor.toLocaleString("pt-BR")}</span>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: C.border, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 99,
                  background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`,
                  width: `${(d.valor / total) * 100}%`,
                  transition: "width 0.6s ease",
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Por turno */}
        <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Por turno</span>
          </div>
          {["Diurno", "Noturno"].map((turno, i) => {
            const ps = plantoes.filter(p => p.turno === turno);
            const val = ps.reduce((s, p) => s + p.valor, 0);
            const cor = turno === "Noturno" ? C.primary : C.warning;
            return (
              <div key={turno} style={{
                padding: "18px 24px", borderBottom: i === 0 ? `1px solid ${C.border}` : "none",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{turno === "Noturno" ? "🌙" : "☀️"}</span>
                    <div>
                      <div style={{ fontWeight: 600, color: C.text, fontSize: 14 }}>{turno}</div>
                      <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{ps.length} plantões</div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 800, color: cor, fontSize: 15 }}>R$ {val.toLocaleString("pt-BR")}</span>
                </div>
                <div style={{ height: 6, borderRadius: 99, background: C.border, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 99, background: cor, width: `${(val / total) * 100}%`, transition: "width 0.6s" }} />
                </div>
              </div>
            );
          })}

          <div style={{ padding: "20px 24px", borderTop: `1px solid ${C.border}`, background: `${C.primary}04` }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, color: C.text }}>Total geral</span>
              <span style={{ fontWeight: 800, color: C.primary, fontSize: 16 }}>R$ {total.toLocaleString("pt-BR")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Extrato */}
      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Extrato de plantões</span>
        </div>
        {plantoes.map((p, i) => (
          <div key={p.id} style={{
            padding: "14px 24px", borderBottom: i < plantoes.length - 1 ? `1px solid ${C.border}` : "none",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ fontSize: 16 }}>{p.turno === "Noturno" ? "🌙" : "☀️"}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: C.text, fontSize: 13 }}>{p.hospital} — {p.setor}</div>
              <div style={{ color: C.muted, fontSize: 12, marginTop: 1 }}>{p.data.split("-").reverse().join("/")} · {p.horas}h</div>
            </div>
            <Badge label={p.status} color={statusColor[p.status] || C.muted} />
            <span style={{ fontWeight: 700, color: C.primary, minWidth: 90, textAlign: "right" }}>R$ {p.valor.toLocaleString("pt-BR")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabMarketplace() {
  const [candidatados, setCandidatados] = useState([]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{
        background: `${C.accent}08`, borderRadius: 12, padding: "16px 20px",
        border: `1px solid ${C.accent}20`, display: "flex", alignItems: "center", gap: 12,
      }}>
        <span style={{ fontSize: 20 }}>💡</span>
        <span style={{ color: C.text, fontSize: 14 }}>Apenas plantões compatíveis com suas especialidades são exibidos aqui.</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {marketplace.map(p => {
          const jaCandidatou = candidatados.includes(p.id);
          return (
            <div key={p.id} style={{
              background: C.card, borderRadius: 16, border: `1px solid ${C.border}`,
              overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
              transition: "box-shadow 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.04)"}
            >
              <div style={{
                padding: "14px 20px", borderBottom: `1px solid ${C.border}`,
                background: `${urgenciaColor[p.urgencia]}08`,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{p.hospital}</span>
                <Badge label={`Urgência ${p.urgencia}`} color={urgenciaColor[p.urgencia]} />
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                  {[p.setor, p.especialidade, p.data.split("-").reverse().join("/")].map(t => (
                    <span key={t} style={{
                      padding: "4px 10px", borderRadius: 99, background: C.bg,
                      border: `1px solid ${C.border}`, color: C.muted, fontSize: 12,
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
                  {[
                    { l: "Horário", v: `${p.inicio}–${p.fim}` },
                    { l: "Duração", v: `${p.horas}h` },
                    { l: "Valor", v: `R$ ${p.valor.toLocaleString("pt-BR")}` },
                  ].map(d => (
                    <div key={d.l}>
                      <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{d.l}</div>
                      <div style={{ fontWeight: 700, color: C.text, fontSize: 14, marginTop: 2 }}>{d.v}</div>
                    </div>
                  ))}
                </div>
                {p.requisitos && (
                  <div style={{ background: `${C.warning}10`, borderRadius: 8, padding: "8px 12px", marginBottom: 12, fontSize: 12, color: C.warning }}>
                    ⚠️ {p.requisitos}
                  </div>
                )}
                <button
                  onClick={() => setCandidatados(c => jaCandidatou ? c.filter(x => x !== p.id) : [...c, p.id])}
                  style={{
                    width: "100%", padding: "11px", borderRadius: 10, border: "none",
                    background: jaCandidatou ? `${C.success}15` : C.primary,
                    color: jaCandidatou ? C.success : "#fff",
                    fontWeight: 700, fontSize: 14, cursor: "pointer",
                    border: jaCandidatou ? `1px solid ${C.success}30` : "none",
                    transition: "all 0.2s",
                  }}
                >
                  {jaCandidatou ? "✓ Candidatura enviada" : "Candidatar-se"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TabTrocas() {
  const [interesse, setInteresse] = useState([]);
  const meuRepasse = plantoes.find(p => p.status === "Disponível para repasse");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Meu plantão em repasse */}
      {meuRepasse && (
        <div style={{ background: C.card, borderRadius: 16, border: `1.5px solid ${C.warning}40`, overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: `1px solid ${C.border}`, background: `${C.warning}08`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Meu plantão em repasse</span>
            <Badge label="Disponível para repasse" color={C.warning} />
          </div>
          <div style={{ padding: "20px 24px", display: "flex", gap: 20, alignItems: "center" }}>
            <span style={{ fontSize: 28 }}>☀️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>{meuRepasse.hospital} — {meuRepasse.setor}</div>
              <div style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>{meuRepasse.data.split("-").reverse().join("/")} · {meuRepasse.inicio}–{meuRepasse.fim} · {meuRepasse.horas}h</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 800, color: C.primary, fontSize: 16 }}>R$ {meuRepasse.valor.toLocaleString("pt-BR")}</div>
              <div style={{ color: C.muted, fontSize: 12 }}>0 interessados</div>
            </div>
            <button style={{
              padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.danger}30`,
              background: `${C.danger}08`, color: C.danger, fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}>Cancelar repasse</button>
          </div>
        </div>
      )}

      {/* Plantões disponíveis de outros médicos */}
      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Plantões para troca de outros médicos</span>
        </div>
        {trocas.map((t, i) => {
          const temInteresse = interesse.includes(t.id);
          return (
            <div key={t.id} style={{
              padding: "20px 24px", borderBottom: i < trocas.length - 1 ? `1px solid ${C.border}` : "none",
              display: "flex", gap: 16, alignItems: "center",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: `${C.primary}12`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: 15, color: C.primary, flexShrink: 0,
              }}>
                {t.medico.split(" ").slice(1, 3).map(n => n[0]).join("")}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: C.text, fontSize: 14 }}>{t.medico}</div>
                <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{t.crm} · {t.especialidade}</div>
                <div style={{ color: C.muted, fontSize: 13, marginTop: 6 }}>
                  {t.hospital} — {t.setor} · {t.data.split("-").reverse().join("/")} · {t.inicio}–{t.fim}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontWeight: 800, color: C.primary, fontSize: 15, marginBottom: 8 }}>R$ {t.valor.toLocaleString("pt-BR")}</div>
                <button
                  onClick={() => setInteresse(c => temInteresse ? c.filter(x => x !== t.id) : [...c, t.id])}
                  style={{
                    padding: "8px 18px", borderRadius: 8, border: "none",
                    background: temInteresse ? `${C.success}15` : C.primary,
                    color: temInteresse ? C.success : "#fff",
                    border: temInteresse ? `1px solid ${C.success}30` : "none",
                    fontSize: 13, fontWeight: 700, cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {temInteresse ? "✓ Interesse enviado" : "Tenho interesse"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TabPerfil() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 680 }}>
      {/* Dados pessoais */}
      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Dados profissionais</span>
        </div>
        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 28 }}>
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              background: C.primary, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, fontWeight: 800,
            }}>{medico.avatar}</div>
            <div>
              <div style={{ fontWeight: 800, color: C.text, fontSize: 18 }}>{medico.nome}</div>
              <div style={{ color: C.muted, fontSize: 14, marginTop: 4 }}>{medico.crm}</div>
              <Badge label="Aprovado" color={C.success} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { l: "Nome completo", v: "Rafael Andrade Souza" },
              { l: "E-mail", v: "rafael.andrade@email.com" },
              { l: "Telefone", v: "(11) 99999-0000" },
              { l: "Estado do CRM", v: "São Paulo" },
            ].map(d => (
              <div key={d.l}>
                <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{d.l}</div>
                <div style={{ fontWeight: 600, color: C.text, fontSize: 14 }}>{d.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Especialidades */}
      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Especialidades</span>
          <button style={{
            padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.border}`,
            background: "transparent", color: C.primary, fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>+ Adicionar</button>
        </div>
        <div style={{ padding: "20px 24px", display: "flex", gap: 10, flexWrap: "wrap" }}>
          {medico.especialidades.map(e => (
            <div key={e} style={{
              padding: "8px 16px", borderRadius: 10,
              background: `${C.primary}10`, border: `1px solid ${C.primary}25`,
              color: C.primary, fontWeight: 600, fontSize: 14,
            }}>{e}</div>
          ))}
        </div>
      </div>

      {/* Hospitais vinculados */}
      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>Hospitais vinculados</span>
        </div>
        {["Hospital São Lucas", "UPA Leste", "Clínica Vida"].map((h, i, arr) => (
          <div key={h} style={{
            padding: "16px 24px", borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `${C.accent}12`, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 18,
            }}>🏥</div>
            <span style={{ fontWeight: 600, color: C.text, fontSize: 14 }}>{h}</span>
            <Badge label="Ativo" color={C.success} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard", icon: "🏠", label: "Dashboard" },
  { id: "calendario", icon: "📅", label: "Calendário" },
  { id: "financeiro", icon: "💰", label: "Financeiro" },
  { id: "marketplace", icon: "🛒", label: "Marketplace" },
  { id: "trocas", icon: "🔄", label: "Trocas" },
  { id: "perfil", icon: "👤", label: "Perfil" },
];

function Sidebar({ aba, setAba, onLogout }) {
  return (
    <aside style={{
      width: 240, flexShrink: 0, background: C.card,
      borderRight: `1px solid ${C.border}`,
      display: "flex", flexDirection: "column",
      height: "100vh", position: "sticky", top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9, background: C.primary,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
        }}>⚕️</div>
        <span style={{ fontWeight: 900, fontSize: 18, color: C.primary }}>Click</span>
      </div>

      {/* Médico */}
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10, background: C.primary,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 800, fontSize: 14, flexShrink: 0,
        }}>{medico.avatar}</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, color: C.text, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{medico.nome}</div>
          <div style={{ color: C.muted, fontSize: 11, marginTop: 1 }}>{medico.crm}</div>
        </div>
      </div>

      {/* Nav */}
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
              {item.id === "marketplace" && (
                <span style={{
                  marginLeft: "auto", background: C.danger, color: "#fff",
                  borderRadius: 99, fontSize: 10, fontWeight: 700,
                  padding: "1px 6px", minWidth: 18, textAlign: "center",
                }}>4</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
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
  dashboard: "Dashboard",
  calendario: "Calendário de plantões",
  financeiro: "Financeiro",
  marketplace: "Marketplace de plantões",
  trocas: "Trocas e repasses",
  perfil: "Meu perfil",
};

export default function MedicoDashboard({ onLogout }) {
  const [aba, setAba] = useState("dashboard");

  const conteudo = {
    dashboard: <TabDashboard />,
    calendario: <TabCalendario />,
    financeiro: <TabFinanceiro />,
    marketplace: <TabMarketplace />,
    trocas: <TabTrocas />,
    perfil: <TabPerfil />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <Sidebar aba={aba} setAba={setAba} onLogout={onLogout} />

      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{
          padding: "20px 32px", borderBottom: `1px solid ${C.border}`,
          background: C.card, display: "flex", justifyContent: "space-between", alignItems: "center",
          position: "sticky", top: 0, zIndex: 10,
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: C.text }}>{titulos[aba]}</h1>
            <p style={{ margin: 0, fontSize: 13, color: C.muted, marginTop: 2 }}>Junho 2026</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button style={{
              padding: "8px 18px", borderRadius: 8, border: "none",
              background: C.primary, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}>+ Solicitar plantão</button>
          </div>
        </div>

        {/* Conteúdo */}
        <div style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>
          {conteudo[aba]}
        </div>
      </main>
    </div>
  );
}
