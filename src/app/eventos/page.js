"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function EventosPage() {
  const supabase = createClient();

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagenActiva, setImagenActiva] = useState(null);

  useEffect(() => {
    cargarEventos();
  }, []);

  async function cargarEventos() {
    setLoading(true);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("fecha", { ascending: true });

    if (error) {
      console.error("Error al cargar eventos:", error);
    } else {
      setEventos(data || []);
    }

    setLoading(false);
  }

  return (
    <main style={mainStyle}>
      <h1 style={titleStyle}>Eventos</h1>
      <p style={subtitleStyle}>
        Enterate de las actividades y encuentros de BDP.
      </p>

      {loading ? (
        <p style={emptyStyle}>Cargando eventos...</p>
      ) : eventos.length === 0 ? (
        <p style={emptyStyle}>Todavía no hay eventos publicados.</p>
      ) : (
        <section style={gridStyle}>
          {eventos.map((evento) => (
            <article key={evento.id} style={cardStyle}>
              {evento.imagen ? (
                <div
                  style={imageWrapperStyle}
                  onClick={() =>
                    setImagenActiva({
                      src: evento.imagen,
                      alt: evento.titulo,
                      titulo: evento.titulo,
                    })
                  }
                >
                  <img src={evento.imagen} alt={evento.titulo} style={imageStyle} />
                </div>
              ) : (
                <div style={placeholderStyle}>Sin imagen</div>
              )}

              <h2 style={cardTitleStyle}>{evento.titulo}</h2>

              <div style={metaStyle}>
                {evento.fecha && (
                  <p style={metaItemStyle}>
                    <strong>Fecha:</strong> {formatearFecha(evento.fecha)}
                  </p>
                )}
                {evento.hora && (
                  <p style={metaItemStyle}>
                    <strong>Hora:</strong> {evento.hora}
                  </p>
                )}
                {evento.lugar && (
                  <p style={metaItemStyle}>
                    <strong>Lugar:</strong> {evento.lugar}
                  </p>
                )}
              </div>

              {evento.descripcion && (
                <p style={descriptionStyle}>{evento.descripcion}</p>
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

            <img src={imagenActiva.src} alt={imagenActiva.alt} style={modalImageStyle} />

            {imagenActiva.titulo && (
              <p style={modalCaptionStyle}>{imagenActiva.titulo}</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function formatearFecha(fecha) {
  return new Date(`${fecha}T00:00:00`).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
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
  fontSize: "1.05rem",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "26px",
};

const cardStyle = {
  backgroundColor: "#6f4328",
  borderRadius: "16px",
  padding: "18px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.24)",
};

const imageWrapperStyle = {
  width: "100%",
  height: "240px",
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
  height: "240px",
  borderRadius: "12px",
  backgroundColor: "#8b5e3c",
  marginBottom: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
};

const cardTitleStyle = {
  fontSize: "1.45rem",
  marginBottom: "12px",
};

const metaStyle = {
  marginBottom: "14px",
};

const metaItemStyle = {
  margin: "6px 0",
};

const descriptionStyle = {
  lineHeight: 1.6,
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