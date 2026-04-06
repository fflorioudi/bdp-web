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
  imageStyle,
  placeholderStyle,
  buttonsRowStyle,
  secondaryButtonStyle,
  dangerButtonStyle,
} from "../../../lib/adminStyles";

export default function AdminMiembrosClient() {
  const supabase = createClient();

  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [deletingId, setDeletingId] = useState(null);

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
      setMensaje("Hubo un error al cargar los miembros.");
      setTipoMensaje("error");
    } else {
      setMiembros(data || []);
    }

    setLoading(false);
  }

  async function eliminarMiembro(id) {
    const confirmar = window.confirm("¿Seguro que querés eliminar este miembro?");
    if (!confirmar) return;

    setDeletingId(id);
    setMensaje("");
    setTipoMensaje("");

    const { error } = await supabase.from("members").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar miembro:", error);
      setMensaje("Hubo un error al eliminar el miembro.");
      setTipoMensaje("error");
    } else {
      setMensaje("Miembro eliminado correctamente.");
      setTipoMensaje("success");
      await cargarMiembros();
    }

    setDeletingId(null);
  }

  return (
    <main style={pageStyle}>
      <div style={topBarStyle}>
        <h1 style={titleStyle}>Administrar miembros</h1>

        <Link href="/admin/miembros/nuevo" style={linkStyle}>
          <button style={primaryButtonStyle}>+ Nuevo miembro</button>
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
        <p>Cargando miembros...</p>
      ) : miembros.length === 0 ? (
        <p>No hay miembros cargados.</p>
      ) : (
        <section style={gridStyle}>
          {miembros.map((miembro) => (
            <article key={miembro.id} style={cardStyle}>
              {miembro.foto ? (
                <img src={miembro.foto} alt={miembro.nombre} style={imageStyle} />
              ) : (
                <div style={placeholderStyle}>Sin foto</div>
              )}

              <h2 style={nameStyle}>
                {miembro.nombre}
                {miembro.apodo ? ` (${miembro.apodo})` : ""}
              </h2>

              {miembro.rol && <p style={roleStyle}>{miembro.rol}</p>}

              <div style={buttonsRowStyle}>
                <Link href={`/admin/miembros/${miembro.id}`} style={linkStyle}>
                  <button style={secondaryButtonStyle}>Editar</button>
                </Link>

                <button
                  onClick={() => eliminarMiembro(miembro.id)}
                  style={{
                    ...dangerButtonStyle,
                    opacity: deletingId === miembro.id ? 0.7 : 1,
                    cursor: deletingId === miembro.id ? "not-allowed" : "pointer",
                  }}
                  disabled={deletingId === miembro.id}
                >
                  {deletingId === miembro.id ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

const nameStyle = {
  fontSize: "1.3rem",
  marginBottom: "8px",
};

const roleStyle = {
  marginBottom: "14px",
  fontWeight: "bold",
};