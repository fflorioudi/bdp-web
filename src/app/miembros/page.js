"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function MiembrosPage() {
  const supabase = createClient();

  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarMiembros() {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("id", { ascending: true });

      console.log("MIEMBROS DATA:", data);
      console.log("MIEMBROS ERROR:", error);

      if (error) {
        console.error("Error al cargar miembros:", error);
      } else {
        setMiembros(data || []);
      }

      setLoading(false);
    }

    cargarMiembros();
  }, []);

  return (
    <main style={mainStyle}>
      <h1 style={titleStyle}>Miembros</h1>
      <p style={subtitleStyle}>Conocé a quienes forman parte del BDP.</p>

      {loading ? (
        <p>Cargando miembros...</p>
      ) : miembros.length === 0 ? (
        <p>Todavía no hay miembros cargados.</p>
      ) : (
        <section style={gridStyle}>
          {miembros.map((miembro) => (
            <article key={miembro.id} style={cardStyle}>
              {miembro.foto ? (
                <img
                  src={miembro.foto}
                  alt={miembro.nombre}
                  style={imageStyle}
                />
              ) : (
                <div style={imagePlaceholderStyle}>Sin foto</div>
              )}

              <h2 style={nameStyle}>
                {miembro.nombre}
                {miembro.apodo ? ` (${miembro.apodo})` : ""}
              </h2>

              {miembro.rol && <p style={roleStyle}>{miembro.rol}</p>}
              {miembro.edad && <p>Edad: {miembro.edad}</p>}
              {miembro.descripcion && <p>{miembro.descripcion}</p>}
              {miembro.frase && <p style={phraseStyle}>“{miembro.frase}”</p>}
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

const mainStyle = {
  padding: "50px 20px",
  maxWidth: "1200px",
  margin: "0 auto",
  color: "#e6d3b3",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "2.8rem",
  marginBottom: "10px",
};

const subtitleStyle = {
  textAlign: "center",
  marginBottom: "40px",
  fontSize: "1.1rem",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "24px",
};

const cardStyle = {
  backgroundColor: "#6f4328",
  borderRadius: "14px",
  padding: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
};

const imageStyle = {
  width: "100%",
  height: "260px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "16px",
};

const imagePlaceholderStyle = {
  width: "100%",
  height: "260px",
  borderRadius: "10px",
  marginBottom: "16px",
  backgroundColor: "#8b5e3c",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
};

const nameStyle = {
  fontSize: "1.4rem",
  marginBottom: "8px",
};

const roleStyle = {
  fontWeight: "bold",
  marginBottom: "8px",
};

const phraseStyle = {
  marginTop: "12px",
  fontStyle: "italic",
};