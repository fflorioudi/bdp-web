"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase/client";
import {
  pageNarrowStyle,
  formCardStyle,
  centeredTitleStyle,
  inputStyle,
  textareaStyle,
  largeImageStyle,
  placeholderStyle,
  primaryButtonStyle,
  messageBaseStyle,
  successMessageStyle,
  errorMessageStyle,
} from "../../../lib/adminStyles";

export default function AdminHistoriaClient() {
  const supabase = createClient();

  const [id, setId] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [imagenActual, setImagenActual] = useState("");
  const [imagenFile, setImagenFile] = useState(null);
  const [eliminarImagen, setEliminarImagen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    cargarHistoria();
  }, []);

  async function cargarHistoria() {
    setLoading(true);

    const { data, error } = await supabase
      .from("history")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      console.error("Error al cargar historia:", error);
      setMensaje("No se pudo cargar la historia.");
      setTipoMensaje("error");
      setLoading(false);
      return;
    }

    setId(data.id);
    setTitulo(data.titulo || "");
    setContenido(data.contenido || "");
    setImagenActual(data.imagen || "");
    setEliminarImagen(false);
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMensaje("");
    setTipoMensaje("");

    let imagenUrl = imagenActual;

    if (eliminarImagen) imagenUrl = "";

    if (imagenFile) {
      const fileExt = imagenFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("history")
        .upload(fileName, imagenFile);

      if (uploadError) {
        console.error("Error al subir imagen:", uploadError);
        setMensaje("Error al subir la imagen.");
        setTipoMensaje("error");
        setSaving(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("history")
        .getPublicUrl(fileName);

      imagenUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase
      .from("history")
      .update({
        titulo,
        contenido,
        imagen: imagenUrl,
      })
      .eq("id", id);

    if (error) {
      console.error("Error al guardar historia:", error);
      setMensaje("Hubo un error al guardar la historia.");
      setTipoMensaje("error");
      setSaving(false);
      return;
    }

    setImagenActual(imagenUrl);
    setImagenFile(null);
    setEliminarImagen(false);
    setMensaje("Historia actualizada correctamente.");
    setTipoMensaje("success");
    setSaving(false);
  }

  if (loading) {
    return (
      <main style={pageNarrowStyle}>
        <p>Cargando historia...</p>
      </main>
    );
  }

  return (
    <main style={pageNarrowStyle}>
      <div style={formCardStyle}>
        <h1 style={centeredTitleStyle}>Editar historia</h1>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            style={inputStyle}
          />

          <textarea
            placeholder="Contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            style={{ ...textareaStyle, minHeight: "220px" }}
          />

          {imagenActual && !eliminarImagen ? (
            <img src={imagenActual} alt={titulo} style={largeImageStyle} />
          ) : (
            <div style={placeholderStyle}>
              {eliminarImagen ? "La imagen se eliminará al guardar" : "Sin imagen actual"}
            </div>
          )}

          {imagenActual && (
            <label style={checkboxRowStyle}>
              <input
                type="checkbox"
                checked={eliminarImagen}
                onChange={(e) => setEliminarImagen(e.target.checked)}
              />
              Eliminar imagen actual
            </label>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImagenFile(e.target.files?.[0] || null);
              if (e.target.files?.[0]) setEliminarImagen(false);
            }}
            style={inputStyle}
          />

          <button type="submit" disabled={saving} style={primaryButtonStyle}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>

        {mensaje && (
          <p
            style={{
              ...messageBaseStyle,
              ...(tipoMensaje === "success" ? successMessageStyle : errorMessageStyle),
              marginTop: "16px",
              marginBottom: 0,
              textAlign: "center",
            }}
          >
            {mensaje}
          </p>
        )}
      </div>
    </main>
  );
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const checkboxRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "1rem",
};