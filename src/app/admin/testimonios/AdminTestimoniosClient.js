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
  gridStyle,
  cardStyle,
  buttonsRowStyle,
  secondaryButtonStyle,
  dangerButtonStyle,
} from "../../../lib/adminStyles";

export default function AdminTestimoniosClient() {
  const supabase = createClient();

  const [testimonios, setTestimonios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    cargarTestimonios();
  }, []);

  async function cargarTestimonios() {
    setLoading(true);

    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error al cargar testimonios:", error);
      setMensaje("Hubo un error al cargar los testimonios.");
      setTipoMensaje("error");
    } else {
      setTestimonios(data || []);
    }

    setLoading(false);
  }

  async function eliminarTestimonio(id) {
    const confirmar = window.confirm("¿Seguro que querés eliminar este testimonio?");
    if (!confirmar) return;

    setDeletingId(id);
    setMensaje("");
    setTipoMensaje("");

    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error al eliminar testimonio:", error);
      setMensaje("Hubo un error al eliminar el testimonio.");
      setTipoMensaje("error");
    } else {
      setMensaje("Testimonio eliminado correctamente.");
      setTipoMensaje("success");
      await cargarTestimonios();
    }

    setDeletingId(null);
  }

  return (
    <main style={pageStyle}>
      <div style={topBarStyle}>
        <h1 style={titleStyle}>Administrar testimonios</h1>

        <Link href="/admin/testimonios/nuevo" style={linkStyle}>
          <button style={primaryButtonStyle}>+ Nuevo testimonio</button>
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
        <p>Cargando testimonios...</p>
      ) : testimonios.length === 0 ? (
        <p>No hay testimonios cargados.</p>
      ) : (
        <section style={gridStyle}>
          {testimonios.map((testimonio) => (
            <article key={testimonio.id} style={{ ...cardStyle, textAlign: "center" }}>
              {testimonio.foto ? (
                <img src={testimonio.foto} alt={testimonio.nombre} style={avatarStyle} />
              ) : (
                <div style={avatarPlaceholderStyle}>Sin foto</div>
              )}

              <h2 style={nameStyle}>{testimonio.nombre}</h2>

              {testimonio.rol && <p style={roleStyle}>{testimonio.rol}</p>}

              <p style={textStyle}>“{testimonio.texto}”</p>

              <div style={{ ...buttonsRowStyle, justifyContent: "center" }}>
                <Link href={`/admin/testimonios/${testimonio.id}`} style={linkStyle}>
                  <button style={secondaryButtonStyle}>Editar</button>
                </Link>

                <button
                  onClick={() => eliminarTestimonio(testimonio.id)}
                  style={{
                    ...dangerButtonStyle,
                    opacity: deletingId === testimonio.id ? 0.7 : 1,
                    cursor: deletingId === testimonio.id ? "not-allowed" : "pointer",
                  }}
                  disabled={deletingId === testimonio.id}
                >
                  {deletingId === testimonio.id ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

const avatarStyle = {
  width: "120px",
  height: "120px",
  objectFit: "cover",
  borderRadius: "50%",
  marginBottom: "14px",
};

const avatarPlaceholderStyle = {
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
  marginBottom: "14px",
};