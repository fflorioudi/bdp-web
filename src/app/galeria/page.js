"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function GaleriaPage() {
  const supabase = createClient();

  const [imagenes, setImagenes] = useState([]);
  const [imagenActiva, setImagenActiva] = useState(null);

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("id", { ascending: false });

    setImagenes(data || []);
  }

  return (
    <main style={mainStyle}>
      <h1 style={titleStyle}>Galería</h1>
      <p style={subtitleStyle}>
        Momentos, encuentros y recuerdos compartidos en BDP.
      </p>

      {imagenes.length === 0 ? (
        <p style={emptyStyle}>Todavía no hay imágenes.</p>
      ) : (
        <section style={gridStyle}>
          {imagenes.map((img) => (
            <article
              key={img.id}
              style={cardStyle}
              onClick={() => setImagenActiva(img)}
            >
              <div style={imageWrapperStyle}>
                <img
                  src={img.imagen}
                  alt={img.titulo || "Imagen"}
                  style={imageStyle}
                />
              </div>

              {img.titulo && (
                <p style={captionStyle}>{img.titulo}</p>
              )}
            </article>
          ))}
        </section>
      )}

      {imagenActiva && (
        <div style={modalOverlayStyle} onClick={() => setImagenActiva(null)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setImagenActiva(null)}
              style={closeButtonStyle}
            >
              ×
            </button>

            <img
              src={imagenActiva.imagen}
              alt={imagenActiva.titulo}
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
  padding: "48px 20px",
  color: "#e6d3b3",
};

const titleStyle = {
  fontSize: "2.8rem",
  textAlign: "center",
  marginBottom: "10px",
};

const subtitleStyle = {
  textAlign: "center",
  marginBottom: "34px",
  fontSize: "1.1rem",
};

const emptyStyle = {
  textAlign: "center",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "26px",
};

const cardStyle = {
  backgroundColor: "#6f4328",
  borderRadius: "16px",
  padding: "14px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.24)",
  cursor: "pointer",
};

const imageWrapperStyle = {
  width: "100%",
  height: "260px",
  borderRadius: "12px",
  overflow: "hidden",
  backgroundColor: "#8b5e3c",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const captionStyle = {
  marginTop: "10px",
  textAlign: "center",
  fontWeight: "bold",
};

const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.88)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  padding: "20px",
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