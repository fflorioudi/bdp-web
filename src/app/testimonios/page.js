"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function TestimoniosPage() {
  const supabase = createClient();

  const [testimonios, setTestimonios] = useState([]);
  const [imagenActiva, setImagenActiva] = useState(null);

  useEffect(() => {
    cargarTestimonios();
  }, []);

  async function cargarTestimonios() {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error al cargar testimonios:", error);
    } else {
      setTestimonios(data || []);
    }
  }

  return (
    <main style={mainStyle}>
      <h1 style={titleStyle}>Testimonios</h1>
      <p style={subtitleStyle}>
        Voces y experiencias que forman parte de BDP.
      </p>

      <div style={topButtonRowStyle}>
        <Link href="/testimonios/nuevo" style={publicButtonStyle}>
          Dejar testimonio
        </Link>
      </div>

      {!testimonios || testimonios.length === 0 ? (
        <p style={emptyStyle}>Todavía no hay testimonios publicados.</p>
      ) : (
        <section style={gridStyle}>
          {testimonios.map((testimonio) => (
            <article key={testimonio.id} style={cardStyle}>
              {testimonio.foto ? (
                <div
                  style={avatarWrapperStyle}
                  onClick={() =>
                    setImagenActiva({
                      src: testimonio.foto,
                      alt: testimonio.nombre,
                      titulo: testimonio.nombre,
                    })
                  }
                >
                  <img
                    src={testimonio.foto}
                    alt={testimonio.nombre}
                    style={imageStyle}
                  />
                </div>
              ) : (
                <div style={placeholderStyle}>Sin foto</div>
              )}

              <h2 style={nameStyle}>{testimonio.nombre}</h2>

              {testimonio.rol && (
                <p style={roleStyle}>{testimonio.rol}</p>
              )}

              <p style={textStyle}>“{testimonio.texto}”</p>
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
  marginBottom: "24px",
  fontSize: "1.1rem",
};

const topButtonRowStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "30px",
};

const publicButtonStyle = {
  padding: "12px 18px",
  borderRadius: "10px",
  backgroundColor: "#8b5e3c",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "700",
  boxShadow: "0 6px 16px rgba(0,0,0,0.22)",
};

const emptyStyle = {
  textAlign: "center",
  fontSize: "1.1rem",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "26px",
};

const cardStyle = {
  backgroundColor: "#6f4328",
  borderRadius: "16px",
  padding: "18px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.24)",
  textAlign: "center",
};

const avatarWrapperStyle = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  overflow: "hidden",
  margin: "0 auto 14px",
  cursor: "pointer",
  backgroundColor: "#8b5e3c",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const placeholderStyle = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  margin: "0 auto 14px",
  backgroundColor: "#8b5e3c",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
};

const nameStyle = {
  fontSize: "1.3rem",
  marginBottom: "8px",
};

const roleStyle = {
  marginBottom: "12px",
  fontWeight: "bold",
};

const textStyle = {
  lineHeight: 1.7,
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