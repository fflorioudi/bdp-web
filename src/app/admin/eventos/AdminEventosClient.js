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
  imageStyle,
  placeholderStyle,
  buttonsRowStyle,
  secondaryButtonStyle,
  dangerButtonStyle,
  hoverLiftProps,
  hoverButtonProps,
} from "../../../lib/adminStyles";
import MessageAlert from "../../components/admin/MessageAlert";

export default function AdminEventosClient() {
  const supabase = createClient();

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    cargarEventos();
  }, []);

  useEffect(() => {
    if (!mensaje) return;
    const timer = setTimeout(() => setMensaje(""), 2500);
    return () => clearTimeout(timer);
  }, [mensaje]);

  async function cargarEventos() {
    setLoading(true);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("fecha", { ascending: true });

    if (error) {
      console.error("Error al cargar eventos:", error);
      setTipoMensaje("error");
      setMensaje("Hubo un error al cargar los eventos.");
    } else {
      setEventos(data || []);
    }

    setLoading(false);
  }

  async function eliminarEvento(id) {
    const confirmar = window.confirm("¿Seguro que querés eliminar este evento?");
    if (!confirmar) return;

    setDeletingId(id);
    setMensaje("");

    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar evento:", error);
      setTipoMensaje("error");
      setMensaje("Hubo un error al eliminar el evento.");
    } else {
      setTipoMensaje("success");
      setMensaje("Evento eliminado correctamente.");
      await cargarEventos();
    }

    setDeletingId(null);
  }

  return (
    <main style={pageStyle}>
      <div style={topBarStyle}>
        <h1 style={titleStyle}>Administrar eventos</h1>

        <Link href="/admin/eventos/nuevo" style={linkStyle}>
          <button style={primaryButtonStyle} {...hoverButtonProps}>
            + Nuevo evento
          </button>
        </Link>
      </div>

      <MessageAlert message={mensaje} type={tipoMensaje} />

      {loading ? (
        <p>Cargando eventos...</p>
      ) : eventos.length === 0 ? (
        <p>No hay eventos cargados.</p>
      ) : (
        <section style={gridStyle}>
          {eventos.map((evento) => (
            <article key={evento.id} style={cardStyle} {...hoverLiftProps}>
              {evento.imagen ? (
                <img src={evento.imagen} alt={evento.titulo} style={imageStyle} />
              ) : (
                <div style={placeholderStyle}>Sin imagen</div>
              )}

              <h2 style={nameStyle}>{evento.titulo}</h2>

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

              <div style={buttonsRowStyle}>
                <Link href={`/admin/eventos/${evento.id}`} style={linkStyle}>
                  <button style={secondaryButtonStyle} {...hoverButtonProps}>
                    Editar
                  </button>
                </Link>

                <button
                  onClick={() => eliminarEvento(evento.id)}
                  style={{
                    ...dangerButtonStyle,
                    opacity: deletingId === evento.id ? 0.7 : 1,
                    cursor: deletingId === evento.id ? "not-allowed" : "pointer",
                  }}
                  disabled={deletingId === evento.id}
                  {...hoverButtonProps}
                >
                  {deletingId === evento.id ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </article>
          ))}
        </section>
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

const nameStyle = {
  fontSize: "1.3rem",
  marginBottom: "12px",
};

const metaStyle = {
  marginBottom: "14px",
};

const metaItemStyle = {
  margin: "6px 0",
};