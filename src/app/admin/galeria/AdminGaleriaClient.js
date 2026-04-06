"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client";
import {
  pageStyle,
  topBarStyle,
  titleStyle,
  linkStyle,
  primaryButtonStyle,
  messageBaseStyle,
  successMessageStyle,
  errorMessageStyle,
  dangerButtonStyle,
} from "../../../lib/adminStyles";

export default function AdminGaleriaClient() {
  const supabase = createClient();

  const [imagenes, setImagenes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    setLoading(true);

    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error al cargar galería:", error);
      setMensaje("Hubo un error al cargar la galería.");
      setTipoMensaje("error");
    } else {
      setImagenes(data || []);
    }

    setLoading(false);
  }

  async function eliminar(id) {
    const confirmar = window.confirm("¿Eliminar imagen?");
    if (!confirmar) return;

    setDeletingId(id);
    setMensaje("");
    setTipoMensaje("");

    const { error } = await supabase.from("gallery").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar imagen:", error);
      setMensaje("Hubo un error al eliminar la imagen.");
      setTipoMensaje("error");
    } else {
      setMensaje("Imagen eliminada correctamente.");
      setTipoMensaje("success");
      await cargar();
    }

    setDeletingId(null);
  }

  return (
    <main style={pageStyle}>
      <div style={topBarStyle}>
        <h1 style={titleStyle}>Galería</h1>

        <Link href="/admin/galeria/nuevo" style={linkStyle}>
          <button style={primaryButtonStyle}>+ Nueva imagen</button>
        </Link>
      </div>

      {mensaje && (
        <p
          style={{
            ...messageBaseStyle,
            ...(tipoMensaje === "success" ? successMessageStyle : errorMessageStyle),
          }}
        >
          {mensaje}
        </p>
      )}

      {loading ? (
        <p>Cargando...</p>
      ) : imagenes.length === 0 ? (
        <p>No hay imágenes cargadas.</p>
      ) : (
        <section style={gridStyle}>
          {imagenes.map((img) => (
            <article key={img.id} style={galleryCardStyle}>
              <div style={imageWrapperStyle}>
                <img
                  src={img.imagen}
                  alt={img.titulo || "Imagen de galería"}
                  style={galleryImageStyle}
                />
              </div>

              {img.titulo ? (
                <p style={captionStyle}>{img.titulo}</p>
              ) : (
                <p style={captionMutedStyle}>Sin título</p>
              )}

              <div style={buttonsCenterStyle}>
                <button
                  onClick={() => eliminar(img.id)}
                  style={{
                    ...dangerButtonStyle,
                    opacity: deletingId === img.id ? 0.7 : 1,
                    cursor: deletingId === img.id ? "not-allowed" : "pointer",
                  }}
                  disabled={deletingId === img.id}
                >
                  {deletingId === img.id ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px",
};

const galleryCardStyle = {
  backgroundColor: "#6f4328",
  borderRadius: "14px",
  padding: "14px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
};

const imageWrapperStyle = {
  width: "100%",
  height: "240px",
  borderRadius: "10px",
  overflow: "hidden",
  backgroundColor: "#8b5e3c",
};

const galleryImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const captionStyle = {
  marginTop: "10px",
  marginBottom: "14px",
  textAlign: "center",
  fontWeight: "bold",
};

const captionMutedStyle = {
  marginTop: "10px",
  marginBottom: "14px",
  textAlign: "center",
  opacity: 0.8,
};

const buttonsCenterStyle = {
  display: "flex",
  justifyContent: "center",
};