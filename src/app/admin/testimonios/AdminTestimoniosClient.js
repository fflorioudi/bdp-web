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
  gridStyle,
  cardStyle,
  buttonsRowStyle,
  secondaryButtonStyle,
  dangerButtonStyle,
  hoverLiftProps,
  hoverButtonProps,
} from "../../../lib/adminStyles";
import MessageAlert from "../../components/admin/MessageAlert";

export default function AdminTestimoniosClient() {
  const supabase = createClient();

  const [testimonios, setTestimonios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");
  const [deletingId, setDeletingId] = useState(null);
  const [approvingId, setApprovingId] = useState(null);

  useEffect(() => {
    cargarTestimonios();
  }, []);

  useEffect(() => {
    if (!mensaje) return;
    const timer = setTimeout(() => setMensaje(""), 2500);
    return () => clearTimeout(timer);
  }, [mensaje]);

  async function cargarTestimonios() {
    setLoading(true);

    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error al cargar testimonios:", error);
      setTipoMensaje("error");
      setMensaje("Hubo un error al cargar los testimonios.");
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

    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error al eliminar testimonio:", error);
      setTipoMensaje("error");
      setMensaje("Hubo un error al eliminar el testimonio.");
    } else {
      setTipoMensaje("success");
      setMensaje("Testimonio eliminado correctamente.");
      await cargarTestimonios();
    }

    setDeletingId(null);
  }

  async function toggleAprobacion(id, aprobadoActual) {
    setApprovingId(id);
    setMensaje("");

    const { error } = await supabase
      .from("testimonials")
      .update({ aprobado: !aprobadoActual })
      .eq("id", id);

    if (error) {
      console.error("Error al actualizar aprobación:", error);
      setTipoMensaje("error");
      setMensaje("No se pudo actualizar la aprobación.");
    } else {
      setTipoMensaje("success");
      setMensaje(
        aprobadoActual
          ? "Se quitó la aprobación del testimonio."
          : "Testimonio aprobado correctamente."
      );
      await cargarTestimonios();
    }

    setApprovingId(null);
  }

  return (
    <main style={pageStyle}>
      <div style={topBarStyle}>
        <h1 style={titleStyle}>Administrar testimonios</h1>

        <Link href="/admin/testimonios/nuevo" style={linkStyle}>
          <button style={primaryButtonStyle} {...hoverButtonProps}>
            + Nuevo testimonio
          </button>
        </Link>
      </div>

      <MessageAlert message={mensaje} type={tipoMensaje} />

      {loading ? (
        <p>Cargando testimonios...</p>
      ) : testimonios.length === 0 ? (
        <p>No hay testimonios cargados.</p>
      ) : (
        <section style={gridStyle}>
          {testimonios.map((testimonio) => (
            <article key={testimonio.id} style={{ ...cardStyle, textAlign: "center" }} {...hoverLiftProps}>
              {testimonio.foto ? (
                <img src={testimonio.foto} alt={testimonio.nombre} style={avatarStyle} />
              ) : (
                <div style={avatarPlaceholderStyle}>Sin foto</div>
              )}

              <h2 style={nameStyle}>{testimonio.nombre}</h2>

              {testimonio.rol && <p style={roleStyle}>{testimonio.rol}</p>}

              <p style={statusStyle}>
                {testimonio.aprobado ? "✅ Aprobado" : "⏳ Pendiente"}
              </p>

              <p style={textStyle}>“{testimonio.texto}”</p>

              <div style={{ ...buttonsRowStyle, justifyContent: "center" }}>
                <Link href={`/admin/testimonios/${testimonio.id}`} style={linkStyle}>
                  <button style={secondaryButtonStyle} {...hoverButtonProps}>
                    Editar
                  </button>
                </Link>

                <button
                  onClick={() => toggleAprobacion(testimonio.id, testimonio.aprobado)}
                  style={{
                    ...approveButtonStyle,
                    opacity: approvingId === testimonio.id ? 0.7 : 1,
                    cursor: approvingId === testimonio.id ? "not-allowed" : "pointer",
                  }}
                  disabled={approvingId === testimonio.id}
                  {...hoverButtonProps}
                >
                  {approvingId === testimonio.id
                    ? "Guardando..."
                    : testimonio.aprobado
                    ? "Quitar aprobación"
                    : "Aprobar"}
                </button>

                <button
                  onClick={() => eliminarTestimonio(testimonio.id)}
                  style={{
                    ...dangerButtonStyle,
                    opacity: deletingId === testimonio.id ? 0.7 : 1,
                    cursor: deletingId === testimonio.id ? "not-allowed" : "pointer",
                  }}
                  disabled={deletingId === testimonio.id}
                  {...hoverButtonProps}
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

const statusStyle = {
  marginBottom: "10px",
  fontWeight: "700",
};

const textStyle = {
  lineHeight: 1.7,
  marginBottom: "14px",
};

const approveButtonStyle = {
  padding: "10px 14px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#9a6b45",
  color: "#fff",
  cursor: "pointer",
  fontSize: "0.95rem",
  fontWeight: "600",
  transition: "transform 0.2s ease, opacity 0.2s ease, background-color 0.2s ease",
};