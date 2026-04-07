"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function MiembrosPage() {
  const supabase = createClient();

  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagenActiva, setImagenActiva] = useState(null);

  useEffect(() => {
    cargarMiembros();
  }, []);

  async function cargarMiembros() {
    setLoading(true);

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error al cargar miembros:", error);
    } else {
      setMiembros(data || []);
    }

    setLoading(false);
  }

  return (
    <main style={mainStyle}>
      <h1 style={titleStyle}>Miembros</h1>
      <p style={subtitleStyle}>
        Conocé a las personas que forman parte de BDP.
      </p>

      {loading ? (
        <p style={emptyStyle}>Cargando miembros...</p>
      ) : miembros.length === 0 ? (
        <p style={emptyStyle}>Todavía no hay miembros cargados.</p>
      ) : (
        <section style={gridStyle}>
          {miembros.map((miembro) => (
            <article key={miembro.id} style={cardStyle}>
              {miembro.foto ? (
                <div
                  style={imageWrapperStyle}
                  onClick={() =>
                    setImagenActiva({
                      src: miembro.foto,
                      alt: miembro.nombre,
                      titulo: miembro.nombre,
                    })
                  }
                >
                  <img
                    src={miembro.foto}
                    alt={miembro.nombre}
                    style={imageStyle}
                  />
                </div>
              ) : (
                <div style={placeholderStyle}>Sin foto</div>
              )}

              <h2 style={nameStyle}>
                {miembro.nombre}
                {miembro.apodo ? ` (${miembro.apodo})` : ""}
              </h2>

              {miembro.rol && <p style={roleStyle}>{miembro.rol}</p>}

              {miembro.edad ? (
                <p style={metaStyle}>
                  <strong>Edad:</strong> {miembro.edad}
                </p>
              ) : null}

              {miembro.descripcion ? (
                <p style={descriptionStyle}>{miembro.descripcion}</p>
              ) : null}

              {miembro.frase ? (
                <p style={quoteStyle}>“{miembro.frase}”</p>
              ) : null}
            </article>
          ))}
        </section>
      )}

      {imagenActiva && (
        <div
          style={modalOverlayStyle}
          onClick={() => setImagenActiva(null)}
        >
          <div
            style={modalContentStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setImagenActiva(null)}
              style={closeButtonStyle}
            >
              ×
            </button>

            <img
              src={imagenActiva.src}
              alt={imagenActiva.alt}
              style={modalImageStyle}
            />

            {imagenActiva.titulo && (
              <p style={modalCaptionStyle}>{imagenActiva.titulo}</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

const mainStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px 20px",
  color: "#e6d3b3",
};

const titleStyle = {
  fontSize: "2.6rem",
  textAlign: "center",
  marginBottom: "10px",
};

const subtitleStyle = {
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "1.1rem",
};

const emptyStyle = {
  textAlign: "center",
  fontSize: "1.05rem",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px",
};

const cardStyle = {
  backgroundColor: "#6f4328",
  borderRadius: "16px",
  padding: "18px",
  boxShadow: "0 4px 14px rgba(0,0,0,0.28)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const imageWrapperStyle = {
  width: "100%",
  height: "260px",
  borderRadius: "12px",
  overflow: "hidden",
  backgroundColor: "#8b5e3c",
  marginBottom: "14px",
  cursor: "pointer",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const placeholderStyle = {
  width: "100%",
  height: "260px",
  borderRadius: "12px",
  backgroundColor: "#8b5e3c",
  marginBottom: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
};

const nameStyle = {
  fontSize: "1.35rem",
  marginBottom: "8px",
};

const roleStyle = {
  fontWeight: "bold",
  marginBottom: "10px",
};

const metaStyle = {
  marginBottom: "10px",
};

const descriptionStyle = {
  lineHeight: 1.6,
  marginBottom: "12px",
};

const quoteStyle = {
  fontStyle: "italic",
  opacity: 0.95,
};

const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.88)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  zIndex: 1000,
};

const modalContentStyle = {
  position: "relative",
  maxWidth: "95vw",
  maxHeight: "95vh",
  textAlign: "center",
};

const modalImageStyle = {
  maxWidth: "100%",
  maxHeight: "82vh",
  borderRadius: "12px",
  display: "block",
};

const modalCaptionStyle = {
  marginTop: "12px",
  fontSize: "1.05rem",
};

const closeButtonStyle = {
  position: "absolute",
  top: "-10px",
  right: "-10px",
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "#5a1a14",
  color: "#fff",
  fontSize: "1.4rem",
  cursor: "pointer",
};