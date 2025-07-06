import React, { useEffect, useState } from "react";

const curriculum = [
  {
    semester: 1,
    subjects: [
      { name: "Matemática Básica", code: "MTM0108", credits: 4, prereq: [] },
      { name: "Proyección Social I", code: "EPS0101", credits: 1, prereq: [] },
      { name: "Deporte", code: "EDP0103", credits: 2, prereq: [] },
      { name: "Cultura", code: "ECT0103", credits: 2, prereq: [] },
      { name: "Proyección Social II", code: "EPS0102", credits: 1, prereq: [] },
      { name: "Comunicación y Lenguaje I", code: "CYL0101", credits: 3, prereq: [] },
      { name: "Communicative English A1", code: "CEP0001", credits: 5, prereq: [] },
      { name: "Contabilidad I", code: "ADM0109", credits: 3, prereq: [] },
      { name: "Principios de Administración", code: "ADM0110", credits: 3, prereq: [] },
      { name: "Estadística I", code: "ADM0111", credits: 3, prereq: [] },
      { name: "Actividades de Facultad", code: "EAF0101", credits: 2, prereq: [] },
    ],
  },
  {
    semester: 2,
    subjects: [
      { name: "OMC y Organismos Multilaterales", code: "NEI0205", credits: 3, prereq: [] },
      { name: "Comunicación y Lenguaje II", code: "CYL0102", credits: 3, prereq: ["CYL0101"] },
      { name: "Cálculo I", code: "MTM0102", credits: 4, prereq: ["MTM0108", "CEP0001"] },
      { name: "Contabilidad II", code: "ADM0112", credits: 3, prereq: ["ADM0109"] },
      { name: "Estadística II", code: "ADM0113", credits: 3, prereq: ["ADM0111"] },
      { name: "Communicative English A2", code: "CEP0002", credits: 5, prereq: ["CEP0001"] },
    ],
  },
  {
    semester: 3,
    subjects: [
      { name: "Microeconomía", code: "ADM0212", credits: 3, prereq: ["CEP0002", "MTM0102"] },
      { name: "Derecho Empresarial I", code: "DRO0425", credits: 3, prereq: [] },
      { name: "Communicative English A2+", code: "CEP0003", credits: 5, prereq: ["CEP0002"] },
      { name: "Política Comercial", code: "NEI0102", credits: 3, prereq: [] },
      { name: "Gestión Ambiental en los Negocios Internacionales", code: "NEI0204", credits: 3, prereq: ["NEI0205"] },
      { name: "Metodología de la Investigación", code: "INV0205", credits: 3, prereq: ["ADM0113", "CYL0102"] },
    ],
  },
  {
    semester: 4,
    subjects: [
      { name: "Integración Económica Centroamericana", code: "NEI0201", credits: 3, prereq: [] },
      { name: "Derecho Empresarial II", code: "DRO0426", credits: 3, prereq: ["DRO0425"] },
      { name: "Finanzas", code: "ADM0312", credits: 3, prereq: ["ADM0112"] },
      { name: "Macroeconomía", code: "ADM0216", credits: 3, prereq: ["CEP0003", "MTM0102"] },
      { name: "Communicative English B1", code: "CEP0004", credits: 5, prereq: ["CEP0003"] },
      { name: "Matemática Financiera", code: "ADM0306", credits: 3, prereq: ["MTM0108"] },
    ],
  },
  {
    semester: 5,
    subjects: [
      { name: "Electiva I", code: "ELE0101", credits: 3, prereq: [] },
      { name: "Communicative English B1+", code: "CEP0005", credits: 5, prereq: ["CEP0004"] },
      { name: "Cadenas de Valor", code: "NEI0407", credits: 3, prereq: [] },
      { name: "Responsabilidad Social", code: "ADM0464", credits: 3, prereq: [] },
      { name: "Redes Sociales y Marketing Electrónico", code: "MAR0328", credits: 3, prereq: ["CEP0004"] },
    ],
  },
  {
    semester: 6,
    subjects: [
      { name: "Propiedad Intelectual", code: "NEI0302", credits: 3, prereq: [] },
      { name: "Communicative English B2", code: "CEP0006", credits: 5, prereq: ["CEP0005"] },
      { name: "Acuerdos Comerciales Regionales", code: "NEI0310", credits: 3, prereq: ["CEP0005"] },
      { name: "Derecho de Competencia", code: "NEI0304", credits: 3, prereq: ["DRO0425"] },
      { name: "Seminario Entorno Socioeconómico", code: "NEI0311", credits: 3, prereq: [] },
    ],
  },
  {
    semester: 7,
    subjects: [
      { name: "Legislación y Gestión Aduanera", code: "NEI0306", credits: 3, prereq: ["NEI0201"] },
      { name: "Formulación y Evaluación de Proyectos de Exportación", code: "NEI0307", credits: 3, prereq: ["ADM0306"] },
      { name: "Emprendedores", code: "EMP0402", credits: 4, prereq: ["ADM0306", "CEP0006"] },
      { name: "Inteligencia Comercial", code: "NEI0409", credits: 3, prereq: ["ADM0111"] },
      { name: "Comercio de Servicios", code: "NEI0309", credits: 3, prereq: ["NEI0205"] },
    ],
  },
  {
    semester: 8,
    subjects: [
      { name: "Fuentes de Financiamiento y Medios de Pago", code: "NEI0403", credits: 3, prereq: ["ADM0312"] },
      { name: "Human Resources Management", code: "ADM0468", credits: 3, prereq: ["ADM0110", "CEP0006"] },
      { name: "Logística Internacional", code: "NEI0202", credits: 3, prereq: ["NEI0306"] },
      { name: "Marketing Internacional", code: "NEI0308", credits: 3, prereq: ["CEP0006"] },
      { name: "Optativa I", code: "OPT0101", credits: 3, prereq: [] },
    ],
  },
  {
    semester: 9,
    subjects: [
      { name: "Corporate Strategy", code: "ADM0467", credits: 3, prereq: ["CEP0006"] },
      { name: "Electiva II", code: "ELE0102", credits: 3, prereq: [] },
      { name: "Prácticas Profesionales", code: "PRP0401", credits: 13, prereq: [] },
      { name: "Contratación Internacional", code: "NEI0406", credits: 3, prereq: ["DRO0426"] },
      { name: "Estrategias de Negociación", code: "NEI0408", credits: 3, prereq: [] },
    ],
  },
  {
    semester: 10,
    subjects: [
      { name: "Electiva Culminación de Estudios", code: "ECE0101", credits: 10, prereq: [] },
    ],
  },
];

export default function CurriculumMap() {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("completedSubjects");
    if (stored) setCompleted(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("completedSubjects", JSON.stringify(completed));
  }, [completed]);

  const toggleCompleted = (code) => {
    setCompleted((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const isUnlocked = (prereq) => prereq.every((p) => completed.includes(p));

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ marginBottom: 20 }}>Malla Curricular - Negocios Internacionales</h1>
      {curriculum.map((sem) => (
        <div key={sem.semester} style={{ marginBottom: 40 }}>
          <h2 style={{ marginBottom: 10 }}>Semestre {sem.semester}</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {sem.subjects.map((subj) => {
              const unlocked = isUnlocked(subj.prereq);
              const done = completed.includes(subj.code);
              return (
                <div
                  key={subj.code}
                  style={{
                    opacity: unlocked ? 1 : 0.4,
                    border: "1px solid #ccc",
                    borderRadius: 8,
                    padding: 12,
                    textDecoration: done ? "line-through" : "none",
                    userSelect: "none",
                    backgroundColor: done ? "#d1e7dd" : "#fff",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <label
                    style={{
                      cursor: unlocked ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => toggleCompleted(subj.code)}
                      disabled={!unlocked}
                    />
                    <span>{subj.name}</span>
                  </label>
                  <p style={{ margin: "4px 0 0 24px", fontSize: 14, color: "#555" }}>
                    Código: {subj.code}
                  </p>
                  <p style={{ margin: "0 0 0 24px", fontSize: 14, color: "#555" }}>
                    Créditos: {subj.credits}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}