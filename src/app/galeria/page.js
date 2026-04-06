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

      {/* MODAL */}
      {imagenActiva && (
        <div style={modalOverlayStyle} onClick={() => setImagenActiva(null)}>
          <div style={modalContentStyle}>
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
};

const emptyStyle = {
  textAlign: "center",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px",
};

const cardStyle = {
  backgroundColor: "#6f4328",
  borderRadius: "14px",
  padding: "14px",
  cursor: "pointer",
  transition: "transform 0.2s",
};

const imageWrapperStyle = {
  width: "100%",
  height: "260px",
  borderRadius: "10px",
  overflow: "hidden",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const captionStyle = {
  marginTop: "10px",
  textAlign: "center",
};

//////////////////////
// MODAL
//////////////////////

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.85)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  maxWidth: "90%",
  maxHeight: "90%",
  textAlign: "center",
};

const modalImageStyle = {
  maxWidth: "100%",
  maxHeight: "80vh",
  borderRadius: "12px",
};

const modalCaptionStyle = {
  marginTop: "12px",
  fontSize: "1.1rem",
};